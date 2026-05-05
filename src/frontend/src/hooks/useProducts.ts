import { createActor } from "@/backend";
import type {
  Product as BackendProduct,
  SearchParams as BackendSearchParams,
  SearchResult as BackendSearchResult,
} from "@/backend";
import type { Product } from "@/types/product";
import { MOCK_PRODUCTS } from "@/types/product";
import type { SearchParams } from "@/types/search";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

function mapProduct(p: BackendProduct): Product {
  return {
    id: String(p.id),
    title: p.title,
    description: p.description,
    price: p.price,
    salePrice: p.salePrice ?? null,
    category: p.category as string,
    brand: p.brand,
    images: p.images,
    stockQuantity: Number(p.stockQuantity),
    sku: p.sku,
    rating: p.rating,
    reviewCount: Number(p.reviewCount),
    isFeatured: p.isFeatured,
    sellerName: p.sellerName,
  };
}

export function useProducts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return MOCK_PRODUCTS;
      const raw = await actor.getProducts();
      return raw.map(mapProduct);
    },
    enabled: !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useFeaturedProducts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product[]>({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      if (!actor) return MOCK_PRODUCTS.filter((p) => p.isFeatured);
      const raw = await actor.getFeaturedProducts();
      return raw.map(mapProduct);
    },
    enabled: !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useProductsByCategory(category: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product[]>({
    queryKey: ["products", "category", category],
    queryFn: async () => {
      if (!actor) {
        return category === "All" || !category
          ? MOCK_PRODUCTS
          : MOCK_PRODUCTS.filter((p) => p.category === category);
      }
      const raw =
        category === "All" || !category
          ? await actor.getProducts()
          : await actor.getProductsByCategory(
              category as import("@/backend").Category,
            );
      return raw.map(mapProduct);
    },
    enabled: !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useDeals() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product[]>({
    queryKey: ["products", "deals"],
    queryFn: async () => {
      if (!actor) return MOCK_PRODUCTS.filter((p) => p.salePrice !== null);
      const raw = await actor.getDeals();
      return raw.map(mapProduct);
    },
    enabled: !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useProduct(id: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product | null>({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!actor) return MOCK_PRODUCTS.find((p) => p.id === id) ?? null;
      const raw = await actor.getProduct(BigInt(id));
      return raw ? mapProduct(raw) : null;
    },
    enabled: !isFetching && !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSearchSuggestions(query: string) {
  const { actor, isFetching } = useActor(createActor);
  const trimmed = query.trim();
  return useQuery<Product[]>({
    queryKey: ["suggestions", trimmed],
    queryFn: async () => {
      if (!trimmed) return [];
      if (!actor) {
        const q = trimmed.toLowerCase();
        return MOCK_PRODUCTS.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q),
        ).slice(0, 8);
      }
      const raw = await actor.getSearchSuggestions(trimmed);
      return raw.slice(0, 8).map(mapProduct);
    },
    enabled: !isFetching && trimmed.length >= 2,
    staleTime: 30 * 1000,
  });
}

export interface SearchResult {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
}

function applyMockSearch(params: SearchParams): SearchResult {
  let results = [...MOCK_PRODUCTS];
  if (params.searchQuery) {
    const q = params.searchQuery.toLowerCase();
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q),
    );
  }
  if (params.categories.length > 0) {
    results = results.filter((p) => params.categories.includes(p.category));
  }
  if (params.brands.length > 0) {
    results = results.filter((p) => params.brands.includes(p.brand));
  }
  if (params.minRating > 0) {
    results = results.filter((p) => p.rating >= params.minRating);
  }
  if (params.inStock) {
    results = results.filter((p) => p.stockQuantity > 0);
  }
  results = results.filter(
    (p) => p.price >= params.minPrice && p.price <= params.maxPrice,
  );
  switch (params.sortBy) {
    case "price_asc":
      results.sort(
        (a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price),
      );
      break;
    case "price_desc":
      results.sort(
        (a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price),
      );
      break;
    case "rating_desc":
      results.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      results.sort((a, b) => Number(b.id) - Number(a.id));
      break;
    default:
      break;
  }
  const total = results.length;
  const start = (params.page - 1) * params.pageSize;
  const paged = results.slice(start, start + params.pageSize);
  return {
    products: paged,
    total,
    page: params.page,
    pageSize: params.pageSize,
  };
}

export function useSearchProducts(params: SearchParams) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SearchResult>({
    queryKey: ["search", params],
    queryFn: async () => {
      if (!actor) return applyMockSearch(params);
      const backendParams: BackendSearchParams = {
        ...params,
        page: BigInt(params.page),
        pageSize: BigInt(params.pageSize),
      };
      const raw: BackendSearchResult =
        await actor.searchProducts(backendParams);
      return {
        total: Number(raw.total),
        page: Number(raw.page),
        pageSize: Number(raw.pageSize),
        products: raw.products.map(mapProduct),
      };
    },
    enabled: !isFetching,
    staleTime: 30 * 1000,
  });
}

export type { SearchParams };
