import { c as createLucideIcon, l as useInternetIdentity, r as reactExports, j as jsxRuntimeExports, b as Button, D as Search, I as Input, B as Badge } from "./index-CDI_idwZ.js";
import { S as Skeleton } from "./skeleton-DMvFTnKJ.js";
import { m as useAllOrders, n as useUpdateOrderStatus, O as ORDER_STATUSES, f as formatDate, c as formatPrice, g as getStatusLabel, d as getStatusCssClass } from "./useOrders-BKx2-WkE.js";
import { C as CircleAlert } from "./circle-alert-XXRj3ipx.js";
import { P as Package } from "./package-QhM0exBy.js";
import { C as ChevronLeft } from "./chevron-left-23S7szVP.js";
import { C as ChevronRight } from "./chevron-right-B3ZGuErb.js";
import "./useMutation-BJHgXTJq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
  ["path", { d: "M17 20V4", key: "1ejh1v" }],
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }]
];
const ArrowUpDown = createLucideIcon("arrow-up-down", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode);
const PAGE_SIZE = 50;
const ALL_STATUSES = [
  ...ORDER_STATUSES,
  "cancelled",
  "returned"
];
function StatusBadge({ status }) {
  const css = getStatusCssClass(status);
  const colorMap = {
    "status-placed": "bg-muted text-foreground border border-border",
    "status-confirmed": "bg-accent/15 text-accent border border-accent/30",
    "status-packed": "bg-accent/15 text-accent border border-accent/30",
    "status-shipped": "bg-accent/15 text-accent border border-accent/30",
    "status-out-for-delivery": "bg-warning/15 text-warning-foreground border border-warning/30",
    "status-delivered": "bg-success/15 text-success border border-success/30",
    "status-cancelled": "bg-destructive/15 text-destructive border border-destructive/30",
    "status-returned": "bg-muted text-muted-foreground border border-border"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      className: `text-xs font-medium px-2 py-0.5 ${colorMap[css] ?? colorMap["status-placed"]} rounded-full`,
      children: getStatusLabel(status)
    }
  );
}
function TableSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: ["a", "b", "c", "d", "e", "f", "g", "h"].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: ["1", "2", "3", "4", "5", "6", "7", "8"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }) }, `sk-c-${c}`)) }, `sk-r-${r}`)) });
}
function AdminOrders() {
  const { isAuthenticated, login } = useInternetIdentity();
  const { data, isLoading } = useAllOrders(BigInt(0), BigInt(1e3));
  const updateStatus = useUpdateOrderStatus();
  const [searchRaw, setSearchRaw] = reactExports.useState("");
  const [search, setSearch] = reactExports.useState("");
  const searchTimer = reactExports.useRef(null);
  const [page, setPage] = reactExports.useState(1);
  const [sortField, setSortField] = reactExports.useState("date");
  const [sortDir, setSortDir] = reactExports.useState("desc");
  const [selectedIds, setSelectedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [bulkStatus, setBulkStatus] = reactExports.useState(ALL_STATUSES[0]);
  const [updatingIds, setUpdatingIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const handleSearchChange = reactExports.useCallback((val) => {
    setSearchRaw(val);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setSearch(val.trim().toLowerCase());
      setPage(1);
    }, 300);
  }, []);
  const allOrders = reactExports.useMemo(() => (data == null ? void 0 : data.orders) ?? [], [data]);
  const filtered = reactExports.useMemo(() => {
    if (!search) return allOrders;
    return allOrders.filter((o) => {
      const idStr = o.id.toString();
      const principal = o.userId.toString() ?? "";
      return idStr.includes(search) || principal.toLowerCase().includes(search);
    });
  }, [allOrders, search]);
  const sorted = reactExports.useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortField === "date") {
        const diff2 = Number(a.createdAt - b.createdAt);
        return sortDir === "asc" ? diff2 : -diff2;
      }
      const diff = a.totalPrice - b.totalPrice;
      return sortDir === "asc" ? diff : -diff;
    });
  }, [filtered, sortField, sortDir]);
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => d === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
    setPage(1);
  };
  const allPageSelected = paginated.length > 0 && paginated.every((o) => selectedIds.has(o.id.toString()));
  const toggleSelectAll = () => {
    if (allPageSelected) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        for (const o of paginated) next.delete(o.id.toString());
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        for (const o of paginated) next.add(o.id.toString());
        return next;
      });
    }
  };
  const toggleRow = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const handleStatusChange = async (order, status) => {
    const idStr = order.id.toString();
    setUpdatingIds((prev) => new Set(prev).add(idStr));
    await updateStatus.mutateAsync({ orderId: order.id, status });
    setUpdatingIds((prev) => {
      const next = new Set(prev);
      next.delete(idStr);
      return next;
    });
  };
  const handleBulkApply = async () => {
    const ids = Array.from(selectedIds);
    const ordersToUpdate = allOrders.filter(
      (o) => ids.includes(o.id.toString())
    );
    setUpdatingIds(new Set(ids));
    await Promise.all(
      ordersToUpdate.map(
        (o) => updateStatus.mutateAsync({ orderId: o.id, status: bulkStatus })
      )
    );
    setUpdatingIds(/* @__PURE__ */ new Set());
    setSelectedIds(/* @__PURE__ */ new Set());
  };
  const shortenPrincipal = (p) => {
    if (p.length <= 14) return p;
    return `${p.slice(0, 6)}…${p.slice(-5)}`;
  };
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center",
        "data-ocid": "admin.access_denied",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-foreground", children: "Access Denied" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xs", children: "You must be logged in as an admin to view this page." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => login(), "data-ocid": "admin.login_button", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4 mr-2" }),
            " Sign In"
          ] })
        ]
      }
    );
  }
  const selectedCount = selectedIds.size;
  const totalOrders = (data == null ? void 0 : data.total) ?? BigInt(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "admin.orders_page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-6 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-6 h-6 text-accent" }),
          "Order Management"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: isLoading ? "Loading orders…" : `${Number(totalOrders).toLocaleString()} total orders` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "admin.search_input",
            className: "pl-9 bg-background",
            placeholder: "Search by Order ID or customer\\u2026",
            value: searchRaw,
            onChange: (e) => handleSearchChange(e.target.value)
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/60 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left w-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              "data-ocid": "admin.select_all_checkbox",
              className: "w-4 h-4 accent-accent cursor-pointer rounded",
              checked: allPageSelected,
              onChange: toggleSelectAll
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-semibold text-muted-foreground uppercase tracking-wide text-xs", children: "Order ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-semibold text-muted-foreground uppercase tracking-wide text-xs", children: "Customer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "px-4 py-3 text-left font-semibold text-muted-foreground uppercase tracking-wide text-xs",
              "data-ocid": "admin.sort_date",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors select-none",
                  onClick: () => toggleSort("date"),
                  children: [
                    "Date ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "w-3 h-3" })
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-semibold text-muted-foreground uppercase tracking-wide text-xs", children: "Items" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "px-4 py-3 text-left font-semibold text-muted-foreground uppercase tracking-wide text-xs",
              "data-ocid": "admin.sort_total",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors select-none",
                  onClick: () => toggleSort("total"),
                  children: [
                    "Total ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "w-3 h-3" })
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-semibold text-muted-foreground uppercase tracking-wide text-xs", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-semibold text-muted-foreground uppercase tracking-wide text-xs", children: "Update Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, {}),
          !isLoading && paginated.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 8, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-16 gap-3 text-center",
              "data-ocid": "admin.orders.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-10 h-10 text-muted-foreground/50" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: search ? `No orders matching "${search}"` : "No orders yet" }),
                search && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "text-accent text-sm hover:underline",
                    onClick: () => {
                      setSearchRaw("");
                      setSearch("");
                    },
                    children: "Clear search"
                  }
                )
              ]
            }
          ) }) }),
          !isLoading && paginated.map((order, idx) => {
            const idStr = order.id.toString();
            const isSelected = selectedIds.has(idStr);
            const isUpdating = updatingIds.has(idStr);
            const principal = order.userId.toString();
            const rowNum = (page - 1) * PAGE_SIZE + idx + 1;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                "data-ocid": `admin.orders.item.${rowNum}`,
                className: `border-b border-border transition-colors ${isSelected ? "bg-accent/8" : idx % 2 === 0 ? "bg-card" : "bg-muted/20"} hover:bg-accent/10`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "checkbox",
                      "data-ocid": `admin.orders.checkbox.${rowNum}`,
                      className: "w-4 h-4 accent-accent cursor-pointer rounded",
                      checked: isSelected,
                      onChange: () => toggleRow(idStr)
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-mono text-xs font-medium text-foreground", children: [
                    "#",
                    idStr
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground font-mono text-xs", children: shortenPrincipal(principal) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground whitespace-nowrap", children: formatDate(order.createdAt) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-foreground", children: [
                    order.items.length,
                    " item",
                    order.items.length !== 1 ? "s" : ""
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold text-foreground", children: formatPrice(order.totalPrice) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.orderStatus }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: isUpdating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      "data-ocid": `admin.orders.loading_state.${rowNum}`,
                      className: "flex items-center gap-2 text-muted-foreground text-xs",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" }),
                        "Updating\\u2026"
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "select",
                    {
                      "data-ocid": `admin.orders.status_select.${rowNum}`,
                      className: "text-xs rounded-md border border-input bg-background px-2 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer min-w-[140px]",
                      value: order.orderStatus,
                      onChange: (e) => handleStatusChange(
                        order,
                        e.target.value
                      ),
                      children: ALL_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: getStatusLabel(s) }, s))
                    }
                  ) })
                ]
              },
              idStr
            );
          })
        ] })
      ] }) }),
      !isLoading && sorted.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Showing ",
          (page - 1) * PAGE_SIZE + 1,
          "\\u2013",
          Math.min(page * PAGE_SIZE, sorted.length),
          " of ",
          sorted.length,
          " ",
          "orders"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              "data-ocid": "admin.orders.pagination_prev",
              disabled: page === 1,
              onClick: () => setPage((p) => p - 1),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-foreground font-medium px-2", children: [
            page,
            " / ",
            totalPages
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              "data-ocid": "admin.orders.pagination_next",
              disabled: page === totalPages,
              onClick: () => setPage((p) => p + 1),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
            }
          )
        ] })
      ] })
    ] }) }),
    selectedCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "admin.bulk_action_bar",
        className: "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-card border border-border shadow-xl rounded-xl px-5 py-3 text-sm",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
            selectedCount,
            " order",
            selectedCount !== 1 ? "s" : "",
            " selected"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-5 bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              "data-ocid": "admin.bulk_status_select",
              className: "text-xs rounded-md border border-input bg-background px-2 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer min-w-[140px]",
              value: bulkStatus,
              onChange: (e) => setBulkStatus(e.target.value),
              children: ALL_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: getStatusLabel(s) }, s))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              "data-ocid": "admin.bulk_apply_button",
              className: "bg-accent text-accent-foreground hover:bg-accent/90",
              onClick: handleBulkApply,
              disabled: updateStatus.isPending,
              children: updateStatus.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 border-2 border-accent-foreground/50 border-t-transparent rounded-full animate-spin mr-1.5" }),
                "Applying\\u2026"
              ] }) : "Apply to Selected"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              "data-ocid": "admin.bulk_cancel_button",
              onClick: () => setSelectedIds(/* @__PURE__ */ new Set()),
              children: "Cancel"
            }
          )
        ]
      }
    )
  ] });
}
export {
  AdminOrders as default
};
