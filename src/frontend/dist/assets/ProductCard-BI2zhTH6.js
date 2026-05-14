import { c as createLucideIcon, j as jsxRuntimeExports, p as cn, k as useCart, L as Link, B as Badge, b as Button, S as ShoppingCart, n as ue } from "./index-CDI_idwZ.js";
import { S as Star } from "./star-D95wk3S2.js";
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
      d: "M12 18.338a2.1 2.1 0 0 0-.987.244L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679A.53.53 0 0 1 12 2",
      key: "2ksp49"
    }
  ]
];
const StarHalf = createLucideIcon("star-half", __iconNode);
const SIZE_MAP = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5"
};
function StarRating({
  rating,
  reviewCount,
  showCount = true,
  size = "sm"
}) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const totalStars = 5;
  const iconClass = SIZE_MAP[size];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: Array.from({ length: totalStars }).map((_, i) => {
      const key = `star-${i}`;
      if (i < fullStars) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          Star,
          {
            className: `${iconClass} fill-accent text-accent`
          },
          key
        );
      }
      if (i === fullStars && hasHalf) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          StarHalf,
          {
            className: `${iconClass} fill-accent text-accent`
          },
          key
        );
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Star,
        {
          className: `${iconClass} fill-muted text-muted-foreground`
        },
        key
      );
    }) }),
    showCount && reviewCount !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
      "(",
      reviewCount.toLocaleString(),
      " Reviews)"
    ] })
  ] });
}
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(price);
}
function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const isOnSale = product.salePrice !== null && product.salePrice < product.price;
  const displayPrice = isOnSale ? product.salePrice : product.price;
  const discountPct = isOnSale ? Math.round((1 - product.salePrice / product.price) * 100) : 0;
  function handleAddToCart(e) {
    e.preventDefault();
    addToCart(product);
    ue.success(`${product.title} added to cart!`, { duration: 3e3 });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "group overflow-hidden border border-border bg-card hover:shadow-md transition-shadow duration-200 flex flex-col",
      "data-ocid": `product.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$id", params: { id: product.id }, className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden bg-muted/30", children: [
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
          ] }),
          product.stockQuantity < 5 && product.stockQuantity > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "absolute top-2 right-2 bg-card text-xs border-destructive text-destructive",
              children: [
                "Only ",
                product.stockQuantity,
                " left"
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex flex-col gap-2 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$id", params: { id: product.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "text-sm font-medium text-foreground line-clamp-2 leading-snug hover:text-accent transition-colors duration-200",
              "data-ocid": `product.title.${index + 1}`,
              children: product.title
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StarRating,
            {
              rating: product.rating,
              reviewCount: product.reviewCount,
              showCount: true,
              size: "sm"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-base font-bold text-accent",
                "data-ocid": `product.price.${index + 1}`,
                children: formatPrice(displayPrice)
              }
            ),
            isOnSale && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground line-through", children: formatPrice(product.price) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              onClick: handleAddToCart,
              className: "w-full h-9 bg-accent hover:bg-accent/90 text-accent-foreground text-sm font-medium transition-colors duration-200",
              "data-ocid": `product.add_button.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4 mr-1.5" }),
                "Add to Cart"
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
export {
  ProductCard as P,
  StarRating as S
};
