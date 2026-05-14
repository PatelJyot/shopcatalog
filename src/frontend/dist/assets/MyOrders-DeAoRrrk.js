import { r as reactExports, j as jsxRuntimeExports, L as Link, b as Button } from "./index-CDI_idwZ.js";
import { S as Skeleton } from "./skeleton-DMvFTnKJ.js";
import { u as useOrders, i as isActiveOrder, a as isCompletedOrder, b as isCancelledOrder, f as formatDate, c as formatPrice, g as getStatusLabel, d as getStatusCssClass } from "./useOrders-BKx2-WkE.js";
import { C as ChevronRight } from "./chevron-right-B3ZGuErb.js";
import { C as CircleAlert } from "./circle-alert-XXRj3ipx.js";
import { P as PackageSearch } from "./package-search-Dy1r8bpn.js";
import { P as Package } from "./package-QhM0exBy.js";
import "./useMutation-BJHgXTJq.js";
const TABS = [
  { key: "all", label: "All Orders" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" }
];
function filterOrders(orders, tab) {
  const sorted = [...orders].sort(
    (a, b) => b.createdAt > a.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
  );
  if (tab === "active")
    return sorted.filter((o) => isActiveOrder(o.orderStatus));
  if (tab === "completed")
    return sorted.filter((o) => isCompletedOrder(o.orderStatus));
  if (tab === "cancelled")
    return sorted.filter((o) => isCancelledOrder(o.orderStatus));
  return sorted;
}
function OrderStatusBadge({ status }) {
  const cssClass = getStatusCssClass(status);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `status-badge ${cssClass}`, children: getStatusLabel(status) });
}
function OrderRowSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-4 flex gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-16 h-16 rounded-md flex-shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24" })
    ] })
  ] });
}
function OrderRow({ order, index }) {
  var _a, _b;
  const itemCount = order.items.length;
  const firstImage = (_a = order.items[0]) == null ? void 0 : _a.image;
  const shortId = order.id.toString().slice(-8);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow",
      "data-ocid": `orders.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 border-b border-border px-4 py-2 flex flex-wrap items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase tracking-wide font-semibold", children: "Order Placed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(order.createdAt) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:block", children: "|" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:block font-semibold text-foreground", children: formatPrice(order.totalPrice) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "Order",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-semibold text-foreground", children: [
              "#",
              shortId
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col sm:flex-row gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: firstImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: firstImage,
              alt: "order item",
              className: "w-16 h-16 object-cover rounded-md border border-border"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-muted rounded-md flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-6 h-6 text-muted-foreground" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center gap-2 mb-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(OrderStatusBadge, { status: order.orderStatus }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground font-medium truncate", children: [
              ((_b = order.items[0]) == null ? void 0 : _b.title) ?? "Order items",
              itemCount > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-normal", children: [
                " ",
                "+",
                itemCount - 1,
                " more item",
                itemCount - 1 !== 1 ? "s" : ""
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              itemCount,
              " item",
              itemCount !== 1 ? "s" : "",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "sm:hidden", children: [
                " ",
                "· ",
                formatPrice(order.totalPrice)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row sm:flex-col gap-2 items-center sm:items-end justify-end flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                asChild: true,
                className: "text-accent border-accent/30 hover:bg-accent/5 hover:border-accent/60",
                "data-ocid": `orders.view_details_button.${index}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/order/$id", params: { id: order.id.toString() }, children: "View Details" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                asChild: true,
                className: "text-muted-foreground hover:text-foreground",
                "data-ocid": `orders.track_button.${index}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/order/$id", params: { id: order.id.toString() }, children: "Track Order" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function MyOrders() {
  const [activeTab, setActiveTab] = reactExports.useState("all");
  const { data: orders, isLoading, isError } = useOrders();
  const filtered = filterOrders(orders ?? [], activeTab);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-6", "data-ocid": "orders.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-1.5 text-xs text-muted-foreground mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-accent transition-colors", children: "Home" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "My Orders" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground mb-6", children: "My Orders" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-0 mb-6 border-b border-border overflow-x-auto",
        "data-ocid": "orders.filter.tab",
        children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab(tab.key),
            "data-ocid": `orders.tab.${tab.key}`,
            className: `px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors relative ${activeTab === tab.key ? "text-accent border-b-2 border-accent -mb-px" : "text-muted-foreground hover:text-foreground"}`,
            children: [
              tab.label,
              tab.key !== "all" && orders && (() => {
                const count = filterOrders(orders, tab.key).length;
                return count > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 text-xs bg-muted text-muted-foreground rounded-full px-1.5 py-0.5", children: count }) : null;
              })()
            ]
          },
          tab.key
        ))
      }
    ),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "orders.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderRowSkeleton, {}, i)) }),
    isError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-12 text-center",
        "data-ocid": "orders.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-12 h-12 text-destructive mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground mb-1", children: "Failed to load orders" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Please refresh the page and try again." })
        ]
      }
    ),
    !isLoading && !isError && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "orders.list", children: filtered.map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderRow, { order, index: idx + 1 }, order.id.toString())) }),
    !isLoading && !isError && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-center",
        "data-ocid": "orders.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageSearch, { className: "w-10 h-10 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground mb-2", children: activeTab === "all" ? "No orders yet" : `No ${activeTab} orders` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6 max-w-xs", children: activeTab === "all" ? "When you place an order, it will appear here." : `You have no ${activeTab} orders at this time.` }),
          activeTab === "all" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              className: "bg-accent hover:bg-accent/90 text-accent-foreground",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", "data-ocid": "orders.shop_now_button", children: "Start Shopping" })
            }
          )
        ]
      }
    )
  ] });
}
export {
  MyOrders as default
};
