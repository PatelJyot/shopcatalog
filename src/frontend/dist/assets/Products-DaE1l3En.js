import { c as createLucideIcon, u as useSearch, b as useNavigate, r as reactExports, C as CATEGORIES, j as jsxRuntimeExports, a as Button, B as Badge } from "./index-CbaAsIMs.js";
import { b as useProducts, P as ProductCard, S as Skeleton } from "./useProducts-BHoPU7RZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h"
    }
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }],
  ["circle", { cx: "18.5", cy: "15.5", r: "2.5", key: "b5zd12" }],
  ["path", { d: "M20.27 17.27 22 19", key: "1l4muz" }]
];
const PackageSearch = createLucideIcon("package-search", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
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
