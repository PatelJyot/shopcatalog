import type { Order, OrderStatus } from "@/backend";

export type {
  Order,
  OrderItem,
  OrderNotification,
  PaginatedOrders,
  OrderStatus,
} from "@/backend";

export const ORDER_STATUSES: OrderStatus[] = [
  "placed" as OrderStatus,
  "confirmed" as OrderStatus,
  "packed" as OrderStatus,
  "shipped" as OrderStatus,
  "outForDelivery" as OrderStatus,
  "delivered" as OrderStatus,
];

export function getStatusLabel(status: OrderStatus): string {
  const labels: Record<string, string> = {
    placed: "Order Placed",
    confirmed: "Confirmed",
    packed: "Packed",
    shipped: "Shipped",
    outForDelivery: "Out for Delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
    returned: "Returned",
  };
  return labels[status as string] ?? status;
}

export function getStatusCssClass(status: OrderStatus): string {
  const classes: Record<string, string> = {
    placed: "status-placed",
    confirmed: "status-confirmed",
    packed: "status-packed",
    shipped: "status-shipped",
    outForDelivery: "status-out-for-delivery",
    delivered: "status-delivered",
    cancelled: "status-cancelled",
    returned: "status-returned",
  };
  return classes[status as string] ?? "status-placed";
}

export function isActiveOrder(status: OrderStatus): boolean {
  return (
    ["placed", "confirmed", "packed", "shipped", "outForDelivery"] as string[]
  ).includes(status as string);
}

export function isCompletedOrder(status: OrderStatus): boolean {
  return (status as string) === "delivered";
}

export function isCancelledOrder(status: OrderStatus): boolean {
  return (["cancelled", "returned"] as string[]).includes(status as string);
}

export function canCancelOrder(status: OrderStatus): boolean {
  return (["placed", "confirmed"] as string[]).includes(status as string);
}

export function canReturnOrder(order: Order): boolean {
  if ((order.orderStatus as string) !== "delivered") return false;
  const sevenDaysMs = BigInt(7 * 24 * 60 * 60 * 1_000_000_000);
  const now = BigInt(Date.now()) * BigInt(1_000_000);
  return now - order.updatedAt <= sevenDaysMs;
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp / BigInt(1_000_000));
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(ms));
}
