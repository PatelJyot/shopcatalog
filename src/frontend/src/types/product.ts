export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  salePrice: number | null;
  category: string;
  brand: string;
  images: string[];
  stockQuantity: number;
  sku: string;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  sellerName: string;
}

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Category = "Electronics" | "Fashion" | "Grocery" | "Books" | "Home";

export const CATEGORIES: Category[] = [
  "Electronics",
  "Fashion",
  "Grocery",
  "Books",
  "Home",
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Galaxy Buds Pro – Phantom Black",
    description:
      "True wireless earbuds with intelligent active noise cancellation. Enjoy rich, immersive sound with 360° audio and seamless device switching. IPX7 water resistance for worry-free workouts.",
    price: 169.99,
    salePrice: 129.99,
    category: "Electronics",
    brand: "Samsung",
    images: ["/assets/generated/hero-banner.dim_1200x400.jpg"],
    stockQuantity: 48,
    sku: "SAM-GBP-001",
    rating: 4.5,
    reviewCount: 1234,
    isFeatured: true,
    sellerName: "TechHub Official",
  },
  {
    id: "2",
    title: "Wamen Running – Premium Shoes",
    description:
      "Engineered for long-distance comfort with responsive foam cushioning, breathable mesh upper, and carbon-infused plate for explosive energy return on every stride.",
    price: 166.99,
    salePrice: 129.99,
    category: "Fashion",
    brand: "Nike",
    images: ["/assets/generated/hero-banner.dim_1200x400.jpg"],
    stockQuantity: 30,
    sku: "NIK-RUN-002",
    rating: 4.8,
    reviewCount: 987,
    isFeatured: true,
    sellerName: "SportsGear Pro",
  },
  {
    id: "3",
    title: "Wascho Smart Speaker Plus",
    description:
      "Room-filling 360° sound with adaptive audio that automatically tunes to your space. Built-in voice assistant, multi-room audio sync, and smart home hub capability.",
    price: 168.99,
    salePrice: 129.99,
    category: "Electronics",
    brand: "Amazon",
    images: ["/assets/generated/hero-banner.dim_1200x400.jpg"],
    stockQuantity: 22,
    sku: "AMZ-SPK-003",
    rating: 4.6,
    reviewCount: 2341,
    isFeatured: true,
    sellerName: "Amazon Direct",
  },
  {
    id: "4",
    title: "Barner Desktop Backpack",
    description:
      "Minimalist 30L commuter backpack with dedicated laptop compartment, anti-theft hidden pocket, TSA-approved lockable zippers, and ergonomic airflow back panel.",
    price: 169.99,
    salePrice: 129.99,
    category: "Fashion",
    brand: "Barner",
    images: ["/assets/generated/hero-banner.dim_1200x400.jpg"],
    stockQuantity: 55,
    sku: "BAR-BAG-004",
    rating: 4.7,
    reviewCount: 1567,
    isFeatured: true,
    sellerName: "Urban Carry",
  },
  {
    id: "5",
    title: "Apple AirPods Pro 2nd Gen",
    description:
      "Up to 2x more Active Noise Cancellation than previous generation. Adaptive Transparency, Personalized Spatial Audio, and all-day battery life.",
    price: 249.99,
    salePrice: 189.99,
    category: "Electronics",
    brand: "Apple",
    images: ["/assets/generated/hero-banner.dim_1200x400.jpg"],
    stockQuantity: 18,
    sku: "APL-APP-005",
    rating: 4.9,
    reviewCount: 8901,
    isFeatured: false,
    sellerName: "Apple Store",
  },
  {
    id: "6",
    title: "Atomic Habits – Hardcover",
    description:
      "An easy and proven way to build good habits and break bad ones. #1 New York Times bestseller by James Clear. Over 15 million copies sold worldwide.",
    price: 29.99,
    salePrice: null,
    category: "Books",
    brand: "Avery",
    images: ["/assets/generated/hero-banner.dim_1200x400.jpg"],
    stockQuantity: 200,
    sku: "BK-ATM-006",
    rating: 4.8,
    reviewCount: 43210,
    isFeatured: false,
    sellerName: "Books Direct",
  },
  {
    id: "7",
    title: "Nespresso Vertuo Coffee Machine",
    description:
      "Brew barista-quality coffee at home with Centrifusion™ technology. Compatible with 30+ coffee varieties, makes espresso to carafe sizes.",
    price: 219.99,
    salePrice: 159.99,
    category: "Home",
    brand: "Nespresso",
    images: ["/assets/generated/hero-banner.dim_1200x400.jpg"],
    stockQuantity: 12,
    sku: "NSP-CFF-007",
    rating: 4.4,
    reviewCount: 5678,
    isFeatured: false,
    sellerName: "Home Essentials",
  },
  {
    id: "8",
    title: "Levi's 501 Original Jeans",
    description:
      "The original blue jeans since 1873. Straight leg, button fly, sits at waist. Made with organic cotton for a more sustainable choice.",
    price: 89.99,
    salePrice: 59.99,
    category: "Fashion",
    brand: "Levi's",
    images: ["/assets/generated/hero-banner.dim_1200x400.jpg"],
    stockQuantity: 87,
    sku: "LEV-JNS-008",
    rating: 4.3,
    reviewCount: 12345,
    isFeatured: false,
    sellerName: "Fashion Vault",
  },
];
