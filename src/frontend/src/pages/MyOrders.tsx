import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrders } from "@/hooks/useOrders";
import {
  formatDate,
  formatPrice,
  getStatusCssClass,
  getStatusLabel,
  isActiveOrder,
  isCancelledOrder,
  isCompletedOrder,
} from "@/types/orders";
import type { Order, OrderStatus } from "@/types/orders";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ChevronRight,
  Package,
  PackageSearch,
} from "lucide-react";
import { useState } from "react";

type FilterTab = "all" | "active" | "completed" | "cancelled";

const TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All Orders" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

function filterOrders(orders: Order[], tab: FilterTab): Order[] {
  const sorted = [...orders].sort((a, b) =>
    b.createdAt > a.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0,
  );
  if (tab === "active")
    return sorted.filter((o) => isActiveOrder(o.orderStatus as OrderStatus));
  if (tab === "completed")
    return sorted.filter((o) => isCompletedOrder(o.orderStatus as OrderStatus));
  if (tab === "cancelled")
    return sorted.filter((o) => isCancelledOrder(o.orderStatus as OrderStatus));
  return sorted;
}

function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const cssClass = getStatusCssClass(status);
  return (
    <span className={`status-badge ${cssClass}`}>{getStatusLabel(status)}</span>
  );
}

function OrderRowSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg p-4 flex gap-4">
      <Skeleton className="w-16 h-16 rounded-md flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );
}

function OrderRow({ order, index }: { order: Order; index: number }) {
  const itemCount = order.items.length;
  const firstImage = order.items[0]?.image;
  const shortId = order.id.toString().slice(-8);

  return (
    <div
      className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
      data-ocid={`orders.item.${index}`}
    >
      {/* Order header bar */}
      <div className="bg-muted/40 border-b border-border px-4 py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="uppercase tracking-wide font-semibold">
            Order Placed
          </span>
          <span>{formatDate(order.createdAt)}</span>
          <span className="hidden sm:block">|</span>
          <span className="hidden sm:block font-semibold text-foreground">
            {formatPrice(order.totalPrice)}
          </span>
        </div>
        <div className="text-xs text-muted-foreground">
          Order{" "}
          <span className="font-mono font-semibold text-foreground">
            #{shortId}
          </span>
        </div>
      </div>

      {/* Order body */}
      <div className="p-4 flex flex-col sm:flex-row gap-4">
        {/* Thumbnail */}
        <div className="flex-shrink-0">
          {firstImage ? (
            <img
              src={firstImage}
              alt="order item"
              className="w-16 h-16 object-cover rounded-md border border-border"
            />
          ) : (
            <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
              <Package className="w-6 h-6 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <OrderStatusBadge status={order.orderStatus as OrderStatus} />
          </div>
          <p className="text-sm text-foreground font-medium truncate">
            {order.items[0]?.title ?? "Order items"}
            {itemCount > 1 && (
              <span className="text-muted-foreground font-normal">
                {" "}
                +{itemCount - 1} more item{itemCount - 1 !== 1 ? "s" : ""}
              </span>
            )}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {itemCount} item{itemCount !== 1 ? "s" : ""}
            <span className="sm:hidden">
              {" "}
              · {formatPrice(order.totalPrice)}
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-row sm:flex-col gap-2 items-center sm:items-end justify-end flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="text-accent border-accent/30 hover:bg-accent/5 hover:border-accent/60"
            data-ocid={`orders.view_details_button.${index}`}
          >
            <Link to="/order/$id" params={{ id: order.id.toString() }}>
              View Details
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-muted-foreground hover:text-foreground"
            data-ocid={`orders.track_button.${index}`}
          >
            <Link to="/order/$id" params={{ id: order.id.toString() }}>
              Track Order
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function MyOrders() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const { data: orders, isLoading, isError } = useOrders();
  const filtered = filterOrders(orders ?? [], activeTab);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6" data-ocid="orders.page">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5">
        <Link to="/" className="hover:text-accent transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-medium">My Orders</span>
      </nav>

      <h1 className="text-2xl font-bold text-foreground mb-6">My Orders</h1>

      {/* Filter tabs */}
      <div
        className="flex gap-0 mb-6 border-b border-border overflow-x-auto"
        data-ocid="orders.filter.tab"
      >
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            data-ocid={`orders.tab.${tab.key}`}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors relative ${
              activeTab === tab.key
                ? "text-accent border-b-2 border-accent -mb-px"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            {tab.key !== "all" &&
              orders &&
              (() => {
                const count = filterOrders(orders, tab.key).length;
                return count > 0 ? (
                  <span className="ml-1.5 text-xs bg-muted text-muted-foreground rounded-full px-1.5 py-0.5">
                    {count}
                  </span>
                ) : null;
              })()}
          </button>
        ))}
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="space-y-3" data-ocid="orders.loading_state">
          {[1, 2, 3].map((i) => (
            <OrderRowSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div
          className="flex flex-col items-center justify-center py-12 text-center"
          data-ocid="orders.error_state"
        >
          <AlertCircle className="w-12 h-12 text-destructive mb-3" />
          <h2 className="text-base font-semibold text-foreground mb-1">
            Failed to load orders
          </h2>
          <p className="text-sm text-muted-foreground">
            Please refresh the page and try again.
          </p>
        </div>
      )}

      {/* Orders list */}
      {!isLoading && !isError && filtered.length > 0 && (
        <div className="space-y-3" data-ocid="orders.list">
          {filtered.map((order, idx) => (
            <OrderRow key={order.id.toString()} order={order} index={idx + 1} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && filtered.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-16 text-center"
          data-ocid="orders.empty_state"
        >
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
            <PackageSearch className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            {activeTab === "all" ? "No orders yet" : `No ${activeTab} orders`}
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-xs">
            {activeTab === "all"
              ? "When you place an order, it will appear here."
              : `You have no ${activeTab} orders at this time.`}
          </p>
          {activeTab === "all" && (
            <Button
              asChild
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Link to="/products" data-ocid="orders.shop_now_button">
                Start Shopping
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
