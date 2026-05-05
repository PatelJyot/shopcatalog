import ProductCard from "@/components/ProductCard";
import StarRating from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/hooks/useCart";
import { useProduct, useProductsByCategory } from "@/hooks/useProducts";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ChevronRight,
  Minus,
  Package,
  Plus,
  RotateCcw,
  Shield,
  ShoppingCart,
  Truck,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

function StockBadge({ qty }: { qty: number }) {
  if (qty === 0)
    return (
      <span className="inline-flex items-center gap-1 text-sm font-semibold text-destructive">
        <AlertCircle className="w-4 h-4" />
        Out of Stock
      </span>
    );
  if (qty < 5)
    return (
      <span
        className="inline-flex items-center gap-1 text-sm font-semibold"
        style={{ color: "#b45309" }}
      >
        <Package className="w-4 h-4" />
        Only {qty} left in stock — order soon!
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-700">
      <Package className="w-4 h-4" />
      In Stock
    </span>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Skeleton className="h-4 w-48 mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-3">
          <Skeleton className="aspect-square w-full rounded-xl" />
          <div className="flex gap-2">
            {["t1", "t2", "t3", "t4"].map((k) => (
              <Skeleton
                key={k}
                className="w-20 h-20 rounded-lg flex-shrink-0"
              />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}

const THUMB_KEYS = ["thumb-0", "thumb-1", "thumb-2", "thumb-3"];
const RELATED_KEYS = ["rel-0", "rel-1", "rel-2", "rel-3"];

export default function ProductDetail() {
  const { id } = useParams({ from: "/product/$id" });
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useProduct(id);
  const { data: related } = useProductsByCategory(product?.category ?? "");
  const { addToCart } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Reset gallery and quantity when navigating to a different product
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional reset on id change
  useEffect(() => {
    setActiveImage(0);
    setQuantity(1);
  }, [id]);

  if (isLoading) return <ProductDetailSkeleton />;

  if (isError || !product) {
    return (
      <div
        className="max-w-4xl mx-auto px-4 py-20 text-center"
        data-ocid="product.error_state"
      >
        <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Product Not Found
        </h2>
        <p className="text-muted-foreground mb-6">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Button
          type="button"
          onClick={() => navigate({ to: "/products" })}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          Browse All Products
        </Button>
      </div>
    );
  }

  const isOnSale =
    product.salePrice !== null && product.salePrice < product.price;
  const displayPrice = isOnSale ? product.salePrice! : product.price;
  const discountPct = isOnSale
    ? Math.round((1 - product.salePrice! / product.price) * 100)
    : 0;
  const maxQty = Math.max(product.stockQuantity, 1);

  // Build gallery with 4 slots for thumbnail row visual completeness
  const baseImages =
    product.images.length > 0
      ? product.images
      : ["/assets/images/placeholder.svg"];
  const galleryImages: string[] =
    baseImages.length >= 2
      ? baseImages
      : [
          baseImages[0],
          "/assets/generated/product-detail-hero.dim_600x600.jpg",
          baseImages[0],
          "/assets/generated/product-detail-hero.dim_600x600.jpg",
        ];

  const relatedProducts = (related ?? [])
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  function handleAddToCart() {
    addToCart(product!, quantity);
    toast.success(`${product!.title} added to cart!`, { duration: 3000 });
  }

  function handleBuyNow() {
    addToCart(product!, quantity);
    navigate({ to: "/cart" });
  }

  function decQty() {
    setQuantity((q) => Math.max(1, q - 1));
  }

  function incQty() {
    setQuantity((q) => Math.min(maxQty, q + 1));
  }

  function handleQtyInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number.parseInt(e.target.value, 10);
    if (!Number.isNaN(val)) {
      setQuantity(Math.min(Math.max(1, val), maxQty));
    }
  }

  return (
    <div className="bg-background min-h-screen" data-ocid="product.page">
      {/* Breadcrumb */}
      <div className="bg-muted/40 border-b border-border">
        <nav
          className="max-w-6xl mx-auto px-4 py-2.5 flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap"
          aria-label="Breadcrumb"
        >
          <Link
            to="/"
            className="hover:text-accent transition-colors duration-200"
          >
            Home
          </Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" />
          <Link
            to="/products"
            className="hover:text-accent transition-colors duration-200"
          >
            Products
          </Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" />
          <span className="text-foreground font-medium truncate max-w-xs">
            {product.title}
          </span>
        </nav>
      </div>

      {/* Main Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Image Gallery */}
          <div className="space-y-3" data-ocid="product.gallery">
            <div className="relative aspect-square rounded-xl overflow-hidden border border-border bg-muted/20 shadow-subtle">
              <img
                src={
                  galleryImages[activeImage] ?? "/assets/images/placeholder.svg"
                }
                alt={product.title}
                className="w-full h-full object-cover transition-smooth"
              />
              {isOnSale && (
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground text-sm font-bold px-2.5 py-1">
                  -{discountPct}% OFF
                </Badge>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {galleryImages.map((img, i) => {
                const thumbKey = THUMB_KEYS[i] ?? `thumb-${i}`;
                return (
                  <button
                    key={thumbKey}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    data-ocid={`product.thumbnail.${i + 1}`}
                    aria-label={`View image ${i + 1}`}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      activeImage === i
                        ? "border-accent shadow-md"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} view ${i + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-5" data-ocid="product.info">
            {/* Brand & SKU */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-semibold text-accent">{product.brand}</span>
              <span>&middot;</span>
              <span>SKU: {product.sku}</span>
            </div>

            {/* Title */}
            <h1
              className="font-display text-3xl lg:text-4xl font-bold text-foreground leading-tight"
              data-ocid="product.title"
            >
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <StarRating
                rating={product.rating}
                reviewCount={product.reviewCount}
                showCount
                size="md"
              />
              <span className="text-sm text-accent font-bold">
                {product.rating.toFixed(1)} &#9733;
              </span>
            </div>

            {/* Price */}
            <div
              className="flex items-baseline gap-3 flex-wrap"
              data-ocid="product.price"
            >
              {isOnSale ? (
                <>
                  <span className="text-4xl font-bold text-accent">
                    {formatPrice(displayPrice)}
                  </span>
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                  <Badge className="bg-accent/10 text-accent border border-accent/30 font-semibold">
                    Save {discountPct}%
                  </Badge>
                </>
              ) : (
                <span className="text-4xl font-bold text-foreground">
                  {formatPrice(displayPrice)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div data-ocid="product.stock_status">
              <StockBadge qty={product.stockQuantity} />
            </div>

            {/* Seller */}
            <p className="text-sm text-muted-foreground">
              Sold by:{" "}
              <span className="font-medium text-foreground">
                {product.sellerName}
              </span>
            </p>

            {/* Quantity Selector */}
            {product.stockQuantity > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Qty:
                </span>
                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={decQty}
                    disabled={quantity <= 1}
                    data-ocid="product.qty_dec_button"
                    aria-label="Decrease quantity"
                    className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQtyInput}
                    min={1}
                    max={maxQty}
                    data-ocid="product.qty_input"
                    aria-label="Quantity"
                    className="w-14 h-10 text-center text-sm font-semibold border-x border-border bg-background focus:outline-none focus:ring-1 focus:ring-accent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    type="button"
                    onClick={incQty}
                    disabled={quantity >= maxQty}
                    data-ocid="product.qty_inc_button"
                    aria-label="Increase quantity"
                    className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-muted-foreground">
                  {product.stockQuantity} available
                </span>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 pt-1">
              <Button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stockQuantity === 0}
                data-ocid="product.add_to_cart_button"
                className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground text-base font-semibold transition-colors duration-200 shadow-subtle"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                type="button"
                onClick={handleBuyNow}
                disabled={product.stockQuantity === 0}
                variant="outline"
                data-ocid="product.buy_now_button"
                className="w-full h-12 border-foreground text-foreground hover:bg-foreground hover:text-background text-base font-semibold transition-colors duration-200"
              >
                <Zap className="w-5 h-5 mr-2" />
                Buy Now
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { Icon: Truck, label: "Free Shipping", sub: "Orders $49+" },
                {
                  Icon: RotateCcw,
                  label: "Easy Returns",
                  sub: "30-day policy",
                },
                { Icon: Shield, label: "Secure Pay", sub: "100% protected" },
              ].map(({ Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center p-2.5 rounded-lg bg-muted/30"
                >
                  <Icon className="w-5 h-5 text-accent mb-1" />
                  <span className="text-xs font-medium text-foreground">
                    {label}
                  </span>
                  <span className="text-xs text-muted-foreground">{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div
          className="mt-12 border-t border-border pt-8"
          data-ocid="product.description_section"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Product Description
          </h2>
          <div className="bg-card rounded-xl border border-border p-6">
            <p className="text-foreground leading-relaxed text-base">
              {product.description}
            </p>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Brand", value: product.brand },
                { label: "Category", value: product.category },
                { label: "Seller", value: product.sellerName },
                { label: "SKU", value: product.sku },
              ].map(({ label, value }) => (
                <div key={label} className="bg-muted/40 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
                    {label}
                  </p>
                  <p className="text-sm font-semibold text-foreground truncate">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12" data-ocid="product.related_section">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Related Products
              </h2>
              <Link
                to="/products"
                className="text-sm text-accent font-medium hover:underline transition-colors"
                data-ocid="product.view_all_link"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p, i) => (
                <ProductCard
                  key={RELATED_KEYS[i] ?? p.id}
                  product={p}
                  index={i}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
