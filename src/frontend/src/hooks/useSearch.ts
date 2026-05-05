import { createActor } from "@/backend";
import type { SearchParams as BackendSearchParams } from "@/backend";
import type { Product } from "@/types/product";
import { MOCK_PRODUCTS } from "@/types/product";
import type { SearchParams, SearchResult } from "@/types/search";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

// --- Mock helpers (used until actor is connected) ----------------------------

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

// --- Hooks -------------------------------------------------------------------

export function useSearchProducts(params: SearchParams) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<SearchResult>({
    queryKey: ["searchProducts", params],
    queryFn: async () => {
      if (!actor) return applyMockSearch(params);

      const backendParams: BackendSearchParams = {
        searchQuery: params.searchQuery,
        categories: params.categories,
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
        brands: params.brands,
        minRating: params.minRating,
        inStock: params.inStock,
        sortBy: params.sortBy,
        page: BigInt(params.page),
        pageSize: BigInt(params.pageSize),
      };
      const raw = await actor.searchProducts(backendParams);
      return {
        products: raw.products.map((p) => ({
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
        })),
        total: Number(raw.total),
        page: Number(raw.page),
        pageSize: Number(raw.pageSize),
      };
    },
    enabled: !isFetching,
    staleTime: 30 * 1000,
    placeholderData: (prev) => prev,
  });
}

export function useBrands() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<string[]>({
    queryKey: ["brands"],
    queryFn: async () => {
      if (!actor) {
        return Array.from(new Set(MOCK_PRODUCTS.map((p) => p.brand))).sort();
      }
      return actor.getBrands();
    },
    enabled: !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSearchSuggestions(query: string) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Product[]>({
    queryKey: ["searchSuggestions", query],
    queryFn: async () => {
      if (!query.trim()) return [];
      if (!actor) {
        const q = query.toLowerCase();
        return MOCK_PRODUCTS.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q),
        ).slice(0, 8);
      }
      const raw = await actor.getSearchSuggestions(query);
      return raw.slice(0, 8).map((p) => ({
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
      }));
    },
    enabled: !isFetching && query.trim().length >= 2,
    staleTime: 15 * 1000,
  });
}
