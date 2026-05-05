import { c as createLucideIcon, g as useParams, e as useNavigate, h as useProduct, i as useProductsByCategory, k as useCart, r as reactExports, j as jsxRuntimeExports, b as Button, L as Link, B as Badge, S as ShoppingCart, l as ue } from "./index-WnByi3p_.js";
import { S as StarRating, P as ProductCard } from "./ProductCard-DAzNGAFD.js";
import { S as Skeleton } from "./skeleton-D10MCwd-.js";
import { C as ChevronRight, T as Truck, R as RotateCcw } from "./truck-9iKNlBKP.js";
import { P as Package } from "./package-DuViwcKs.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$2);
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(price);
}
function StockBadge({ qty }) {
  if (qty === 0)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-sm font-semibold text-destructive", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4" }),
      "Out of Stock"
    ] });
  if (qty < 5)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: "inline-flex items-center gap-1 text-sm font-semibold",
        style: { color: "#b45309" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
          "Only ",
          qty,
          " left in stock — order soon!"
        ]
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-sm font-semibold text-green-700", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
    "In Stock"
  ] });
}
function ProductDetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48 mb-6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square w-full rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["t1", "t2", "t3", "t4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Skeleton,
          {
            className: "w-20 h-20 rounded-lg flex-shrink-0"
          },
          k
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-24" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" })
      ] })
    ] })
  ] });
}
const THUMB_KEYS = ["thumb-0", "thumb-1", "thumb-2", "thumb-3"];
const RELATED_KEYS = ["rel-0", "rel-1", "rel-2", "rel-3"];
function ProductDetail() {
  const { id } = useParams({ from: "/product/$id" });
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useProduct(id);
  const { data: related } = useProductsByCategory((product == null ? void 0 : product.category) ?? "");
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = reactExports.useState(0);
  const [quantity, setQuantity] = reactExports.useState(1);
  reactExports.useEffect(() => {
    setActiveImage(0);
    setQuantity(1);
  }, [id]);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(ProductDetailSkeleton, {});
  if (isError || !product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-4xl mx-auto px-4 py-20 text-center",
        "data-ocid": "product.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-16 h-16 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground mb-2", children: "Product Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "The product you're looking for doesn't exist or has been removed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: () => navigate({ to: "/products" }),
              className: "bg-accent hover:bg-accent/90 text-accent-foreground",
              children: "Browse All Products"
            }
          )
        ]
      }
    );
  }
  const isOnSale = product.salePrice !== null && product.salePrice < product.price;
  const displayPrice = isOnSale ? product.salePrice : product.price;
  const discountPct = isOnSale ? Math.round((1 - product.salePrice / product.price) * 100) : 0;
  const maxQty = Math.max(product.stockQuantity, 1);
  const baseImages = product.images.length > 0 ? product.images : ["/assets/images/placeholder.svg"];
  const galleryImages = baseImages.length >= 2 ? baseImages : [
    baseImages[0],
    "/assets/generated/product-detail-hero.dim_600x600.jpg",
    baseImages[0],
    "/assets/generated/product-detail-hero.dim_600x600.jpg"
  ];
  const relatedProducts = (related ?? []).filter((p) => p.id !== product.id).slice(0, 4);
  function handleAddToCart() {
    addToCart(product, quantity);
    ue.success(`${product.title} added to cart!`, { duration: 3e3 });
  }
  function handleBuyNow() {
    addToCart(product, quantity);
    navigate({ to: "/cart" });
  }
  function decQty() {
    setQuantity((q) => Math.max(1, q - 1));
  }
  function incQty() {
    setQuantity((q) => Math.min(maxQty, q + 1));
  }
  function handleQtyInput(e) {
    const val = Number.parseInt(e.target.value, 10);
    if (!Number.isNaN(val)) {
      setQuantity(Math.min(Math.max(1, val), maxQty));
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", "data-ocid": "product.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "nav",
      {
        className: "max-w-6xl mx-auto px-4 py-2.5 flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap",
        "aria-label": "Breadcrumb",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/",
              className: "hover:text-accent transition-colors duration-200",
              children: "Home"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/products",
              className: "hover:text-accent transition-colors duration-200",
              children: "Products"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate max-w-xs", children: product.title })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "product.gallery", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square rounded-xl overflow-hidden border border-border bg-muted/20 shadow-subtle", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: galleryImages[activeImage] ?? "/assets/images/placeholder.svg",
                alt: product.title,
                className: "w-full h-full object-cover transition-smooth"
              }
            ),
            isOnSale && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "absolute top-4 left-4 bg-accent text-accent-foreground text-sm font-bold px-2.5 py-1", children: [
              "-",
              discountPct,
              "% OFF"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1", children: galleryImages.map((img, i) => {
            const thumbKey = THUMB_KEYS[i] ?? `thumb-${i}`;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setActiveImage(i),
                "data-ocid": `product.thumbnail.${i + 1}`,
                "aria-label": `View image ${i + 1}`,
                className: `flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${activeImage === i ? "border-accent shadow-md" : "border-border hover:border-accent/50"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: img,
                    alt: `${product.title} view ${i + 1}`,
                    className: "w-full h-full object-cover",
                    loading: "lazy"
                  }
                )
              },
              thumbKey
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", "data-ocid": "product.info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-accent", children: product.brand }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "SKU: ",
              product.sku
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h1",
            {
              className: "font-display text-3xl lg:text-4xl font-bold text-foreground leading-tight",
              "data-ocid": "product.title",
              children: product.title
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StarRating,
              {
                rating: product.rating,
                reviewCount: product.reviewCount,
                showCount: true,
                size: "md"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-accent font-bold", children: [
              product.rating.toFixed(1),
              " ★"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex items-baseline gap-3 flex-wrap",
              "data-ocid": "product.price",
              children: isOnSale ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-bold text-accent", children: formatPrice(displayPrice) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl text-muted-foreground line-through", children: formatPrice(product.price) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-accent/10 text-accent border border-accent/30 font-semibold", children: [
                  "Save ",
                  discountPct,
                  "%"
                ] })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-bold text-foreground", children: formatPrice(displayPrice) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "product.stock_status", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StockBadge, { qty: product.stockQuantity }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Sold by:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: product.sellerName })
          ] }),
          product.stockQuantity > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-muted-foreground", children: "Qty:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-border rounded-lg overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: decQty,
                  disabled: quantity <= 1,
                  "data-ocid": "product.qty_dec_button",
                  "aria-label": "Decrease quantity",
                  className: "w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  value: quantity,
                  onChange: handleQtyInput,
                  min: 1,
                  max: maxQty,
                  "data-ocid": "product.qty_input",
                  "aria-label": "Quantity",
                  className: "w-14 h-10 text-center text-sm font-semibold border-x border-border bg-background focus:outline-none focus:ring-1 focus:ring-accent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: incQty,
                  disabled: quantity >= maxQty,
                  "data-ocid": "product.qty_inc_button",
                  "aria-label": "Increase quantity",
                  className: "w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              product.stockQuantity,
              " available"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                onClick: handleAddToCart,
                disabled: product.stockQuantity === 0,
                "data-ocid": "product.add_to_cart_button",
                className: "w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground text-base font-semibold transition-colors duration-200 shadow-subtle",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-5 h-5 mr-2" }),
                  "Add to Cart"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                onClick: handleBuyNow,
                disabled: product.stockQuantity === 0,
                variant: "outline",
                "data-ocid": "product.buy_now_button",
                className: "w-full h-12 border-foreground text-foreground hover:bg-foreground hover:text-background text-base font-semibold transition-colors duration-200",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 mr-2" }),
                  "Buy Now"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 pt-2", children: [
            { Icon: Truck, label: "Free Shipping", sub: "Orders $49+" },
            {
              Icon: RotateCcw,
              label: "Easy Returns",
              sub: "30-day policy"
            },
            { Icon: Shield, label: "Secure Pay", sub: "100% protected" }
          ].map(({ Icon, label, sub }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center text-center p-2.5 rounded-lg bg-muted/30",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-accent mb-1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: sub })
              ]
            },
            label
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mt-12 border-t border-border pt-8",
          "data-ocid": "product.description_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-4", children: "Product Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed text-base", children: product.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
                { label: "Brand", value: product.brand },
                { label: "Category", value: product.category },
                { label: "Seller", value: product.sellerName },
                { label: "SKU", value: product.sku }
              ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: value })
              ] }, label)) })
            ] })
          ]
        }
      ),
      relatedProducts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12", "data-ocid": "product.related_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Related Products" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/products",
              className: "text-sm text-accent font-medium hover:underline transition-colors",
              "data-ocid": "product.view_all_link",
              children: "View All"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: relatedProducts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProductCard,
          {
            product: p,
            index: i
          },
          RELATED_KEYS[i] ?? p.id
        )) })
      ] })
    ] })
  ] });
}
export {
  ProductDetail as default
};
