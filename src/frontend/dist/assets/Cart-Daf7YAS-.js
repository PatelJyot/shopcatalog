import { c as createLucideIcon, k as useCart, e as useNavigate, j as jsxRuntimeExports, S as ShoppingCart, b as Button, L as Link, l as ue } from "./index-WnByi3p_.js";
import { S as Separator } from "./separator-CFVLorHG.js";
import "./index-jbvIYv-3.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}
const GST_RATE = 0.18;
const FREE_DELIVERY_THRESHOLD = 499;
const DELIVERY_CHARGE = 50;
function Cart() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();
  const subtotal = totalPrice;
  const gst = Math.round(subtotal * GST_RATE);
  const deliveryCharge = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const total = subtotal + gst + deliveryCharge;
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-4xl mx-auto px-4 py-16 text-center",
        "data-ocid": "cart.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-16 h-16 mx-auto text-muted-foreground mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground mb-2", children: "Your cart is empty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Looks like you haven't added anything yet." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              className: "bg-accent hover:bg-accent/90 text-accent-foreground",
              "data-ocid": "cart.shop_now_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: "Start Shopping" })
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 py-8", "data-ocid": "cart.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => void navigate({ to: "/products" }),
          className: "text-muted-foreground hover:text-foreground transition-colors duration-200",
          "aria-label": "Back to products",
          "data-ocid": "cart.back_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-display font-bold text-foreground", children: [
        "Shopping Cart (",
        totalItems,
        " item",
        totalItems !== 1 ? "s" : "",
        ")"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-4", children: items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-lg p-4 flex gap-4",
          "data-ocid": `cart.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: item.product.images[0] ?? "/assets/images/placeholder.svg",
                alt: item.product.title,
                className: "w-24 h-24 object-cover rounded-md bg-muted/30"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/product/$id",
                  params: { id: item.product.id },
                  className: "font-medium text-foreground hover:text-accent transition-colors duration-200 line-clamp-2",
                  children: item.product.title
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                item.product.brand,
                " · ",
                item.product.sellerName
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-border rounded", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateQuantity(item.product.id, item.quantity - 1),
                      className: "w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors duration-200",
                      "aria-label": "Decrease quantity",
                      "data-ocid": `cart.decrease_button.${idx + 1}`,
                      children: "-"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "w-8 text-center text-sm font-medium",
                      "data-ocid": `cart.quantity.${idx + 1}`,
                      children: item.quantity
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => updateQuantity(item.product.id, item.quantity + 1),
                      className: "w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors duration-200",
                      "aria-label": "Increase quantity",
                      "data-ocid": `cart.increase_button.${idx + 1}`,
                      children: "+"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      removeFromCart(item.product.id);
                      ue.success("Item removed from cart");
                    },
                    className: "text-sm text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors duration-200",
                    "data-ocid": `cart.delete_button.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                      "Remove"
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-accent text-base", children: formatINR(
                (item.product.salePrice ?? item.product.price) * item.quantity
              ) }),
              item.quantity > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                formatINR(item.product.salePrice ?? item.product.price),
                " ",
                "each"
              ] })
            ] })
          ]
        },
        item.product.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-6 h-fit sticky top-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground mb-4", children: "Order Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Subtotal (",
              totalItems,
              " items)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatINR(subtotal) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GST (18%)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatINR(gst) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Delivery" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: deliveryCharge === 0 ? "text-[color:var(--accent)] font-medium" : "text-muted-foreground",
                children: deliveryCharge === 0 ? "FREE" : formatINR(deliveryCharge)
              }
            )
          ] }),
          deliveryCharge > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Add ",
            formatINR(FREE_DELIVERY_THRESHOLD - subtotal),
            " more for free delivery"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-base text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatINR(total) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            asChild: true,
            className: "w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground font-medium",
            "data-ocid": "cart.checkout_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/checkout", children: "Proceed to Checkout" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            variant: "outline",
            className: "w-full mt-2",
            "data-ocid": "cart.continue_shopping_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: "Continue Shopping" })
          }
        )
      ] })
    ] })
  ] });
}
export {
  Cart as default
};
