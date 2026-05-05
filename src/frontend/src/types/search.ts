export interface SearchParams {
  searchQuery: string;
  categories: string[];
  minPrice: number;
  maxPrice: number;
  brands: string[];
  minRating: number;
  inStock: boolean;
  sortBy: SortOption;
  page: number;
  pageSize: number;
}

export interface SearchResult {
  products: import("./product").Product[];
  total: number;
  page: number;
  pageSize: number;
}

export type SortOption =
  | "relevance"
  | "price_asc"
  | "price_desc"
  | "rating_desc"
  | "newest";

export interface FilterState {
  query: string;
  categories: string[];
  minPrice: number;
  maxPrice: number;
  brands: string[];
  minRating: number;
  inStock: boolean;
  sortBy: SortOption;
  page: number;
  pageSize: number;
}

export const DEFAULT_FILTER_STATE: FilterState = {
  query: "",
  categories: [],
  minPrice: 0,
  maxPrice: 1000,
  brands: [],
  minRating: 0,
  inStock: false,
  sortBy: "relevance",
  page: 1,
  pageSize: 48,
};

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating_desc", label: "Avg. Customer Review" },
  { value: "newest", label: "Newest Arrivals" },
];
