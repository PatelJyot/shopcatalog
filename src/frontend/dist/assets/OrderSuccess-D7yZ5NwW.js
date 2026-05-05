import { c as createLucideIcon, d as useSearch, q as useActor, t as useQuery, j as jsxRuntimeExports, b as Button, L as Link, s as createActor } from "./index-WnByi3p_.js";
import { S as Separator } from "./separator-CFVLorHG.js";
import { C as CircleCheck } from "./circle-check-CMmVv3md.js";
import { P as Package } from "./package-DuViwcKs.js";
import "./index-jbvIYv-3.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z", key: "hou9p0" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }]
];
const ShoppingBag = createLucideIcon("shopping-bag", __iconNode);
function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function OrderSuccess() {
  const search = useSearch({ from: "/order-success" });
  const orderId = search.orderId ? BigInt(search.orderId) : void 0;
  const { actor, isFetching } = useActor(createActor);
  const { data: order, isLoading } = useQuery({
    queryKey: ["order", String(orderId)],
    queryFn: async () => {
      if (!actor || orderId === void 0) return null;
      return actor.getOrder(orderId);
    },
    enabled: !!actor && !isFetching && orderId !== void 0
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-2xl mx-auto px-4 py-16 text-center",
      "data-ocid": "order-success.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-10 h-10 text-accent" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground mb-2", children: "Order Placed!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-2", children: "Thank you for shopping with ShopCatalog." }),
        orderId !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-8", children: [
          "Order ID:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-semibold text-foreground", children: [
            "#",
            String(orderId)
          ] })
        ] }),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "bg-card border border-border rounded-lg p-6 text-left mb-8",
            "data-ocid": "order-success.loading_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-pulse space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-1/3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-2/3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-1/2" })
            ] })
          }
        ),
        order && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-lg p-6 text-left mb-8",
            "data-ocid": "order-success.order_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5 text-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Order Details" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: order.items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-3",
                  "data-ocid": `order-success.item.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: item.image,
                        alt: item.title,
                        className: "w-12 h-12 rounded object-cover bg-muted/30"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground line-clamp-1", children: item.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                        "Qty: ",
                        String(item.quantity)
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: formatINR(item.price * Number(item.quantity)) })
                  ]
                },
                `${item.title}-${idx}`
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatINR(order.subtotal) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GST (18%)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatINR(order.taxAmount) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Delivery" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: order.deliveryCharge === 0 ? "FREE" : formatINR(order.deliveryCharge) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-base text-foreground pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total Paid" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatINR(order.totalPrice) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Delivering to" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mt-0.5", children: order.shippingAddress.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs mt-0.5", children: [
                    order.shippingAddress.city,
                    ", ",
                    order.shippingAddress.state,
                    " –",
                    " ",
                    order.shippingAddress.pinCode
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Payment" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-foreground mt-0.5", children: [
                    order.paymentMethod.__kind__ === "COD" && "Cash on Delivery",
                    order.paymentMethod.__kind__ === "UPI" && `UPI – ${order.paymentMethod.UPI}`,
                    order.paymentMethod.__kind__ === "Card" && "Card (Stripe)"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs mt-0.5", children: [
                    "Ordered on ",
                    formatDate(order.createdAt)
                  ] })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col sm:flex-row gap-3 justify-center",
            "data-ocid": "order-success.actions",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  className: "bg-accent hover:bg-accent/90 text-accent-foreground",
                  "data-ocid": "order-success.continue_shopping_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4 mr-2" }),
                    " Continue Shopping"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  variant: "outline",
                  "data-ocid": "order-success.view_orders_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Back to Home" })
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  OrderSuccess as default
};
