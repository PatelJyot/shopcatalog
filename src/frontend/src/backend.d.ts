import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CreateAddressRequest {
    city: string;
    name: string;
    state: string;
    addressLine1: string;
    addressLine2: string;
    isDefault: boolean;
    pinCode: string;
    phone: string;
}
export interface SearchResult {
    total: bigint;
    page: bigint;
    pageSize: bigint;
    products: Array<Product>;
}
export type Time = bigint;
export type PaymentMethod = {
    __kind__: "COD";
    COD: null;
} | {
    __kind__: "UPI";
    UPI: string;
} | {
    __kind__: "Card";
    Card: string;
};
export interface OrderItem {
    title: string;
    productId: bigint;
    quantity: bigint;
    image: string;
    price: number;
}
export interface SearchParams {
    categories: Array<string>;
    brands: Array<string>;
    minRating: number;
    inStock: boolean;
    sortBy: string;
    page: bigint;
    pageSize: bigint;
    maxPrice: number;
    minPrice: number;
    searchQuery: string;
}
export interface Order {
    id: bigint;
    deliveryCharge: number;
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
    orderStatus: OrderStatus;
    userId: Principal;
    createdAt: Time;
    shippingAddress: AddressSnapshot;
    items: Array<OrderItem>;
    taxAmount: number;
    totalPrice: number;
    subtotal: number;
}
export interface UserAddress {
    id: bigint;
    city: string;
    userId: Principal;
    name: string;
    createdAt: Time;
    state: string;
    addressLine1: string;
    addressLine2: string;
    isDefault: boolean;
    pinCode: string;
    phone: string;
}
export interface CartItemView {
    id: bigint;
    title: string;
    productId: bigint;
    updatedAt: Time;
    addedAt: Time;
    quantity: bigint;
    salePrice?: number;
    image: string;
    price: number;
}
export interface CreateOrderRequest {
    paymentMethod: PaymentMethod;
    shippingAddress: AddressSnapshot;
}
export interface CartItem {
    id: bigint;
    userId: Principal;
    productId: bigint;
    updatedAt: Time;
    addedAt: Time;
    quantity: bigint;
}
export interface AddressSnapshot {
    city: string;
    name: string;
    state: string;
    addressLine1: string;
    addressLine2: string;
    pinCode: string;
    phone: string;
}
export interface Product {
    id: bigint;
    sku: string;
    stockQuantity: bigint;
    title: string;
    description: string;
    sellerName: string;
    isFeatured: boolean;
    category: Category;
    salePrice?: number;
    brand: string;
    rating: number;
    price: number;
    reviewCount: bigint;
    images: Array<string>;
}
export enum Category {
    Home = "Home",
    Grocery = "Grocery",
    Books = "Books",
    Fashion = "Fashion",
    Electronics = "Electronics"
}
export enum OrderStatus {
    Delivered = "Delivered",
    Confirmed = "Confirmed",
    Cancelled = "Cancelled",
    Shipped = "Shipped",
    Pending = "Pending"
}
export enum PaymentStatus {
    Failed = "Failed",
    Paid = "Paid",
    Pending = "Pending"
}
export interface backendInterface {
    addToCart(productId: bigint, quantity: bigint): Promise<CartItem>;
    clearCart(): Promise<void>;
    createAddress(req: CreateAddressRequest): Promise<UserAddress>;
    createOrder(req: CreateOrderRequest): Promise<Order>;
    getBrands(): Promise<Array<string>>;
    getCart(): Promise<Array<CartItemView>>;
    getDeals(): Promise<Array<Product>>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getOrder(orderId: bigint): Promise<Order | null>;
    getProduct(id: bigint): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    getSavedAddresses(): Promise<Array<UserAddress>>;
    getSearchSuggestions(q: string): Promise<Array<Product>>;
    getUserOrders(): Promise<Array<Order>>;
    removeFromCart(cartItemId: bigint): Promise<boolean>;
    searchProducts(params: SearchParams): Promise<SearchResult>;
    updateCartQuantity(cartItemId: bigint, quantity: bigint): Promise<boolean>;
}
