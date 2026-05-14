import { e as useNavigate, d as useSearch, r as reactExports, q as useSearchProducts, j as jsxRuntimeExports, b as Button, B as Badge, X } from "./index-CDI_idwZ.js";
import { C as Checkbox, S as Switch } from "./switch-C6ooOL9L.js";
import { L as Label } from "./label-iMFkthOJ.js";
import { S as Skeleton } from "./skeleton-DMvFTnKJ.js";
import { S as SlidersHorizontal } from "./sliders-horizontal-C3DB2a05.js";
import { P as PackageSearch } from "./package-search-Dy1r8bpn.js";
import { S as Star } from "./star-D95wk3S2.js";
import "./index-oGGg4JoU.js";
import "./index-MKM3TZ4q.js";
const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating_desc", label: "Avg. Customer Review" },
  { value: "newest", label: "Newest Arrivals" }
];
const PRICE_RANGES = [
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 to $50", min: 25, max: 50 },
  { label: "$50 to $100", min: 50, max: 100 },
  { label: "$100 to $200", min: 100, max: 200 },
  { label: "$200 & Above", min: 200, max: 99999 }
];
const CATEGORY_LIST = ["Electronics", "Fashion", "Grocery", "Books", "Home"];
function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(price);
}
const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"];
function StarRatingInline({ rating }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-0.5", children: STAR_KEYS.map((k, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Star,
    {
      className: `w-3.5 h-3.5 ${i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"}`
    },
    k
  )) });
}
function ProductGridSkeleton() {
  const ids = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: ids.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-lg" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full" })
  ] }, id)) });
}
function SearchResultCard({
  product,
  index
}) {
  const navigate = useNavigate();
  const isOnSale = product.salePrice != null && product.salePrice < product.price;
  const displayPrice = isOnSale ? product.salePrice : product.price;
  const discountPct = isOnSale ? Math.round((1 - product.salePrice / product.price) * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: "bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col cursor-pointer group w-full text-left",
      onClick: () => void navigate({
        to: "/product/$id",
        params: { id: String(product.id) }
      }),
      "data-ocid": `search.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: product.images[0] ?? "/assets/images/placeholder.svg",
              alt: product.title,
              className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
              loading: "lazy"
            }
          ),
          isOnSale && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-bold", children: [
            "-",
            discountPct,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex flex-col gap-1.5 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground line-clamp-2 leading-snug group-hover:text-accent transition-colors", children: product.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StarRatingInline, { rating: product.rating }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "(",
              Number(product.reviewCount).toLocaleString(),
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1.5 mt-auto pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-bold text-accent", children: formatPrice(displayPrice) }),
            isOnSale && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground line-through", children: formatPrice(product.price) })
          ] }),
          Number(product.stockQuantity) === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive font-medium", children: "Out of stock" })
        ] })
      ]
    }
  );
}
function SearchPage() {
  const navigate = useNavigate();
  const rawSearch = useSearch({ strict: false });
  const query = rawSearch.q ?? "";
  const sortBy = rawSearch.sort ?? "relevance";
  const selectedCategories = rawSearch.categories ? rawSearch.categories.split(",").filter(Boolean) : [];
  const selectedBrands = rawSearch.brands ? rawSearch.brands.split(",").filter(Boolean) : [];
  const minPrice = rawSearch.minPrice ? Number(rawSearch.minPrice) : 0;
  const maxPrice = rawSearch.maxPrice ? Number(rawSearch.maxPrice) : 99999;
  const minRating = rawSearch.minRating ? Number(rawSearch.minRating) : 0;
  const inStockOnly = rawSearch.inStock === "1";
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(false);
  function buildSearch(updates) {
    const base = {
      q: query || void 0,
      sort: sortBy !== "relevance" ? sortBy : void 0,
      categories: selectedCategories.length > 0 ? selectedCategories.join(",") : void 0,
      brands: selectedBrands.length > 0 ? selectedBrands.join(",") : void 0,
      minPrice: minPrice > 0 ? String(minPrice) : void 0,
      maxPrice: maxPrice < 99999 ? String(maxPrice) : void 0,
      minRating: minRating > 0 ? String(minRating) : void 0,
      inStock: inStockOnly ? "1" : void 0
    };
    return Object.fromEntries(
      Object.entries({ ...base, ...updates }).filter(
        ([, v]) => v !== void 0
      )
    );
  }
  function updateSearch(updates) {
    void navigate({
      to: "/search",
      search: buildSearch(updates),
      replace: true
    });
  }
  function toggleCategory(cat) {
    const next = selectedCategories.includes(cat) ? selectedCategories.filter((c) => c !== cat) : [...selectedCategories, cat];
    updateSearch({
      categories: next.length > 0 ? next.join(",") : void 0
    });
  }
  function toggleBrand(brand) {
    const next = selectedBrands.includes(brand) ? selectedBrands.filter((b) => b !== brand) : [...selectedBrands, brand];
    updateSearch({ brands: next.length > 0 ? next.join(",") : void 0 });
  }
  function setSort(sort) {
    updateSearch({ sort: sort !== "relevance" ? sort : void 0 });
  }
  function setPriceRange(min, max) {
    updateSearch({
      minPrice: min > 0 ? String(min) : void 0,
      maxPrice: max < 99999 ? String(max) : void 0
    });
  }
  function setMinRatingFilter(val) {
    updateSearch({ minRating: val > 0 ? String(val) : void 0 });
  }
  function setInStock(val) {
    updateSearch({ inStock: val ? "1" : void 0 });
  }
  function clearFilters() {
    void navigate({
      to: "/search",
      search: query ? { q: query } : {},
      replace: true
    });
  }
  const pageSize = 48;
  const page = 1;
  const params = {
    searchQuery: query,
    categories: selectedCategories,
    brands: selectedBrands,
    minPrice,
    maxPrice,
    minRating,
    inStock: inStockOnly,
    sortBy,
    page,
    pageSize
  };
  const { data, isLoading } = useSearchProducts(params);
  const products = (data == null ? void 0 : data.products) ?? [];
  const total = (data == null ? void 0 : data.total) ?? 0;
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  const activeFilterCount = selectedCategories.length + selectedBrands.length + (minRating > 0 ? 1 : 0) + (inStockOnly ? 1 : 0) + (minPrice > 0 || maxPrice < 99999 ? 1 : 0);
  const uniqueBrands = [...new Set(products.map((p) => p.brand))].slice(0, 10);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", "data-ocid": "search.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: query ? /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-xl font-bold text-foreground", children: [
        isLoading ? "Searching..." : total > 0 ? `${start.toLocaleString()}-${end.toLocaleString()} of ${total.toLocaleString()} results for` : "No results for",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-accent", children: [
          "“",
          query,
          "”"
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: "All Products" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "md:hidden flex items-center gap-1.5",
            onClick: () => setSidebarOpen((v) => !v),
            "data-ocid": "search.filter_toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-4 h-4" }),
              "Filters",
              activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-1 h-5 w-5 p-0 flex items-center justify-center bg-accent text-accent-foreground text-xs rounded-full", children: activeFilterCount })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: sortBy,
            onChange: (e) => setSort(e.target.value),
            className: "text-sm border border-border rounded-md px-3 py-1.5 bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-accent",
            "data-ocid": "search.sort_select",
            children: SORT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value, children: opt.label }, opt.value))
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-6 flex gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "aside",
        {
          className: `w-56 flex-shrink-0 flex-col gap-6 ${sidebarOpen ? "flex" : "hidden md:flex"}`,
          "data-ocid": "search.filter_sidebar",
          children: [
            activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground", children: [
                "Filters (",
                activeFilterCount,
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: clearFilters,
                  className: "text-xs text-accent hover:underline flex items-center gap-1",
                  "data-ocid": "search.clear_filters_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }),
                    " Clear all"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-2.5", children: "Category" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex flex-col gap-2",
                  "data-ocid": "search.category_filters",
                  children: CATEGORY_LIST.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Checkbox,
                      {
                        id: `cat-${cat}`,
                        checked: selectedCategories.includes(cat),
                        onCheckedChange: () => toggleCategory(cat),
                        "data-ocid": `search.category_${cat.toLowerCase()}_checkbox`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: `cat-${cat}`,
                        className: "text-sm text-foreground cursor-pointer",
                        children: cat
                      }
                    )
                  ] }, cat))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-2.5", children: "Price" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: PRICE_RANGES.map((range) => {
                const active = minPrice === range.min && maxPrice === range.max;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setPriceRange(
                      active ? 0 : range.min,
                      active ? 99999 : range.max
                    ),
                    className: `text-left text-sm px-2 py-1 rounded transition-colors ${active ? "text-accent font-medium bg-accent/10" : "text-foreground hover:text-accent hover:bg-accent/5"}`,
                    "data-ocid": `search.price_range_${range.min}_button`,
                    children: range.label
                  },
                  range.label
                );
              }) })
            ] }),
            uniqueBrands.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-2.5", children: "Brand" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex flex-col gap-2",
                  "data-ocid": "search.brand_filters",
                  children: uniqueBrands.map((brand) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Checkbox,
                      {
                        id: `brand-${brand}`,
                        checked: selectedBrands.includes(brand),
                        onCheckedChange: () => toggleBrand(brand),
                        "data-ocid": `search.brand_${brand.toLowerCase().replace(/[^a-z0-9]/g, "_")}_checkbox`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: `brand-${brand}`,
                        className: "text-sm text-foreground cursor-pointer",
                        children: brand
                      }
                    )
                  ] }, brand))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-2.5", children: "Avg. Customer Review" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: [4, 3, 2, 1].map((stars) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setMinRatingFilter(minRating === stars ? 0 : stars),
                  className: `flex items-center gap-1.5 text-sm px-2 py-1 rounded transition-colors ${minRating === stars ? "text-accent font-medium bg-accent/10" : "text-foreground hover:text-accent hover:bg-accent/5"}`,
                  "data-ocid": `search.rating_${stars}_button`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StarRatingInline, { rating: stars }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "& Up" })
                  ]
                },
                stars
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  id: "in-stock",
                  checked: inStockOnly,
                  onCheckedChange: (v) => setInStock(!!v),
                  "data-ocid": "search.in_stock_switch"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "in-stock",
                  className: "text-sm text-foreground cursor-pointer",
                  children: "In Stock Only"
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProductGridSkeleton, {}) : products.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-24 text-center",
          "data-ocid": "search.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PackageSearch, { className: "w-16 h-16 text-muted-foreground mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-display font-bold text-foreground mb-2", children: [
              "No results",
              query ? ` for “${query}”` : ""
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6 max-w-sm", children: "Try different keywords, remove some filters, or browse a category." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 justify-center", children: [
              activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  onClick: clearFilters,
                  variant: "outline",
                  "data-ocid": "search.clear_filters_empty_button",
                  children: "Clear Filters"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  onClick: () => void navigate({ to: "/products" }),
                  className: "bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6",
                  "data-ocid": "search.browse_all_button",
                  children: "Browse All Products"
                }
              )
            ] })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
          "data-ocid": "search.results_list",
          children: products.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            SearchResultCard,
            {
              product,
              index: i
            },
            String(product.id)
          ))
        }
      ) })
    ] })
  ] });
}
export {
  SearchPage as default
};
