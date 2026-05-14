import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllOrders, useUpdateOrderStatus } from "@/hooks/useOrders";
import type { Order, OrderStatus } from "@/types/orders";
import {
  ORDER_STATUSES,
  formatDate,
  formatPrice,
  getStatusCssClass,
  getStatusLabel,
} from "@/types/orders";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  AlertCircle,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  LogIn,
  Package,
  Search,
} from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";

const PAGE_SIZE = 50;

type SortField = "date" | "total";
type SortDir = "asc" | "desc";

const ALL_STATUSES: OrderStatus[] = [
  ...ORDER_STATUSES,
  "cancelled" as OrderStatus,
  "returned" as OrderStatus,
];

function StatusBadge({ status }: { status: OrderStatus }) {
  const css = getStatusCssClass(status);
  const colorMap: Record<string, string> = {
    "status-placed": "bg-muted text-foreground border border-border",
    "status-confirmed": "bg-accent/15 text-accent border border-accent/30",
    "status-packed": "bg-accent/15 text-accent border border-accent/30",
    "status-shipped": "bg-accent/15 text-accent border border-accent/30",
    "status-out-for-delivery":
      "bg-warning/15 text-warning-foreground border border-warning/30",
    "status-delivered": "bg-success/15 text-success border border-success/30",
    "status-cancelled":
      "bg-destructive/15 text-destructive border border-destructive/30",
    "status-returned": "bg-muted text-muted-foreground border border-border",
  };
  return (
    <Badge
      className={`text-xs font-medium px-2 py-0.5 ${colorMap[css] ?? colorMap["status-placed"]} rounded-full`}
    >
      {getStatusLabel(status)}
    </Badge>
  );
}

