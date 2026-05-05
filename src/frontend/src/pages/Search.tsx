import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useSearchProducts } from "@/hooks/useProducts";
import type { Product } from "@/types/product";
import type { SearchParams, SortOption } from "@/types/search";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { PackageSearch, SlidersHorizontal, Star, X } from "lucide-react";
import { useState } from "react";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating_desc", label: "Avg. Customer Review" },
  { value: "newest", label: "Newest Arrivals" },
];

const PRICE_RANGES = [
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 to $50", min: 25, max: 50 },
  { label: "$50 to $100", min: 50, max: 100 },
  { label: "$100 to $200", min: 100, max: 200 },
  { label: "$200 & Above", min: 200, max: 99999 },
];

const CATEGORY_LIST = ["Electronics", "Fashion", "Grocery", "Books", "Home"];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"];

function StarRatingInline({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {STAR_KEYS.map((k, i) => (
        <Star
          key={k}
          className={`w-3.5 h-3.5 ${
            i < Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/40"
          }`}
        />
      ))}
    </span>
  );
}

function ProductGridSkeleton() {
  const ids = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {ids.map((id) => (
        <div key={id} className="flex flex-col gap-2">
          <Skeleton className="aspect-square rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-8 w-full" />
        </div>
      ))}
    </div>
  );
}

