import { createActor } from "@/backend";
import type { AddressSnapshot, PaymentMethod } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import type { AddressFormData, PaymentFormData } from "@/types/checkout";
import { CheckoutStep } from "@/types/checkout";
import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronLeft,
  CreditCard,
  MapPin,
  PackageCheck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
];

const GST_RATE = 0.18;
const FREE_DELIVERY_THRESHOLD = 499;
const DELIVERY_CHARGE = 50;

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

const STEPS = [
  { step: CheckoutStep.Address, label: "Delivery Address", icon: MapPin },
  { step: CheckoutStep.Payment, label: "Payment", icon: CreditCard },
  {
    step: CheckoutStep.Review,
    label: "Review & Place Order",
    icon: PackageCheck,
  },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { actor } = useActor(createActor);

  const [currentStep, setCurrentStep] = useState<CheckoutStep>(
    CheckoutStep.Address,
  );
  const [isPlacing, setIsPlacing] = useState(false);

  const subtotal = totalPrice;
  const deliveryCharge =
    subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const gst = Math.round(subtotal * GST_RATE);
  const total = subtotal + gst + deliveryCharge;

  const [addressForm, setAddressForm] = useState<AddressFormData>({
    name: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pinCode: "",
    saveAddress: false,
  });

  const [paymentForm, setPaymentForm] = useState<PaymentFormData>({
    method: "COD",
    upiId: "",
    cardToken: "",
  });

  if (items.length === 0) {
    void navigate({ to: "/cart" });
    return null;
  }

  function updateAddress(
    field: keyof AddressFormData,
    value: string | boolean,
  ) {
    setAddressForm((prev) => ({ ...prev, [field]: value }));
  }

  function validateAddress() {
    const { name, phone, addressLine1, city, state, pinCode } = addressForm;
    if (
      !name.trim() ||
      !phone.trim() ||
      !addressLine1.trim() ||
      !city.trim() ||
      !state.trim() ||
      !pinCode.trim()
    ) {
      toast.error("Please fill in all required fields");
      return false;
    }
    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      toast.error("Enter a valid 10-digit Indian mobile number");
      return false;
    }
    if (!/^\d{6}$/.test(pinCode.trim())) {
      toast.error("Enter a valid 6-digit PIN code");
      return false;
    }
    return true;
  }

  function validatePayment() {
    if (paymentForm.method === "UPI" && !paymentForm.upiId.trim()) {
      toast.error("Enter a valid UPI ID");
      return false;
    }
    return true;
  }

  function handleNext() {
    if (currentStep === CheckoutStep.Address && !validateAddress()) return;
    if (currentStep === CheckoutStep.Payment && !validatePayment()) return;
    if (currentStep === CheckoutStep.Address)
      setCurrentStep(CheckoutStep.Payment);
    else if (currentStep === CheckoutStep.Payment)
      setCurrentStep(CheckoutStep.Review);
  }

  async function handlePlaceOrder() {
    if (!actor) {
      toast.error("Please sign in to place an order");
      return;
    }
    setIsPlacing(true);
    try {
      const shipping: AddressSnapshot = {
        name: addressForm.name,
        phone: addressForm.phone,
        addressLine1: addressForm.addressLine1,
        addressLine2: addressForm.addressLine2,
        city: addressForm.city,
        state: addressForm.state,
        pinCode: addressForm.pinCode,
      };

      let paymentMethod: PaymentMethod;
      if (paymentForm.method === "UPI") {
        paymentMethod = { __kind__: "UPI", UPI: paymentForm.upiId.trim() };
      } else if (paymentForm.method === "Card") {
        paymentMethod = {
          __kind__: "Card",
          Card: paymentForm.cardToken || "card_token",
        };
      } else {
        paymentMethod = { __kind__: "COD", COD: null };
      }

      const order = await actor.createOrder({
        paymentMethod,
        shippingAddress: shipping,
      });
      if (addressForm.saveAddress) {
        await actor
          .createAddress({
            name: addressForm.name,
            phone: addressForm.phone,
            addressLine1: addressForm.addressLine1,
            addressLine2: addressForm.addressLine2,
            city: addressForm.city,
            state: addressForm.state,
            pinCode: addressForm.pinCode,
            isDefault: false,
          })
          .catch(() => {
            /* non-critical */
          });
      }
      clearCart();
      void navigate({
        to: "/order-success",
        search: { orderId: String(order.id) },
      });
    } catch (err) {
      toast.error("Failed to place order. Please try again.");
      console.error(err);
    } finally {
      setIsPlacing(false);
    }
  }

  const stepIdx = STEPS.findIndex((s) => s.step === currentStep);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8" data-ocid="checkout.page">
      {/* Step progress */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => {
          const isActive = s.step === currentStep;
          const isDone = i < stepIdx;
          return (
            <div key={s.step} className="flex items-center gap-2">
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : isDone
                      ? "bg-accent/20 text-accent"
                      : "bg-muted text-muted-foreground"
                }`}
                data-ocid={`checkout.step_${s.step}`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <s.icon className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{i + 1}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-6 h-px bg-border flex-shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Step 1: Address */}
          {currentStep === CheckoutStep.Address && (
            <div
              className="bg-card border border-border rounded-lg p-6"
              data-ocid="checkout.address_section"
            >
              <h2 className="font-display font-bold text-xl text-foreground mb-5 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" /> Delivery Address
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="checkout-name">Full Name *</Label>
                    <Input
                      id="checkout-name"
                      value={addressForm.name}
                      onChange={(e) => updateAddress("name", e.target.value)}
                      placeholder="Rajesh Kumar"
                      data-ocid="checkout.name_input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="checkout-phone">Mobile Number *</Label>
                    <Input
                      id="checkout-phone"
                      value={addressForm.phone}
                      onChange={(e) => updateAddress("phone", e.target.value)}
                      placeholder="9876543210"
                      maxLength={10}
                      data-ocid="checkout.phone_input"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="checkout-addr1">Address Line 1 *</Label>
                  <Input
                    id="checkout-addr1"
                    value={addressForm.addressLine1}
                    onChange={(e) =>
                      updateAddress("addressLine1", e.target.value)
                    }
                    placeholder="Flat/House No., Building, Street"
                    data-ocid="checkout.address1_input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="checkout-addr2">Address Line 2</Label>
                  <Input
                    id="checkout-addr2"
                    value={addressForm.addressLine2}
                    onChange={(e) =>
                      updateAddress("addressLine2", e.target.value)
                    }
                    placeholder="Area, Colony, Landmark (optional)"
                    data-ocid="checkout.address2_input"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="checkout-city">City *</Label>
                    <Input
                      id="checkout-city"
                      value={addressForm.city}
                      onChange={(e) => updateAddress("city", e.target.value)}
                      placeholder="Mumbai"
                      data-ocid="checkout.city_input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="checkout-state">State *</Label>
                    <select
                      id="checkout-state"
                      value={addressForm.state}
                      onChange={(e) => updateAddress("state", e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      data-ocid="checkout.state_select"
                    >
                      <option value="">Select state</option>
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="checkout-pin">PIN Code *</Label>
                    <Input
                      id="checkout-pin"
                      value={addressForm.pinCode}
                      onChange={(e) => updateAddress("pinCode", e.target.value)}
                      placeholder="400001"
                      maxLength={6}
                      data-ocid="checkout.pin_input"
                    />
                  </div>
                </div>
                <label
                  className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground"
                  data-ocid="checkout.save_address_checkbox"
                >
                  <input
                    type="checkbox"
                    checked={addressForm.saveAddress}
                    onChange={(e) =>
                      updateAddress("saveAddress", e.target.checked)
                    }
                    className="rounded border-border"
                  />
                  Save this address for future orders
                </label>
              </div>
              <Button
                type="button"
                onClick={handleNext}
                className="mt-6 bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
                data-ocid="checkout.address_continue_button"
              >
                Continue to Payment
              </Button>
            </div>
          )}

          {/* Step 2: Payment */}
          {currentStep === CheckoutStep.Payment && (
            <div
              className="bg-card border border-border rounded-lg p-6"
              data-ocid="checkout.payment_section"
            >
              <h2 className="font-display font-bold text-xl text-foreground mb-5 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-accent" /> Choose Payment
                Method
              </h2>
              <div className="space-y-3">
                {(
                  [
                    {
                      value: "COD" as const,
                      label: "Cash on Delivery",
                      desc: "Pay when your order arrives",
                    },
                    {
                      value: "UPI" as const,
                      label: "UPI",
                      desc: "Google Pay, PhonePe, Paytm, BHIM",
                    },
                    {
                      value: "Card" as const,
                      label: "Credit / Debit Card",
                      desc: "Visa, Mastercard, RuPay (via Stripe)",
                    },
                  ] as const
                ).map(({ value, label, desc }) => (
                  <label
                    key={value}
                    className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors duration-200 ${
                      paymentForm.method === value
                        ? "border-accent bg-accent/5"
                        : "border-border hover:bg-muted/30"
                    }`}
                    data-ocid={`checkout.payment_${value.toLowerCase()}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={value}
                      checked={paymentForm.method === value}
                      onChange={() =>
                        setPaymentForm((p) => ({ ...p, method: value }))
                      }
                      className="mt-0.5"
                    />
                    <div>
                      <p className="font-medium text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {desc}
                      </p>
                    </div>
                  </label>
                ))}
              </div>

              {paymentForm.method === "UPI" && (
                <div className="mt-4 space-y-1.5">
                  <Label htmlFor="upi-id">UPI ID</Label>
                  <Input
                    id="upi-id"
                    value={paymentForm.upiId}
                    onChange={(e) =>
                      setPaymentForm((p) => ({ ...p, upiId: e.target.value }))
                    }
                    placeholder="name@upi"
                    data-ocid="checkout.upi_input"
                  />
                </div>
              )}

              {paymentForm.method === "Card" && (
                <div className="mt-4 p-4 bg-muted/30 rounded-lg text-sm text-muted-foreground">
                  <p>🔒 Card payment processed securely via Stripe.</p>
                  <p className="mt-1">
                    You'll be redirected to complete payment after order review.
                  </p>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(CheckoutStep.Address)}
                  className="flex items-center gap-1"
                  data-ocid="checkout.payment_back_button"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </Button>
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
                  data-ocid="checkout.payment_continue_button"
                >
                  Review Order
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === CheckoutStep.Review && (
            <div className="space-y-4" data-ocid="checkout.review_section">
              <div className="bg-card border border-border rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-3">
                  Delivering to
                </h3>
                <p className="text-sm text-foreground font-medium">
                  {addressForm.name} · {addressForm.phone}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {addressForm.addressLine1}
                  {addressForm.addressLine2
                    ? `, ${addressForm.addressLine2}`
                    : ""}
                </p>
                <p className="text-sm text-muted-foreground">
                  {addressForm.city}, {addressForm.state} –{" "}
                  {addressForm.pinCode}
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-3">Payment</h3>
                <p className="text-sm text-foreground">
                  {paymentForm.method === "COD" && "Cash on Delivery"}
                  {paymentForm.method === "UPI" && `UPI – ${paymentForm.upiId}`}
                  {paymentForm.method === "Card" &&
                    "Credit / Debit Card (Stripe)"}
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-3">
                  Order Items ({items.length})
                </h3>
                <div className="space-y-3">
                  {items.map((item, idx) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3"
                      data-ocid={`checkout.review_item.${idx + 1}`}
                    >
                      <img
                        src={
                          item.product.images[0] ??
                          "/assets/images/placeholder.svg"
                        }
                        alt={item.product.title}
                        className="w-12 h-12 rounded object-cover bg-muted/30"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground line-clamp-1">
                          {item.product.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        {formatINR(
                          (item.product.salePrice ?? item.product.price) *
                            item.quantity,
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(CheckoutStep.Payment)}
                  className="flex items-center gap-1"
                  data-ocid="checkout.review_back_button"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </Button>
                <Button
                  type="button"
                  onClick={() => void handlePlaceOrder()}
                  disabled={isPlacing}
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base"
                  data-ocid="checkout.place_order_button"
                >
                  {isPlacing
                    ? "Placing Order…"
                    : `Place Order · ${formatINR(total)}`}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div
          className="bg-card border border-border rounded-lg p-5 h-fit sticky top-20"
          data-ocid="checkout.order_summary"
        >
          <h2 className="font-display font-bold text-lg text-foreground mb-4">
            Order Summary
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>
                Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)
              </span>
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
                    : ""
                }
              >
                {deliveryCharge === 0 ? "FREE" : formatINR(deliveryCharge)}
              </span>
            </div>
            {deliveryCharge > 0 && (
              <p className="text-xs text-muted-foreground">
                Free delivery on orders above{" "}
                {formatINR(FREE_DELIVERY_THRESHOLD)}
              </p>
            )}
            <Separator className="my-2" />
            <div className="flex justify-between font-bold text-base text-foreground">
              <span>Total</span>
              <span>{formatINR(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
