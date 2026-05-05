import { d as useSearch, e as useNavigate, r as reactExports, f as useProducts, C as CATEGORIES, j as jsxRuntimeExports, b as Button, B as Badge } from "./index-WnByi3p_.js";
import { P as ProductCard } from "./ProductCard-DAzNGAFD.js";
import { S as Skeleton } from "./skeleton-D10MCwd-.js";
import { S as SlidersHorizontal, P as PackageSearch } from "./sliders-horizontal-B84ussR-.js";
const SORT_LABELS = {
  default: "Featured",
  price_asc: "Price: Low to High",
  price_desc: "Price: High to Low",
  rating: "Top Rated",
  newest: "Newest"
};
function ProductGridSkeleton() {
  const skeletonIds = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: skeletonIds.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-lg" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full" })
  ] }, id)) });
}
function ProductsPage() {
  const search = useSearch({ strict: false });
  const navigate = useNavigate();
  const urlCategory = search.category ?? "All";
  const [activeCategory, setActiveCategory] = reactExports.useState(
    urlCategory
  );
  const [sortBy, setSortBy] = reactExports.useState("default");
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const { data: allProducts, isLoading } = useProducts();
  reactExports.useEffect(() => {
    setActiveCategory(urlCategory);
  }, [urlCategory]);
  function handleCategoryChange(cat) {
    setActiveCategory(cat);
    navigate({
      to: "/products",
      search: cat === "All" ? {} : { category: cat },
      replace: true
    });
  }
  const filtered = allProducts ? allProducts.filter((p) => {
    if (search.q) {
      const q = search.q.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
    }
    if (search.featured === "true") return p.isFeatured;
    if (search.deals === "true") return p.salePrice !== null;
    if (activeCategory !== "All") return p.category === activeCategory;
    return true;
  }).sort((a, b) => {
    if (sortBy === "price_asc")
      return (a.salePrice ?? a.price) - (b.salePrice ?? b.price);
    if (sortBy === "price_desc")
      return (b.salePrice ?? b.price) - (a.salePrice ?? a.price);
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "newest") return Number(b.id) - Number(a.id);
    return 0;
  }) : [];
  const categoryCounts = allProducts ? Object.fromEntries(
    ["All", ...CATEGORIES].map((cat) => [
      cat,
      cat === "All" ? allProducts.length : allProducts.filter((p) => p.category === cat).length
    ])
  ) : {};
  const pageTitle = search.q ? `Results for "${search.q}"` : search.featured === "true" ? "Featured Products" : search.deals === "true" ? "Deals of the Day" : activeCategory === "All" ? "All Products" : activeCategory;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", "data-ocid": "products.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: pageTitle }),
          !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
            filtered.length,
            " result",
            filtered.length !== 1 ? "s" : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "sm:hidden flex items-center gap-1.5",
              onClick: () => setShowFilters((v) => !v),
              "data-ocid": "products.filter_toggle",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-4 h-4" }),
                "Filters"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground hidden sm:inline", children: "Sort:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                value: sortBy,
                onChange: (e) => setSortBy(e.target.value),
                className: "text-sm border border-border rounded-md px-3 py-1.5 bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer",
                "data-ocid": "products.sort_select",
                children: Object.entries(SORT_LABELS).map(([val, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: val, children: label }, val))
              }
            )
          ] })
        ] })
      ] }),
      (search.q || search.featured || search.deals) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-3 flex-wrap", children: [
        search.q && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs rounded-full", children: [
          "Search: “",
          search.q,
          "”"
        ] }),
        search.featured === "true" && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs rounded-full", children: "Featured only" }),
        search.deals === "true" && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs rounded-full bg-accent/10 text-accent border-accent/30", children: "On Sale" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-6", children: [
      !search.q && !search.featured && !search.deals && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `${showFilters ? "flex" : "hidden sm:flex"} items-center gap-2 flex-wrap mb-6 pb-4 border-b border-border`,
          "data-ocid": "products.category_filters",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-muted-foreground mr-1", children: "Category:" }),
            ["All", ...CATEGORIES].map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => handleCategoryChange(cat),
                className: `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200 ${activeCategory === cat ? "bg-accent text-accent-foreground border-accent hover:bg-accent/90" : "bg-card text-foreground border-border hover:border-accent hover:text-accent"}`,
                "data-ocid": `products.filter_${cat.toLowerCase()}_tab`,
                children: [
                  cat,
                  categoryCounts[cat] !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-xs rounded-full px-1.5 py-0.5 ${activeCategory === cat ? "bg-accent-foreground/20 text-accent-foreground" : "bg-muted text-muted-foreground"}`,
                      children: categoryCounts[cat]
                    }
                  )
                ]
              },
              cat
            ))
          ]
        }
      ),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProductGridSkeleton, {}) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-24 text-center",
          "data-ocid": "products.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PackageSearch, { className: "w-16 h-16 text-muted-foreground mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground mb-2", children: "No products found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6 max-w-sm", children: "Try a different category or clear your current filters." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                onClick: () => {
                  handleCategoryChange("All");
                  setSortBy("default");
                },
                className: "bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6",
                "data-ocid": "products.clear_filters_button",
                children: "Clear Filters"
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4",
          "data-ocid": "products.list",
          children: filtered.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, index: i }, product.id))
        }
      )
    ] })
  ] });
}
export {
  ProductsPage as default
};
