import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Review {
    id: bigint;
    title: string;
    body: string;
    userId: Principal;
    createdAt: Time;
    productId: bigint;
    rating: bigint;
    helpfulVotes: Array<HelpfulVote>;
    helpfulCount: bigint;
    verifiedPurchase: boolean;
    images: Array<string>;
}
export interface SearchResult {
    total: bigint;
    page: bigint;
    pageSize: bigint;
    products: Array<Product>;
}
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
export type Time = bigint;
export interface PaginatedOrders {
    total: bigint;
    orders: Array<Order>;
}
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
    trackingNumber?: string;
    deliveryCharge: number;
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
    orderStatus: OrderStatus;
    userId: Principal;
    createdAt: Time;
    estimatedDeliveryDate?: Time;
    updatedAt: Time;
    shippingAddress: AddressSnapshot;
    items: Array<OrderItem>;
    taxAmount: number;
    totalPrice: number;
    subtotal: number;
}
export interface CreateReviewRequest {
    title: string;
    body: string;
    productId: bigint;
    rating: bigint;
    images: Array<string>;
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
export interface HelpfulVote {
    userId: Principal;
    isHelpful: boolean;
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
export interface RatingDistribution {
    star1: bigint;
    star2: bigint;
    star3: bigint;
    star4: bigint;
    star5: bigint;
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
export interface OrderNotification {
    oldStatus: OrderStatus;
    userId: Principal;
    orderId: bigint;
    message: string;
    timestamp: Time;
    newStatus: OrderStatus;
}
export enum Category {
    Home = "Home",
    Grocery = "Grocery",
    Books = "Books",
    Fashion = "Fashion",
    Electronics = "Electronics"
}
export enum OrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    outForDelivery = "outForDelivery",
    placed = "placed",
    delivered = "delivered",
    confirmed = "confirmed",
    packed = "packed",
    returned = "returned"
}
export enum PaymentStatus {
    Failed = "Failed",
    Paid = "Paid",
    Pending = "Pending"
}
export interface backendInterface {
    addToCart(productId: bigint, quantity: bigint): Promise<CartItem>;
    cancelOrder(orderId: bigint): Promise<Order | null>;
    clearCart(): Promise<void>;
    createAddress(req: CreateAddressRequest): Promise<UserAddress>;
    createOrder(req: CreateOrderRequest): Promise<Order>;
    createReview(req: CreateReviewRequest): Promise<Review>;
    getAllOrders(offset: bigint, limit: bigint): Promise<PaginatedOrders>;
    getBrands(): Promise<Array<string>>;
    getCart(): Promise<Array<CartItemView>>;
    getDeals(): Promise<Array<Product>>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getOrder(orderId: bigint): Promise<Order | null>;
    getOrderNotifications(): Promise<Array<OrderNotification>>;
    getProduct(id: bigint): Promise<Product | null>;
    getProductReviews(productId: bigint): Promise<Array<Review>>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    getRatingDistribution(productId: bigint): Promise<RatingDistribution>;
    getSavedAddresses(): Promise<Array<UserAddress>>;
    getSearchSuggestions(q: string): Promise<Array<Product>>;
    getUserOrders(): Promise<Array<Order>>;
    removeFromCart(cartItemId: bigint): Promise<boolean>;
    returnOrder(orderId: bigint): Promise<Order | null>;
    searchProducts(params: SearchParams): Promise<SearchResult>;
    toggleHelpfulVote(reviewId: bigint, isHelpful: boolean): Promise<void>;
    updateCartQuantity(cartItemId: bigint, quantity: bigint): Promise<boolean>;
    updateOrderStatus(orderId: bigint, newStatus: OrderStatus): Promise<Order | null>;
}
