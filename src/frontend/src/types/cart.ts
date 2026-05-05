import type {
  AddressSnapshot,
  CartItemView as BackendCartItemView,
  Order as BackendOrder,
  OrderItem as BackendOrderItem,
  UserAddress as BackendUserAddress,
  PaymentMethod,
} from "@/backend";

// Re-export backend types for convenience
export type {
  PaymentMethod,
  BackendCartItemView,
  BackendOrder,
  BackendOrderItem,
  BackendUserAddress,
  AddressSnapshot,
};

export interface CartItemView {
  id: bigint;
  productId: bigint;
  title: string;
  image: string;
  price: number;
  salePrice: number | undefined;
  quantity: bigint;
  addedAt: bigint;
  updatedAt: bigint;
}

export interface UserAddress {
  id: bigint;
  userId: import("@icp-sdk/core/principal").Principal;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pinCode: string;
  isDefault: boolean;
  createdAt: bigint;
}

export interface OrderItem {
  productId: bigint;
  title: string;
  image: string;
  price: number;
  quantity: bigint;
}

export interface Order {
  id: bigint;
  userId: import("@icp-sdk/core/principal").Principal;
  items: OrderItem[];
  totalPrice: number;
  subtotal: number;
  taxAmount: number;
  deliveryCharge: number;
  shippingAddress: AddressSnapshot;
  paymentMethod: PaymentMethod;
  paymentStatus: "Pending" | "Paid" | "Failed";
  orderStatus: "Pending" | "Confirmed" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: bigint;
}
