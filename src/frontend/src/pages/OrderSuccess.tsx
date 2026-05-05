import { createActor } from "@/backend";
import type { Order } from "@/backend";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import { CheckCircle2, Package, ShoppingBag } from "lucide-react";

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function OrderSuccess() {
  const search = useSearch({ from: "/order-success" }) as { orderId?: string };
  const orderId = search.orderId ? BigInt(search.orderId) : undefined;

  const { actor, isFetching } = useActor(createActor);

  const { data: order, isLoading } = useQuery<Order | null>({
    queryKey: ["order", String(orderId)],
    queryFn: async () => {
      if (!actor || orderId === undefined) return null;
      return actor.getOrder(orderId);
    },
    enabled: !!actor && !isFetching && orderId !== undefined,
  });

  return (
    <div
      className="max-w-2xl mx-auto px-4 py-16 text-center"
      data-ocid="order-success.page"
    >
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-accent" />
        </div>
      </div>

      <h1 className="text-3xl font-display font-bold text-foreground mb-2">
        Order Placed!
      </h1>
      <p className="text-muted-foreground mb-2">
        Thank you for shopping with ShopCatalog.
      </p>
      {orderId !== undefined && (
        <p className="text-sm text-muted-foreground mb-8">
          Order ID:{" "}
          <span className="font-mono font-semibold text-foreground">
            #{String(orderId)}
          </span>
        </p>
      )}

      {isLoading && (
        <div
          className="bg-card border border-border rounded-lg p-6 text-left mb-8"
          data-ocid="order-success.loading_state"
        >
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded w-1/3" />
            <div className="h-4 bg-muted rounded w-2/3" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
        </div>
      )}

      {order && (
        <div
          className="bg-card border border-border rounded-lg p-6 text-left mb-8"
          data-ocid="order-success.order_card"
        >
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-accent" />
            <h2 className="font-semibold text-foreground">Order Details</h2>
          </div>
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div
                key={`${item.title}-${idx}`}
                className="flex items-center gap-3"
                data-ocid={`order-success.item.${idx + 1}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 rounded object-cover bg-muted/30"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground line-clamp-1">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Qty: {String(item.quantity)}
                  </p>
                </div>
                <span className="text-sm font-semibold">
                  {formatINR(item.price * Number(item.quantity))}
                </span>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-1 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatINR(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>GST (18%)</span>
              <span>{formatINR(order.taxAmount)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Delivery</span>
              <span>
                {order.deliveryCharge === 0
                  ? "FREE"
                  : formatINR(order.deliveryCharge)}
              </span>
            </div>
            <div className="flex justify-between font-bold text-base text-foreground pt-1">
              <span>Total Paid</span>
              <span>{formatINR(order.totalPrice)}</span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Delivering to</p>
              <p className="font-medium text-foreground mt-0.5">
                {order.shippingAddress.name}
              </p>
              <p className="text-muted-foreground text-xs mt-0.5">
                {order.shippingAddress.city}, {order.shippingAddress.state} –{" "}
                {order.shippingAddress.pinCode}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Payment</p>
              <p className="font-medium text-foreground mt-0.5">
                {order.paymentMethod.__kind__ === "COD" && "Cash on Delivery"}
                {order.paymentMethod.__kind__ === "UPI" &&
                  `UPI – ${order.paymentMethod.UPI}`}
                {order.paymentMethod.__kind__ === "Card" && "Card (Stripe)"}
              </p>
              <p className="text-muted-foreground text-xs mt-0.5">
                Ordered on {formatDate(order.createdAt)}
              </p>
            </div>
          </div>
        </div>
      )}

      <div
        className="flex flex-col sm:flex-row gap-3 justify-center"
        data-ocid="order-success.actions"
      >
        <Button
          asChild
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
          data-ocid="order-success.continue_shopping_button"
        >
          <Link to="/products">
            <ShoppingBag className="w-4 h-4 mr-2" /> Continue Shopping
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          data-ocid="order-success.view_orders_button"
        >
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