function SearchResultCard({
  product,
  index,
}: { product: Product; index: number }) {
  const navigate = useNavigate();
  const isOnSale =
    product.salePrice != null && product.salePrice < product.price;
  const displayPrice = isOnSale ? (product.salePrice as number) : product.price;
  const discountPct = isOnSale
    ? Math.round((1 - (product.salePrice as number) / product.price) * 100)
    : 0;

  return (
    <button
      type="button"
      className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col cursor-pointer group w-full text-left"
      onClick={() =>
        void navigate({
          to: "/product/$id",
          params: { id: String(product.id) },
        })
      }
      data-ocid={`search.item.${index + 1}`}
    >
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        <img
          src={product.images[0] ?? "/assets/images/placeholder.svg"}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {isOnSale && (
          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-bold">
            -{discountPct}%
          </Badge>
        )}
      </div>
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug group-hover:text-accent transition-colors">
          {product.title}
        </p>
        <div className="flex items-center gap-1.5">
          <StarRatingInline rating={product.rating} />
          <span className="text-xs text-muted-foreground">
            ({Number(product.reviewCount).toLocaleString()})
          </span>
        </div>
        <div className="flex items-baseline gap-1.5 mt-auto pt-1">
          <span className="text-base font-bold text-accent">
            {formatPrice(displayPrice)}
          </span>
          {isOnSale && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        {Number(product.stockQuantity) === 0 && (
          <span className="text-xs text-destructive font-medium">
            Out of stock
          </span>
        )}
      </div>
    </button>
  );
}

export default function SearchPage() {
  const navigate = useNavigate();
  const rawSearch = useSearch({ strict: false }) as {
    q?: string;
    sort?: string;
    categories?: string;
    brands?: string;
    minPrice?: string;
    maxPrice?: string;
    minRating?: string;
    inStock?: string;
  };

  const query = rawSearch.q ?? "";
  const sortBy = (rawSearch.sort ?? "relevance") as SortOption;
  const selectedCategories = rawSearch.categories
    ? rawSearch.categories.split(",").filter(Boolean)
    : [];
  const selectedBrands = rawSearch.brands
    ? rawSearch.brands.split(",").filter(Boolean)
    : [];
  const minPrice = rawSearch.minPrice ? Number(rawSearch.minPrice) : 0;
  const maxPrice = rawSearch.maxPrice ? Number(rawSearch.maxPrice) : 99999;
  const minRating = rawSearch.minRating ? Number(rawSearch.minRating) : 0;
  const inStockOnly = rawSearch.inStock === "1";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function buildSearch(updates: Record<string, string | undefined>) {
    const base: Record<string, string | undefined> = {
      q: query || undefined,
      sort: sortBy !== "relevance" ? sortBy : undefined,
      categories:
        selectedCategories.length > 0
          ? selectedCategories.join(",")
          : undefined,
      brands: selectedBrands.length > 0 ? selectedBrands.join(",") : undefined,
      minPrice: minPrice > 0 ? String(minPrice) : undefined,
      maxPrice: maxPrice < 99999 ? String(maxPrice) : undefined,
      minRating: minRating > 0 ? String(minRating) : undefined,
      inStock: inStockOnly ? "1" : undefined,
    };
    return Object.fromEntries(
      Object.entries({ ...base, ...updates }).filter(
        ([, v]) => v !== undefined,
      ),
    ) as Record<string, string>;
  }

  function updateSearch(updates: Record<string, string | undefined>) {
    void navigate({
      to: "/search",
      search: buildSearch(updates),
      replace: true,
    });
  }

  function toggleCategory(cat: string) {
    const next = selectedCategories.includes(cat)
      ? selectedCategories.filter((c) => c !== cat)
      : [...selectedCategories, cat];
    updateSearch({
      categories: next.length > 0 ? next.join(",") : undefined,
    });
  }

  function toggleBrand(brand: string) {
    const next = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    updateSearch({ brands: next.length > 0 ? next.join(",") : undefined });
  }

  function setSort(sort: string) {
    updateSearch({ sort: sort !== "relevance" ? sort : undefined });
  }

  function setPriceRange(min: number, max: number) {
    updateSearch({
      minPrice: min > 0 ? String(min) : undefined,
      maxPrice: max < 99999 ? String(max) : undefined,
    });
  }

  function setMinRatingFilter(val: number) {
    updateSearch({ minRating: val > 0 ? String(val) : undefined });
  }

  function setInStock(val: boolean) {
    updateSearch({ inStock: val ? "1" : undefined });
  }

  function clearFilters() {
    void navigate({
      to: "/search",
      search: query ? { q: query } : {},
      replace: true,
    });
  }

  const pageSize = 48;
  const page = 1;

  const params: SearchParams = {
    searchQuery: query,
    categories: selectedCategories,
    brands: selectedBrands,
    minPrice,
    maxPrice,
    minRating,
    inStock: inStockOnly,
    sortBy,
    page,
    pageSize,
  };

  const { data, isLoading } = useSearchProducts(params);
  const products = data?.products ?? [];
  const total = data?.total ?? 0;
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  const activeFilterCount =
    selectedCategories.length +
    selectedBrands.length +
    (minRating > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (minPrice > 0 || maxPrice < 99999 ? 1 : 0);

  const uniqueBrands = [...new Set(products.map((p) => p.brand))].slice(0, 10);

  return (
    <div className="bg-background min-h-screen" data-ocid="search.page">
      {/* Page header */}
      <div className="bg-muted/40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              {query ? (
                <h1 className="font-display text-xl font-bold text-foreground">
                  {isLoading
                    ? "Searching..."
                    : total > 0
                      ? `${start.toLocaleString()}-${end.toLocaleString()} of ${total.toLocaleString()} results for`
                      : "No results for"}{" "}
                  <span className="text-accent">&ldquo;{query}&rdquo;</span>
                </h1>
              ) : (
                <h1 className="font-display text-xl font-bold text-foreground">
                  All Products
                </h1>
              )}
            </div>
            <div className="flex items-center gap-3">
              {/* Mobile filter toggle */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="md:hidden flex items-center gap-1.5"
                onClick={() => setSidebarOpen((v) => !v)}
                data-ocid="search.filter_toggle"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center bg-accent text-accent-foreground text-xs rounded-full">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm border border-border rounded-md px-3 py-1.5 bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                data-ocid="search.sort_select"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar */}
        <aside
          className={`w-56 flex-shrink-0 flex-col gap-6 ${
            sidebarOpen ? "flex" : "hidden md:flex"
          }`}
          data-ocid="search.filter_sidebar"
        >
          {/* Clear filters */}
          {activeFilterCount > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">
                Filters ({activeFilterCount})
              </span>
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs text-accent hover:underline flex items-center gap-1"
                data-ocid="search.clear_filters_button"
              >
                <X className="w-3 h-3" /> Clear all
              </button>
            </div>
          )}

          {/* Category */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2.5">
              Category
            </h3>
            <div
              className="flex flex-col gap-2"
              data-ocid="search.category_filters"
            >
              {CATEGORY_LIST.map((cat) => (
                <div key={cat} className="flex items-center gap-2">
                  <Checkbox
                    id={`cat-${cat}`}
                    checked={selectedCategories.includes(cat)}
                    onCheckedChange={() => toggleCategory(cat)}
                    data-ocid={`search.category_${cat.toLowerCase()}_checkbox`}
                  />
                  <Label
                    htmlFor={`cat-${cat}`}
                    className="text-sm text-foreground cursor-pointer"
                  >
                    {cat}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2.5">
              Price
            </h3>
            <div className="flex flex-col gap-2">
              {PRICE_RANGES.map((range) => {
                const active = minPrice === range.min && maxPrice === range.max;
                return (
                  <button
                    key={range.label}
                    type="button"
                    onClick={() =>
                      setPriceRange(
                        active ? 0 : range.min,
                        active ? 99999 : range.max,
                      )
                    }
                    className={`text-left text-sm px-2 py-1 rounded transition-colors ${
                      active
                        ? "text-accent font-medium bg-accent/10"
                        : "text-foreground hover:text-accent hover:bg-accent/5"
                    }`}
                    data-ocid={`search.price_range_${range.min}_button`}
                  >
                    {range.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Brand */}
          {uniqueBrands.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2.5">
                Brand
              </h3>
              <div
                className="flex flex-col gap-2"
                data-ocid="search.brand_filters"
              >
                {uniqueBrands.map((brand) => (
                  <div key={brand} className="flex items-center gap-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => toggleBrand(brand)}
                      data-ocid={`search.brand_${brand.toLowerCase().replace(/[^a-z0-9]/g, "_")}_checkbox`}
                    />
                    <Label
                      htmlFor={`brand-${brand}`}
                      className="text-sm text-foreground cursor-pointer"
                    >
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Min Rating */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2.5">
              Avg. Customer Review
            </h3>
            <div className="flex flex-col gap-2">
              {[4, 3, 2, 1].map((stars) => (
                <button
                  key={stars}
                  type="button"
                  onClick={() =>
                    setMinRatingFilter(minRating === stars ? 0 : stars)
                  }
                  className={`flex items-center gap-1.5 text-sm px-2 py-1 rounded transition-colors ${
                    minRating === stars
                      ? "text-accent font-medium bg-accent/10"
                      : "text-foreground hover:text-accent hover:bg-accent/5"
                  }`}
                  data-ocid={`search.rating_${stars}_button`}
                >
                  <StarRatingInline rating={stars} />
                  <span>& Up</span>
                </button>
              ))}
            </div>
          </div>

          {/* In Stock */}
          <div className="flex items-center gap-2">
            <Switch
              id="in-stock"
              checked={inStockOnly}
              onCheckedChange={(v) => setInStock(!!v)}
              data-ocid="search.in_stock_switch"
            />
            <Label
              htmlFor="in-stock"
              className="text-sm text-foreground cursor-pointer"
            >
              In Stock Only
            </Label>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <ProductGridSkeleton />
          ) : products.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-24 text-center"
              data-ocid="search.empty_state"
            >
              <PackageSearch className="w-16 h-16 text-muted-foreground mb-4" />
              <h2 className="text-xl font-display font-bold text-foreground mb-2">
                No results{query ? ` for \u201c${query}\u201d` : ""}
              </h2>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Try different keywords, remove some filters, or browse a
                category.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {activeFilterCount > 0 && (
                  <Button
                    type="button"
                    onClick={clearFilters}
                    variant="outline"
                    data-ocid="search.clear_filters_empty_button"
                  >
                    Clear Filters
                  </Button>
                )}
                <Button
                  type="button"
                  onClick={() => void navigate({ to: "/products" })}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6"
                  data-ocid="search.browse_all_button"
                >
                  Browse All Products
                </Button>
              </div>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              data-ocid="search.results_list"
            >
              {products.map((product, i) => (
                <SearchResultCard
                  key={String(product.id)}
                  product={product}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
