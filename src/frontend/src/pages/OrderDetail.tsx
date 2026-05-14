import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useCancelOrder, useOrder, useReturnOrder } from "@/hooks/useOrders";
import type { Order, OrderItem, OrderStatus } from "@/types/orders";
import {
  ORDER_STATUSES,
  canCancelOrder,
  canReturnOrder,
  formatDate,
  formatPrice,
  getStatusCssClass,
  getStatusLabel,
} from "@/types/orders";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Home,
  MapPin,
  Package,
  RotateCcw,
  Truck,
} from "lucide-react";
import { useState } from "react";

// ── Timeline ──────────────────────────────────────────────────────────────────

const TIMELINE_LABELS: Record<string, string> = {
  placed: "Order Placed",
  confirmed: "Confirmed",
  packed: "Packed",
  shipped: "Shipped",
  outForDelivery: "Out for Delivery",
  delivered: "Delivered",
};

function getStepState(
  stepKey: string,
  status: string,
): "completed" | "current" | "pending" {
  const activeIdx = ORDER_STATUSES.findIndex((s) => (s as string) === status);
  const stepIdx = ORDER_STATUSES.findIndex((s) => (s as string) === stepKey);
  if (stepIdx < activeIdx) return "completed";
  if (stepIdx === activeIdx) return "current";
  return "pending";
}

