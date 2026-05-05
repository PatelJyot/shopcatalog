import { MOCK_PRODUCTS } from "@/types/product";
import type { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

// Note: backend.d.ts has no product methods yet; using mock data
// These hooks are structured to swap in actor calls when backend is ready

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => MOCK_PRODUCTS,
    staleTime: 5 * 60 * 1000,
  });
}

export function useFeaturedProducts() {
  return useQuery<Product[]>({
    queryKey: ["products", "featured"],
    queryFn: async () => MOCK_PRODUCTS.filter((p) => p.isFeatured),
    staleTime: 5 * 60 * 1000,
  });
}

export function useProductsByCategory(category: string) {
  return useQuery<Product[]>({
    queryKey: ["products", "category", category],
    queryFn: async () =>
      category === "All"
        ? MOCK_PRODUCTS
        : MOCK_PRODUCTS.filter((p) => p.category === category),
    staleTime: 5 * 60 * 1000,
  });
}

export function useDeals() {
  return useQuery<Product[]>({
    queryKey: ["products", "deals"],
    queryFn: async () => MOCK_PRODUCTS.filter((p) => p.salePrice !== null),
    staleTime: 5 * 60 * 1000,
  });
}

export function useProduct(id: string) {
  return useQuery<Product | null>({
    queryKey: ["product", id],
    queryFn: async () => MOCK_PRODUCTS.find((p) => p.id === id) ?? null,
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
}
