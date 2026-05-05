import { c as createLucideIcon, e as useNavigate, k as useCart, q as useActor, r as reactExports, j as jsxRuntimeExports, I as Input, b as Button, l as ue, s as createActor } from "./index-WnByi3p_.js";
import { L as Label } from "./label-DvjHdrro.js";
import { S as Separator } from "./separator-CFVLorHG.js";
import { C as CircleCheck } from "./circle-check-CMmVv3md.js";
import "./index-jbvIYv-3.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 16 2 2 4-4", key: "gfu2re" }],
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h"
    }
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }]
];
const PackageCheck = createLucideIcon("package-check", __iconNode);
var CheckoutStep = /* @__PURE__ */ ((CheckoutStep2) => {
  CheckoutStep2["Address"] = "address";
  CheckoutStep2["Payment"] = "payment";
  CheckoutStep2["Review"] = "review";
  return CheckoutStep2;
})(CheckoutStep || {});
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
  "Ladakh"
];
const GST_RATE = 0.18;
const FREE_DELIVERY_THRESHOLD = 499;
const DELIVERY_CHARGE = 50;
function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}
const STEPS = [
  { step: CheckoutStep.Address, label: "Delivery Address", icon: MapPin },
  { step: CheckoutStep.Payment, label: "Payment", icon: CreditCard },
  {
    step: CheckoutStep.Review,
    label: "Review & Place Order",
    icon: PackageCheck
  }
];
function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { actor } = useActor(createActor);
  const [currentStep, setCurrentStep] = reactExports.useState(
    CheckoutStep.Address
  );
  const [isPlacing, setIsPlacing] = reactExports.useState(false);
  const subtotal = totalPrice;
  const deliveryCharge = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const gst = Math.round(subtotal * GST_RATE);
  const total = subtotal + gst + deliveryCharge;
  const [addressForm, setAddressForm] = reactExports.useState({
    name: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pinCode: "",
    saveAddress: false
  });
  const [paymentForm, setPaymentForm] = reactExports.useState({
    method: "COD",
    upiId: "",
    cardToken: ""
  });
  if (items.length === 0) {
    void navigate({ to: "/cart" });
    return null;
  }
  function updateAddress(field, value) {
    setAddressForm((prev) => ({ ...prev, [field]: value }));
  }
  function validateAddress() {
    const { name, phone, addressLine1, city, state, pinCode } = addressForm;
    if (!name.trim() || !phone.trim() || !addressLine1.trim() || !city.trim() || !state.trim() || !pinCode.trim()) {
      ue.error("Please fill in all required fields");
      return false;
    }
    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      ue.error("Enter a valid 10-digit Indian mobile number");
      return false;
    }
    if (!/^\d{6}$/.test(pinCode.trim())) {
      ue.error("Enter a valid 6-digit PIN code");
      return false;
    }
    return true;
  }
  function validatePayment() {
    if (paymentForm.method === "UPI" && !paymentForm.upiId.trim()) {
      ue.error("Enter a valid UPI ID");
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
      ue.error("Please sign in to place an order");
      return;
    }
    setIsPlacing(true);
    try {
      const shipping = {
        name: addressForm.name,
        phone: addressForm.phone,
        addressLine1: addressForm.addressLine1,
        addressLine2: addressForm.addressLine2,
        city: addressForm.city,
        state: addressForm.state,
        pinCode: addressForm.pinCode
      };
      let paymentMethod;
      if (paymentForm.method === "UPI") {
        paymentMethod = { __kind__: "UPI", UPI: paymentForm.upiId.trim() };
      } else if (paymentForm.method === "Card") {
        paymentMethod = {
          __kind__: "Card",
          Card: paymentForm.cardToken || "card_token"
        };
      } else {
        paymentMethod = { __kind__: "COD", COD: null };
      }
      const order = await actor.createOrder({
        paymentMethod,
        shippingAddress: shipping
      });
      if (addressForm.saveAddress) {
        await actor.createAddress({
          name: addressForm.name,
          phone: addressForm.phone,
          addressLine1: addressForm.addressLine1,
          addressLine2: addressForm.addressLine2,
          city: addressForm.city,
          state: addressForm.state,
          pinCode: addressForm.pinCode,
          isDefault: false
        }).catch(() => {
        });
      }
      clearCart();
      void navigate({
        to: "/order-success",
        search: { orderId: String(order.id) }
      });
    } catch (err) {
      ue.error("Failed to place order. Please try again.");
      console.error(err);
    } finally {
      setIsPlacing(false);
    }
  }
  const stepIdx = STEPS.findIndex((s) => s.step === currentStep);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-8", "data-ocid": "checkout.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-8", children: STEPS.map((s, i) => {
      const isActive = s.step === currentStep;
      const isDone = i < stepIdx;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${isActive ? "bg-accent text-accent-foreground" : isDone ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"}`,
            "data-ocid": `checkout.step_${s.step}`,
            children: [
              isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: s.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: i + 1 })
            ]
          }
        ),
        i < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-px bg-border flex-shrink-0" })
      ] }, s.step);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
        currentStep === CheckoutStep.Address && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-lg p-6",
            "data-ocid": "checkout.address_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-xl text-foreground mb-5 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5 text-accent" }),
                " Delivery Address"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "checkout-name", children: "Full Name *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "checkout-name",
                        value: addressForm.name,
                        onChange: (e) => updateAddress("name", e.target.value),
                        placeholder: "Rajesh Kumar",
                        "data-ocid": "checkout.name_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "checkout-phone", children: "Mobile Number *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "checkout-phone",
                        value: addressForm.phone,
                        onChange: (e) => updateAddress("phone", e.target.value),
                        placeholder: "9876543210",
                        maxLength: 10,
                        "data-ocid": "checkout.phone_input"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "checkout-addr1", children: "Address Line 1 *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "checkout-addr1",
                      value: addressForm.addressLine1,
                      onChange: (e) => updateAddress("addressLine1", e.target.value),
                      placeholder: "Flat/House No., Building, Street",
                      "data-ocid": "checkout.address1_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "checkout-addr2", children: "Address Line 2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "checkout-addr2",
                      value: addressForm.addressLine2,
                      onChange: (e) => updateAddress("addressLine2", e.target.value),
                      placeholder: "Area, Colony, Landmark (optional)",
                      "data-ocid": "checkout.address2_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "checkout-city", children: "City *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "checkout-city",
                        value: addressForm.city,
                        onChange: (e) => updateAddress("city", e.target.value),
                        placeholder: "Mumbai",
                        "data-ocid": "checkout.city_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "checkout-state", children: "State *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        id: "checkout-state",
                        value: addressForm.state,
                        onChange: (e) => updateAddress("state", e.target.value),
                        className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        "data-ocid": "checkout.state_select",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select state" }),
                          INDIAN_STATES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "checkout-pin", children: "PIN Code *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "checkout-pin",
                        value: addressForm.pinCode,
                        onChange: (e) => updateAddress("pinCode", e.target.value),
                        placeholder: "400001",
                        maxLength: 6,
                        "data-ocid": "checkout.pin_input"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    className: "flex items-center gap-2 cursor-pointer text-sm text-muted-foreground",
                    "data-ocid": "checkout.save_address_checkbox",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "checkbox",
                          checked: addressForm.saveAddress,
                          onChange: (e) => updateAddress("saveAddress", e.target.checked),
                          className: "rounded border-border"
                        }
                      ),
                      "Save this address for future orders"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  onClick: handleNext,
                  className: "mt-6 bg-accent hover:bg-accent/90 text-accent-foreground font-medium",
                  "data-ocid": "checkout.address_continue_button",
                  children: "Continue to Payment"
                }
              )
            ]
          }
        ),
        currentStep === CheckoutStep.Payment && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-lg p-6",
            "data-ocid": "checkout.payment_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-xl text-foreground mb-5 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5 text-accent" }),
                " Choose Payment Method"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
                {
                  value: "COD",
                  label: "Cash on Delivery",
                  desc: "Pay when your order arrives"
                },
                {
                  value: "UPI",
                  label: "UPI",
                  desc: "Google Pay, PhonePe, Paytm, BHIM"
                },
                {
                  value: "Card",
                  label: "Credit / Debit Card",
                  desc: "Visa, Mastercard, RuPay (via Stripe)"
                }
              ].map(({ value, label, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  className: `flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors duration-200 ${paymentForm.method === value ? "border-accent bg-accent/5" : "border-border hover:bg-muted/30"}`,
                  "data-ocid": `checkout.payment_${value.toLowerCase()}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "radio",
                        name: "payment",
                        value,
                        checked: paymentForm.method === value,
                        onChange: () => setPaymentForm((p) => ({ ...p, method: value })),
                        className: "mt-0.5"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: desc })
                    ] })
                  ]
                },
                value
              )) }),
              paymentForm.method === "UPI" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "upi-id", children: "UPI ID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "upi-id",
                    value: paymentForm.upiId,
                    onChange: (e) => setPaymentForm((p) => ({ ...p, upiId: e.target.value })),
                    placeholder: "name@upi",
                    "data-ocid": "checkout.upi_input"
                  }
                )
              ] }),
              paymentForm.method === "Card" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-4 bg-muted/30 rounded-lg text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "🔒 Card payment processed securely via Stripe." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1", children: "You'll be redirected to complete payment after order review." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: () => setCurrentStep(CheckoutStep.Address),
                    className: "flex items-center gap-1",
                    "data-ocid": "checkout.payment_back_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
                      " Back"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    onClick: handleNext,
                    className: "bg-accent hover:bg-accent/90 text-accent-foreground font-medium",
                    "data-ocid": "checkout.payment_continue_button",
                    children: "Review Order"
                  }
                )
              ] })
            ]
          }
        ),
        currentStep === CheckoutStep.Review && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "checkout.review_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-3", children: "Delivering to" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground font-medium", children: [
              addressForm.name,
              " · ",
              addressForm.phone
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
              addressForm.addressLine1,
              addressForm.addressLine2 ? `, ${addressForm.addressLine2}` : ""
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              addressForm.city,
              ", ",
              addressForm.state,
              " –",
              " ",
              addressForm.pinCode
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-3", children: "Payment" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground", children: [
              paymentForm.method === "COD" && "Cash on Delivery",
              paymentForm.method === "UPI" && `UPI – ${paymentForm.upiId}`,
              paymentForm.method === "Card" && "Credit / Debit Card (Stripe)"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-foreground mb-3", children: [
              "Order Items (",
              items.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-3",
                "data-ocid": `checkout.review_item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: item.product.images[0] ?? "/assets/images/placeholder.svg",
                      alt: item.product.title,
                      className: "w-12 h-12 rounded object-cover bg-muted/30"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground line-clamp-1", children: item.product.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "Qty: ",
                      item.quantity
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: formatINR(
                    (item.product.salePrice ?? item.product.price) * item.quantity
                  ) })
                ]
              },
              item.product.id
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => setCurrentStep(CheckoutStep.Payment),
                className: "flex items-center gap-1",
                "data-ocid": "checkout.review_back_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
                  " Back"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                onClick: () => void handlePlaceOrder(),
                disabled: isPlacing,
                className: "flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base",
                "data-ocid": "checkout.place_order_button",
                children: isPlacing ? "Placing Order…" : `Place Order · ${formatINR(total)}`
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-lg p-5 h-fit sticky top-20",
          "data-ocid": "checkout.order_summary",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground mb-4", children: "Order Summary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Subtotal (",
                  items.reduce((s, i) => s + i.quantity, 0),
                  " items)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatINR(subtotal) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GST (18%)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatINR(gst) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Delivery" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: deliveryCharge === 0 ? "text-[color:var(--accent)] font-medium" : "",
                    children: deliveryCharge === 0 ? "FREE" : formatINR(deliveryCharge)
                  }
                )
              ] }),
              deliveryCharge > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Free delivery on orders above",
                " ",
                formatINR(FREE_DELIVERY_THRESHOLD)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-base text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatINR(total) })
              ] })
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  Checkout as default
};
