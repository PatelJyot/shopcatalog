import ProductCard from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/hooks/useProducts";
import { CATEGORIES } from "@/types/product";
import type { Category } from "@/types/product";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { PackageSearch, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

type SortOption = "default" | "price_asc" | "price_desc" | "rating" | "newest";

const SORT_LABELS: Record<SortOption, string> = {
  default: "Featured",
  price_asc: "Price: Low to High",
  price_desc: "Price: High to Low",
  rating: "Top Rated",
  newest: "Newest",
};

function ProductGridSkeleton() {
  const skeletonIds = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {skeletonIds.map((id) => (
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

export default function ProductsPage() {
  const search = useSearch({ strict: false }) as {
    category?: string;
    q?: string;
    featured?: string;
    deals?: string;
  };
  const navigate = useNavigate();
  const urlCategory = (search.category as Category) ?? "All";
  const [activeCategory, setActiveCategory] = useState<"All" | Category>(
    urlCategory,
  );
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [showFilters, setShowFilters] = useState(false);
  const { data: allProducts, isLoading } = useProducts();

  // Sync URL category param into local state
  useEffect(() => {
    setActiveCategory(urlCategory);
  }, [urlCategory]);

  function handleCategoryChange(cat: "All" | Category) {
    setActiveCategory(cat);
    // Update URL search param
    navigate({
      to: "/products",
      search: cat === "All" ? {} : { category: cat },
      replace: true,
    } as Parameters<typeof navigate>[0]);
  }

  const filtered = allProducts
    ? allProducts
        .filter((p) => {
          if (search.q) {
            const q = search.q.toLowerCase();
            return (
              p.title.toLowerCase().includes(q) ||
              p.description.toLowerCase().includes(q) ||
              p.brand.toLowerCase().includes(q)
            );
          }
          if (search.featured === "true") return p.isFeatured;
          if (search.deals === "true") return p.salePrice !== null;
          if (activeCategory !== "All") return p.category === activeCategory;
          return true;
        })
        .sort((a, b) => {
          if (sortBy === "price_asc")
            return (a.salePrice ?? a.price) - (b.salePrice ?? b.price);
          if (sortBy === "price_desc")
            return (b.salePrice ?? b.price) - (a.salePrice ?? a.price);
          if (sortBy === "rating") return b.rating - a.rating;
          if (sortBy === "newest") return Number(b.id) - Number(a.id);
          return 0;
        })
    : [];

  // Category counts for badges
  const categoryCounts = allProducts
    ? Object.fromEntries(
        (["All", ...CATEGORIES] as ("All" | Category)[]).map((cat) => [
          cat,
          cat === "All"
            ? allProducts.length
            : allProducts.filter((p) => p.category === cat).length,
        ]),
      )
    : {};

  const pageTitle = search.q
    ? `Results for "${search.q}"`
    : search.featured === "true"
      ? "Featured Products"
      : search.deals === "true"
        ? "Deals of the Day"
        : activeCategory === "All"
          ? "All Products"
          : activeCategory;

  return (
    <div className="bg-background min-h-screen" data-ocid="products.page">
      {/* Page header strip */}
      <div className="bg-muted/40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                {pageTitle}
              </h1>
              {!isLoading && (
                <p className="text-sm text-muted-foreground mt-0.5">
                  {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile filter toggle */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="sm:hidden flex items-center gap-1.5"
                onClick={() => setShowFilters((v) => !v)}
                data-ocid="products.filter_toggle"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>

              {/* Sort dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="text-sm border border-border rounded-md px-3 py-1.5 bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer"
                  data-ocid="products.sort_select"
                >
                  {Object.entries(SORT_LABELS).map(([val, label]) => (
                    <option key={val} value={val}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Active filter badges */}
          {(search.q || search.featured || search.deals) && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {search.q && (
                <Badge variant="secondary" className="text-xs rounded-full">
                  Search: &ldquo;{search.q}&rdquo;
                </Badge>
              )}
              {search.featured === "true" && (
                <Badge variant="secondary" className="text-xs rounded-full">
                  Featured only
                </Badge>
              )}
              {search.deals === "true" && (
                <Badge className="text-xs rounded-full bg-accent/10 text-accent border-accent/30">
                  On Sale
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Category filter bar — shown always on desktop, toggled on mobile */}
        {!search.q && !search.featured && !search.deals && (
          <div
            className={`${
              showFilters ? "flex" : "hidden sm:flex"
            } items-center gap-2 flex-wrap mb-6 pb-4 border-b border-border`}
            data-ocid="products.category_filters"
          >
            <span className="text-sm font-medium text-muted-foreground mr-1">
              Category:
            </span>
            {(["All", ...CATEGORIES] as ("All" | Category)[]).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200 ${
                  activeCategory === cat
                    ? "bg-accent text-accent-foreground border-accent hover:bg-accent/90"
                    : "bg-card text-foreground border-border hover:border-accent hover:text-accent"
                }`}
                data-ocid={`products.filter_${cat.toLowerCase()}_tab`}
              >
                {cat}
                {categoryCounts[cat] !== undefined && (
                  <span
                    className={`text-xs rounded-full px-1.5 py-0.5 ${
                      activeCategory === cat
                        ? "bg-accent-foreground/20 text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {categoryCounts[cat]}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Product grid */}
        {isLoading ? (
          <ProductGridSkeleton />
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 text-center"
            data-ocid="products.empty_state"
          >
            <PackageSearch className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-display font-bold text-foreground mb-2">
              No products found
            </h2>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Try a different category or clear your current filters.
            </p>
            <Button
              type="button"
              onClick={() => {
                handleCategoryChange("All");
                setSortBy("default");
              }}
              className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6"
              data-ocid="products.clear_filters_button"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
            data-ocid="products.list"
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