function TableSkeleton() {
  return (
    <>
      {["a", "b", "c", "d", "e", "f", "g", "h"].map((r) => (
        <tr key={`sk-r-${r}`} className="border-b border-border">
          {["1", "2", "3", "4", "5", "6", "7", "8"].map((c) => (
            <td key={`sk-c-${c}`} className="px-4 py-3">
              <Skeleton className="h-4 w-full" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export default function AdminOrders() {
  const { isAuthenticated, login } = useInternetIdentity();

  const { data, isLoading } = useAllOrders(BigInt(0), BigInt(1000));
  const updateStatus = useUpdateOrderStatus();

  const [searchRaw, setSearchRaw] = useState("");
  const [search, setSearch] = useState("");
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkStatus, setBulkStatus] = useState<OrderStatus>(ALL_STATUSES[0]);
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set());

  const handleSearchChange = useCallback((val: string) => {
    setSearchRaw(val);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setSearch(val.trim().toLowerCase());
      setPage(1);
    }, 300);
  }, []);

  const allOrders: Order[] = useMemo(() => data?.orders ?? [], [data]);

  const filtered = useMemo(() => {
    if (!search) return allOrders;
    return allOrders.filter((o) => {
      const idStr = o.id.toString();
      const principal = o.userId.toString() ?? "";
      return idStr.includes(search) || principal.toLowerCase().includes(search);
    });
  }, [allOrders, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortField === "date") {
        const diff = Number(a.createdAt - b.createdAt);
        return sortDir === "asc" ? diff : -diff;
      }
      const diff = a.totalPrice - b.totalPrice;
      return sortDir === "asc" ? diff : -diff;
    });
  }, [filtered, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
    setPage(1);
  };

  const allPageSelected =
    paginated.length > 0 &&
    paginated.every((o) => selectedIds.has(o.id.toString()));

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

  const toggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleStatusChange = async (order: Order, status: OrderStatus) => {
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
    const ordersToUpdate = allOrders.filter((o) =>
      ids.includes(o.id.toString()),
    );
    setUpdatingIds(new Set(ids));
    await Promise.all(
      ordersToUpdate.map((o) =>
        updateStatus.mutateAsync({ orderId: o.id, status: bulkStatus }),
      ),
    );
    setUpdatingIds(new Set());
    setSelectedIds(new Set());
  };

  const shortenPrincipal = (p: string) => {
    if (p.length <= 14) return p;
    return `${p.slice(0, 6)}\u2026${p.slice(-5)}`;
  };

  if (!isAuthenticated) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center"
        data-ocid="admin.access_denied"
      >
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Access Denied</h2>
        <p className="text-muted-foreground max-w-xs">
          You must be logged in as an admin to view this page.
        </p>
        <Button onClick={() => login()} data-ocid="admin.login_button">
          <LogIn className="w-4 h-4 mr-2" /> Sign In
        </Button>
      </div>
    );
  }

  const selectedCount = selectedIds.size;
  const totalOrders = data?.total ?? BigInt(0);

  return (
    <div className="min-h-screen bg-background" data-ocid="admin.orders_page">
      {/* Page Header */}
      <div className="bg-card border-b border-border px-6 py-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Package className="w-6 h-6 text-accent" />
                Order Management
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {isLoading
                  ? "Loading orders\u2026"
                  : `${Number(totalOrders).toLocaleString()} total orders`}
              </p>
            </div>
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                data-ocid="admin.search_input"
                className="pl-9 bg-background"
                placeholder="Search by Order ID or customer\u2026"
                value={searchRaw}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Table */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/60 border-b border-border">
                  <th className="px-4 py-3 text-left w-10">
                    <input
                      type="checkbox"
                      data-ocid="admin.select_all_checkbox"
                      className="w-4 h-4 accent-accent cursor-pointer rounded"
                      checked={allPageSelected}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground uppercase tracking-wide text-xs">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground uppercase tracking-wide text-xs">
                    Customer
                  </th>
                  <th
                    className="px-4 py-3 text-left font-semibold text-muted-foreground uppercase tracking-wide text-xs"
                    data-ocid="admin.sort_date"
                  >
                    <button
                      type="button"
                      className="flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors select-none"
                      onClick={() => toggleSort("date")}
                    >
                      Date <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground uppercase tracking-wide text-xs">
                    Items
                  </th>
                  <th
                    className="px-4 py-3 text-left font-semibold text-muted-foreground uppercase tracking-wide text-xs"
                    data-ocid="admin.sort_total"
                  >
                    <button
                      type="button"
                      className="flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors select-none"
                      onClick={() => toggleSort("total")}
                    >
                      Total <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground uppercase tracking-wide text-xs">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground uppercase tracking-wide text-xs">
                    Update Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading && <TableSkeleton />}

                {!isLoading && paginated.length === 0 && (
                  <tr>
                    <td colSpan={8}>
                      <div
                        className="flex flex-col items-center justify-center py-16 gap-3 text-center"
                        data-ocid="admin.orders.empty_state"
                      >
                        <Package className="w-10 h-10 text-muted-foreground/50" />
                        <p className="text-muted-foreground font-medium">
                          {search
                            ? `No orders matching "${search}"`
                            : "No orders yet"}
                        </p>
                        {search && (
                          <button
                            type="button"
                            className="text-accent text-sm hover:underline"
                            onClick={() => {
                              setSearchRaw("");
                              setSearch("");
                            }}
                          >
                            Clear search
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}

                {!isLoading &&
                  paginated.map((order, idx) => {
                    const idStr = order.id.toString();
                    const isSelected = selectedIds.has(idStr);
                    const isUpdating = updatingIds.has(idStr);
                    const principal = order.userId.toString();
                    const rowNum = (page - 1) * PAGE_SIZE + idx + 1;

                    return (
                      <tr
                        key={idStr}
                        data-ocid={`admin.orders.item.${rowNum}`}
                        className={`border-b border-border transition-colors ${
                          isSelected
                            ? "bg-accent/8"
                            : idx % 2 === 0
                              ? "bg-card"
                              : "bg-muted/20"
                        } hover:bg-accent/10`}
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            data-ocid={`admin.orders.checkbox.${rowNum}`}
                            className="w-4 h-4 accent-accent cursor-pointer rounded"
                            checked={isSelected}
                            onChange={() => toggleRow(idStr)}
                          />
                        </td>
                        <td className="px-4 py-3 font-mono text-xs font-medium text-foreground">
                          #{idStr}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                          {shortenPrincipal(principal)}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="px-4 py-3 text-foreground">
                          {order.items.length} item
                          {order.items.length !== 1 ? "s" : ""}
                        </td>
                        <td className="px-4 py-3 font-semibold text-foreground">
                          {formatPrice(order.totalPrice)}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={order.orderStatus} />
                        </td>
                        <td className="px-4 py-3">
                          {isUpdating ? (
                            <div
                              data-ocid={`admin.orders.loading_state.${rowNum}`}
                              className="flex items-center gap-2 text-muted-foreground text-xs"
                            >
                              <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                              Updating\u2026
                            </div>
                          ) : (
                            <select
                              data-ocid={`admin.orders.status_select.${rowNum}`}
                              className="text-xs rounded-md border border-input bg-background px-2 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer min-w-[140px]"
                              value={order.orderStatus as string}
                              onChange={(e) =>
                                handleStatusChange(
                                  order,
                                  e.target.value as OrderStatus,
                                )
                              }
                            >
                              {ALL_STATUSES.map((s) => (
                                <option key={s as string} value={s as string}>
                                  {getStatusLabel(s)}
                                </option>
                              ))}
                            </select>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!isLoading && sorted.length > 0 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30">
              <p className="text-sm text-muted-foreground">
                Showing {(page - 1) * PAGE_SIZE + 1}\u2013
                {Math.min(page * PAGE_SIZE, sorted.length)} of {sorted.length}{" "}
                orders
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  data-ocid="admin.orders.pagination_prev"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-foreground font-medium px-2">
                  {page} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  data-ocid="admin.orders.pagination_next"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bulk Action Bar */}
      {selectedCount > 0 && (
        <div
          data-ocid="admin.bulk_action_bar"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-card border border-border shadow-xl rounded-xl px-5 py-3 text-sm"
        >
          <span className="font-semibold text-foreground">
            {selectedCount} order{selectedCount !== 1 ? "s" : ""} selected
          </span>
          <div className="w-px h-5 bg-border" />
          <select
            data-ocid="admin.bulk_status_select"
            className="text-xs rounded-md border border-input bg-background px-2 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer min-w-[140px]"
            value={bulkStatus as string}
            onChange={(e) => setBulkStatus(e.target.value as OrderStatus)}
          >
            {ALL_STATUSES.map((s) => (
              <option key={s as string} value={s as string}>
                {getStatusLabel(s)}
              </option>
            ))}
          </select>
          <Button
            size="sm"
            data-ocid="admin.bulk_apply_button"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={handleBulkApply}
            disabled={updateStatus.isPending}
          >
            {updateStatus.isPending ? (
              <>
                <div className="w-3 h-3 border-2 border-accent-foreground/50 border-t-transparent rounded-full animate-spin mr-1.5" />
                Applying\u2026
              </>
            ) : (
              "Apply to Selected"
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            data-ocid="admin.bulk_cancel_button"
            onClick={() => setSelectedIds(new Set())}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
