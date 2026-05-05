import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
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
export interface backendInterface {
    getDeals(): Promise<Array<Product>>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getProduct(id: bigint): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
}
