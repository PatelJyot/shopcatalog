import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

const GST_RATE = 0.18;
const FREE_DELIVERY_THRESHOLD = 499;
const DELIVERY_CHARGE = 50;

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } =
    useCart();
  const navigate = useNavigate();

  const subtotal = totalPrice;
  const gst = Math.round(subtotal * GST_RATE);
  const deliveryCharge =
    subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const total = subtotal + gst + deliveryCharge;

  if (items.length === 0) {
    return (
      <div
        className="max-w-4xl mx-auto px-4 py-16 text-center"
        data-ocid="cart.empty_state"
      >
        <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground mb-6">
          Looks like you haven't added anything yet.
        </p>
        <Button
          asChild
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
          data-ocid="cart.shop_now_button"
        >
          <Link to="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8" data-ocid="cart.page">
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => void navigate({ to: "/products" })}
          className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          aria-label="Back to products"
          data-ocid="cart.back_button"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Shopping Cart ({totalItems} item{totalItems !== 1 ? "s" : ""})
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, idx) => (
            <div
              key={item.product.id}
              className="bg-card border border-border rounded-lg p-4 flex gap-4"
              data-ocid={`cart.item.${idx + 1}`}
            >
              <img
                src={item.product.images[0] ?? "/assets/images/placeholder.svg"}
                alt={item.product.title}
                className="w-24 h-24 object-cover rounded-md bg-muted/30"
              />
              <div className="flex-1 min-w-0">
                <Link
                  to="/product/$id"
                  params={{ id: item.product.id }}
                  className="font-medium text-foreground hover:text-accent transition-colors duration-200 line-clamp-2"
                >
                  {item.product.title}
                </Link>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.product.brand} · {item.product.sellerName}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border border-border rounded">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors duration-200"
                      aria-label="Decrease quantity"
                      data-ocid={`cart.decrease_button.${idx + 1}`}
                    >
                      -
                    </button>
                    <span
                      className="w-8 text-center text-sm font-medium"
                      data-ocid={`cart.quantity.${idx + 1}`}
                    >
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors duration-200"
                      aria-label="Increase quantity"
                      data-ocid={`cart.increase_button.${idx + 1}`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      removeFromCart(item.product.id);
                      toast.success("Item removed from cart");
                    }}
                    className="text-sm text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors duration-200"
                    data-ocid={`cart.delete_button.${idx + 1}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-accent text-base">
                  {formatINR(
                    (item.product.salePrice ?? item.product.price) *
                      item.quantity,
                  )}
                </span>
                {item.quantity > 1 && (
                  <p className="text-xs text-muted-foreground">
                    {formatINR(item.product.salePrice ?? item.product.price)}{" "}
                    each
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-card border border-border rounded-lg p-6 h-fit sticky top-20">
          <h2 className="font-display font-bold text-lg text-foreground mb-4">
            Order Summary
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal ({totalItems} items)</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>GST (18%)</span>
              <span>{formatINR(gst)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Delivery</span>
              <span
                className={
                  deliveryCharge === 0
                    ? "text-[color:var(--accent)] font-medium"
                    : "text-muted-foreground"
                }
              >
                {deliveryCharge === 0 ? "FREE" : formatINR(deliveryCharge)}
              </span>
            </div>
            {deliveryCharge > 0 && (
              <p className="text-xs text-muted-foreground">
                Add {formatINR(FREE_DELIVERY_THRESHOLD - subtotal)} more for
                free delivery
              </p>
            )}
            <Separator className="my-2" />
            <div className="flex justify-between font-bold text-base text-foreground">
              <span>Total</span>
              <span>{formatINR(total)}</span>
            </div>
          </div>
          <Button
            type="button"
            asChild
            className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
            data-ocid="cart.checkout_button"
          >
            <Link to="/checkout">Proceed to Checkout</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full mt-2"
            data-ocid="cart.continue_shopping_button"
          >
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