function StatusTimeline({ status }: { status: string }) {
  return (
    <div data-ocid="order_detail.timeline">
      {/* Desktop: horizontal */}
      <div className="hidden md:flex items-start">
        {ORDER_STATUSES.map((step, idx) => {
          const key = step as string;
          const state = getStepState(key, status);
          const isLast = idx === ORDER_STATUSES.length - 1;
          const nextState =
            !isLast && getStepState(ORDER_STATUSES[idx + 1] as string, status);
          const lineCompleted =
            state === "completed" ||
            nextState === "completed" ||
            nextState === "current";
          return (
            <div key={key} className="flex items-start flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={[
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-smooth z-10",
                    state === "completed"
                      ? "bg-accent border-accent text-accent-foreground shadow"
                      : state === "current"
                        ? "bg-success border-success text-white ring-4 ring-success/25 shadow-md"
                        : "bg-card border-border text-muted-foreground",
                  ].join(" ")}
                >
                  {state === "completed" ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>
                <span
                  className={[
                    "mt-2 text-[10px] text-center leading-tight max-w-[72px]",
                    state === "completed"
                      ? "text-accent font-medium"
                      : state === "current"
                        ? "text-success font-bold"
                        : "text-muted-foreground",
                  ].join(" ")}
                >
                  {TIMELINE_LABELS[key] ?? key}
                </span>
              </div>
              {!isLast && (
                <div className="flex-1 mt-4">
                  <div
                    className={[
                      "h-1 w-full rounded transition-smooth",
                      lineCompleted ? "bg-accent" : "bg-border",
                    ].join(" ")}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile: vertical */}
      <div className="flex md:hidden flex-col">
        {ORDER_STATUSES.map((step, idx) => {
          const key = step as string;
          const state = getStepState(key, status);
          const isLast = idx === ORDER_STATUSES.length - 1;
          return (
            <div key={key} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={[
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-smooth",
                    state === "completed"
                      ? "bg-accent border-accent text-accent-foreground"
                      : state === "current"
                        ? "bg-success border-success text-white ring-4 ring-success/20"
                        : "bg-card border-border text-muted-foreground",
                  ].join(" ")}
                >
                  {state === "completed" ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>
                {!isLast && (
                  <div
                    className={[
                      "w-0.5 h-7 mt-1",
                      state === "completed" ? "bg-accent" : "bg-border",
                    ].join(" ")}
                  />
                )}
              </div>
              <div className="pb-5 pt-0.5">
                <span
                  className={[
                    "text-sm",
                    state === "completed"
                      ? "text-accent font-medium"
                      : state === "current"
                        ? "text-success font-bold"
                        : "text-muted-foreground",
                  ].join(" ")}
                >
                  {TIMELINE_LABELS[key] ?? key}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Order Item Row ─────────────────────────────────────────────────────────────

function OrderItemRow({ item, idx }: { item: OrderItem; idx: number }) {
  const lineTotal = item.price * Number(item.quantity);
  return (
    <div
      data-ocid={`order_detail.item.${idx + 1}`}
      className="flex items-center gap-4 py-3 border-b border-border last:border-0"
    >
      <div className="w-16 h-16 rounded-md overflow-hidden border border-border bg-muted flex-shrink-0">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-6 h-6 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground line-clamp-2 text-sm">
          {item.title}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Qty: {item.quantity.toString()} × {formatPrice(item.price)}
        </p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="font-semibold text-foreground">
          {formatPrice(lineTotal)}
        </p>
      </div>
    </div>
  );
}

// ── Cancel Dialog ──────────────────────────────────────────────────────────────

function CancelDialog({
  open,
  onOpenChange,
  orderId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  orderId: bigint;
}) {
  const cancel = useCancelOrder();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-ocid="order_detail.cancel_order.dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Cancel Order
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this order? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-ocid="order_detail.cancel_order.cancel_button"
          >
            Keep Order
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() =>
              cancel.mutate(orderId, { onSuccess: () => onOpenChange(false) })
            }
            disabled={cancel.isPending}
            data-ocid="order_detail.cancel_order.confirm_button"
          >
            {cancel.isPending ? "Cancelling…" : "Yes, Cancel Order"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Return Dialog ──────────────────────────────────────────────────────────────

const RETURN_REASONS = [
  "Defective product",
  "Changed my mind",
  "Wrong item received",
  "Other",
];

function ReturnDialog({
  open,
  onOpenChange,
  orderId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  orderId: bigint;
}) {
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const returnOrder = useReturnOrder();

  const handleSubmit = () => {
    if (!reason) return;
    returnOrder.mutate(orderId, {
      onSuccess: () => {
        onOpenChange(false);
        setReason("");
        setNotes("");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-ocid="order_detail.return_order.dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-accent" />
            Return / Replace
          </DialogTitle>
          <DialogDescription>
            Tell us why you&apos;d like to return or replace this order.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="return-reason">Reason</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger
                id="return-reason"
                data-ocid="order_detail.return_order.select"
              >
                <SelectValue placeholder="Select a reason…" />
              </SelectTrigger>
              <SelectContent>
                {RETURN_REASONS.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="return-notes">Additional notes (optional)</Label>
            <Textarea
              id="return-notes"
              placeholder="Describe the issue in more detail…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              data-ocid="order_detail.return_order.textarea"
            />
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-ocid="order_detail.return_order.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!reason || returnOrder.isPending}
            data-ocid="order_detail.return_order.submit_button"
          >
            {returnOrder.isPending ? "Submitting…" : "Submit Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Payment label helper ───────────────────────────────────────────────────────

function getPaymentLabel(method: Order["paymentMethod"]): string {
  if (method.__kind__ === "COD") return "Cash on Delivery";
  if (method.__kind__ === "UPI")
    return `UPI — ${(method as { __kind__: "UPI"; UPI: string }).UPI}`;
  if (method.__kind__ === "Card")
    return `Card — ${(method as { __kind__: "Card"; Card: string }).Card}`;
  return "Unknown";
}

// ── Skeleton ───────────────────────────────────────────────────────────────────

function OrderDetailSkeleton() {
  return (
    <div data-ocid="order_detail.loading_state" className="space-y-5">
      <Skeleton className="h-4 w-52" />
      <Skeleton className="h-24 w-full rounded-xl" />
      <Skeleton className="h-12 w-full rounded-xl" />
      <Skeleton className="h-36 w-full rounded-xl" />
      <Skeleton className="h-48 w-full rounded-xl" />
      <div className="grid md:grid-cols-2 gap-4">
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-32 rounded-xl" />
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function OrderDetail() {
  const { id } = useParams({ from: "/order/$id" });
  const orderId = BigInt(id);
  const navigate = useNavigate();
  const { data: order, isLoading, isError } = useOrder(orderId);

  const [cancelOpen, setCancelOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <OrderDetailSkeleton />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div
        data-ocid="order_detail.error_state"
        className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4"
      >
        <Package className="w-12 h-12 text-muted-foreground mx-auto" />
        <h2 className="text-xl font-semibold text-foreground">
          Order not found
        </h2>
        <p className="text-muted-foreground text-sm">
          We couldn&apos;t find this order. It may not exist or you may not have
          access.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate({ to: "/orders" })}
          data-ocid="order_detail.back_button"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to My Orders
        </Button>
      </div>
    );
  }

  const statusStr = order.orderStatus as string;
  const isCancelledOrReturned =
    statusStr === "cancelled" || statusStr === "returned";

  return (
    <div
      data-ocid="order_detail.page"
      className="max-w-3xl mx-auto px-4 py-6 space-y-5"
    >
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1 text-xs text-muted-foreground"
      >
        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          className="hover:text-foreground transition-colors flex items-center gap-1"
        >
          <Home className="w-3 h-3" /> Home
        </button>
        <ChevronRight className="w-3 h-3" />
        <Link
          to="/orders"
          className="hover:text-foreground transition-colors"
          data-ocid="order_detail.my_orders_link"
        >
          My Orders
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-medium truncate">
          Order #{order.id.toString()}
        </span>
      </nav>

      {/* Back button */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => navigate({ to: "/orders" })}
        data-ocid="order_detail.back_button"
        className="-ml-2"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        My Orders
      </Button>

      {/* Order header */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-subtle">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold text-foreground">
              Order #{order.id.toString()}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Placed on {formatDate(order.createdAt)}
            </p>
            {order.trackingNumber && (
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <Truck className="w-3 h-3" />
                Tracking:{" "}
                <span className="font-mono font-medium text-foreground">
                  {order.trackingNumber}
                </span>
              </p>
            )}
          </div>
          <Badge
            className={`status-badge ${getStatusCssClass(order.orderStatus as OrderStatus)}`}
            data-ocid="order_detail.status_badge"
          >
            {getStatusLabel(order.orderStatus as OrderStatus)}
          </Badge>
        </div>
      </div>

      {/* Estimated Delivery Banner */}
      {order.estimatedDeliveryDate && (
        <div
          data-ocid="order_detail.delivery_banner"
          className={[
            "rounded-xl p-4 flex items-center gap-3 border",
            statusStr === "delivered"
              ? "bg-muted/60 border-border"
              : "bg-success/10 border-success/40",
          ].join(" ")}
        >
          <Truck
            className={[
              "w-5 h-5 flex-shrink-0",
              statusStr === "delivered"
                ? "text-muted-foreground"
                : "text-success",
            ].join(" ")}
          />
          <p className="text-sm font-medium">
            <span
              className={
                statusStr === "delivered"
                  ? "text-muted-foreground"
                  : "text-success"
              }
            >
              {statusStr === "delivered"
                ? "Delivered on"
                : "Expected delivery:"}{" "}
            </span>
            <span className="font-bold text-foreground">
              {formatDate(order.estimatedDeliveryDate)}
            </span>
          </p>
        </div>
      )}

      {/* Cancelled / Returned notice */}
      {isCancelledOrReturned && (
        <div
          data-ocid="order_detail.cancelled_notice"
          className="rounded-xl p-4 bg-destructive/10 border border-destructive/30 flex items-center gap-3"
        >
          <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
          <p className="text-sm font-medium text-destructive">
            This order has been{" "}
            {statusStr === "cancelled" ? "cancelled" : "returned / replaced"}.
          </p>
        </div>
      )}

      {/* Status Timeline */}
      {!isCancelledOrReturned && (
        <div className="bg-card border border-border rounded-xl p-5 shadow-subtle">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-5">
            Order Progress
          </h2>
          <StatusTimeline status={statusStr} />
        </div>
      )}

      {/* Items */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-subtle">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Items Ordered ({order.items.length})
        </h2>
        {order.items.map((item, idx) => (
          <OrderItemRow key={item.productId.toString()} item={item} idx={idx} />
        ))}
        <div className="mt-4 pt-3 border-t border-border space-y-1.5">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Delivery</span>
            <span>
              {order.deliveryCharge === 0 ? (
                <span className="text-success font-medium">FREE</span>
              ) : (
                formatPrice(order.deliveryCharge)
              )}
            </span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Tax (GST 18%)</span>
            <span>{formatPrice(order.taxAmount)}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-foreground pt-1.5 border-t border-border">
            <span>Total</span>
            <span>{formatPrice(order.totalPrice)}</span>
          </div>
        </div>
      </div>

      {/* Delivery + Payment */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Delivery Address */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-subtle">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> Delivery Address
          </h2>
          <div className="text-sm space-y-0.5">
            <p className="font-semibold text-foreground">
              {order.shippingAddress.name}
            </p>
            <p className="text-muted-foreground">
              {order.shippingAddress.addressLine1}
            </p>
            {order.shippingAddress.addressLine2 && (
              <p className="text-muted-foreground">
                {order.shippingAddress.addressLine2}
              </p>
            )}
            <p className="text-muted-foreground">
              {order.shippingAddress.city}, {order.shippingAddress.state} —{" "}
              {order.shippingAddress.pinCode}
            </p>
            <p className="text-muted-foreground mt-1">
              📞 {order.shippingAddress.phone}
            </p>
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-subtle">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Payment Info
          </h2>
          <div className="text-sm space-y-2">
            <div className="flex items-start justify-between gap-2">
              <span className="text-muted-foreground flex-shrink-0">
                Method
              </span>
              <span className="font-medium text-foreground text-right">
                {getPaymentLabel(order.paymentMethod)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Status</span>
              <span
                data-ocid="order_detail.payment_status_badge"
                className={[
                  "inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold",
                  (order.paymentStatus as string) === "Paid"
                    ? "bg-success/10 text-success"
                    : (order.paymentStatus as string) === "Pending"
                      ? "bg-warning/10 text-warning"
                      : "bg-destructive/10 text-destructive",
                ].join(" ")}
              >
                {order.paymentStatus as string}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {(canCancelOrder(order.orderStatus as OrderStatus) ||
        canReturnOrder(order)) && (
        <div className="flex flex-wrap gap-3">
          {canCancelOrder(order.orderStatus as OrderStatus) && (
            <Button
              type="button"
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive/10"
              onClick={() => setCancelOpen(true)}
              data-ocid="order_detail.cancel_order_button"
            >
              Cancel Order
            </Button>
          )}
          {canReturnOrder(order) && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setReturnOpen(true)}
              data-ocid="order_detail.return_order_button"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Return / Replace
            </Button>
          )}
        </div>
      )}

      {/* Dialogs */}
      <CancelDialog
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        orderId={order.id}
      />
      <ReturnDialog
        open={returnOpen}
        onOpenChange={setReturnOpen}
        orderId={order.id}
      />
    </div>
  );
}
