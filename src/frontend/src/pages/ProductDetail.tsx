import { createActor } from "@/backend";
import ProductCard from "@/components/ProductCard";
import RatingBreakdown from "@/components/RatingBreakdown";
import ReviewCard from "@/components/ReviewCard";
import StarRating from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/hooks/useCart";
import { useProduct, useProductsByCategory } from "@/hooks/useProducts";
import {
  useCreateReview,
  useProductReviews,
  useRatingDistribution,
} from "@/hooks/useReviews";
import type { CreateReviewRequest } from "@/types/review";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ChevronRight,
  Loader2,
  Minus,
  Package,
  PenLine,
  Plus,
  RotateCcw,
  Shield,
  ShoppingCart,
  Star,
  Truck,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
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

const SORT_OPTIONS = [
  { value: "recent", label: "Most Recent" },
  { value: "helpful", label: "Most Helpful" },
];

type SortOption = "recent" | "helpful";

interface StarPickerProps {
  value: number;
  onChange: (v: number) => void;
}

function StarPicker({ value, onChange }: StarPickerProps) {
  const [hovered, setHovered] = useState(0);
  return (
    <fieldset className="flex gap-1 border-0 p-0 m-0">
      <legend className="sr-only">Select star rating</legend>
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={`pick-${s}`}
          type="button"
          aria-label={`${s} star${s !== 1 ? "s" : ""}`}
          aria-pressed={value === s}
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(s)}
          className="cursor-pointer p-0.5 transition-transform hover:scale-110"
        >
          <Star
            className={`w-7 h-7 transition-colors duration-100 ${
              (hovered || value) >= s
                ? "fill-accent text-accent"
                : "fill-muted text-muted-foreground"
            }`}
          />
        </button>
      ))}
    </fieldset>
  );
}

function useUserOrders(
  productId: string,
  actor: {
    getUserOrders: () => Promise<
      Array<{ items: Array<{ productId: bigint }> }>
    >;
  } | null,
) {
  const [hasOrdered, setHasOrdered] = useState<boolean>(false);
  useEffect(() => {
    if (!actor) return;
    actor
      .getUserOrders()
      .then((orders) => {
        const found = orders.some((o) =>
          o.items.some((item) => String(item.productId) === productId),
        );
        setHasOrdered(found);
      })
      .catch(() => {});
  }, [actor, productId]);
  return hasOrdered;
}

export default function ProductDetail() {
  const { id } = useParams({ from: "/product/$id" });
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useProduct(id);
  const { data: related } = useProductsByCategory(product?.category ?? "");
  const { addToCart } = useCart();
  const { identity, isAuthenticated } = useInternetIdentity();
  const currentUserId = identity
    ? identity.getPrincipal().toString()
    : undefined;

  // Review state
  const { data: reviews, isLoading: reviewsLoading } = useProductReviews(id);
  const { data: distribution, isLoading: distLoading } =
    useRatingDistribution(id);
  const { mutate: createReview, isPending: submitting } = useCreateReview();
  const { actor } = useActor(createActor);
  const hasOrdered = useUserOrders(id, actor ?? null);

  const [activeStar, setActiveStar] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [reviewError, setReviewError] = useState("");
  const reviewsRef = useRef<HTMLDivElement>(null);

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Reset gallery and quantity when navigating to a different product
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional reset on id change
  useEffect(() => {
    setActiveImage(0);
    setQuantity(1);
    setActiveStar(null);
    setShowReviewForm(false);
  }, [id]);

  // Derived reviews
  const filteredReviews = (reviews ?? [])
    .filter((r) => (activeStar === null ? true : r.rating === activeStar))
    .sort((a, b) => {
      if (sortBy === "helpful") return b.helpfulCount - a.helpfulCount;
      return Number(b.createdAt) - Number(a.createdAt);
    });

  const totalReviews = reviews?.length ?? 0;
  const avgRating =
    totalReviews > 0
      ? (reviews ?? []).reduce((s, r) => s + r.rating, 0) / totalReviews
      : 0;

  function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault();
    if (reviewRating === 0) {
      setReviewError("Please select a star rating");
      return;
    }
    if (!reviewTitle.trim()) {
      setReviewError("Please add a title");
      return;
    }
    if (!reviewBody.trim()) {
      setReviewError("Please write your review");
      return;
    }
    setReviewError("");
    const req: CreateReviewRequest = {
      productId: id,
      rating: reviewRating,
      title: reviewTitle.trim(),
      body: reviewBody.trim(),
      images: [],
    };
    createReview(req, {
      onSuccess: () => {
        setShowReviewForm(false);
        setReviewRating(5);
        setReviewTitle("");
        setReviewBody("");
      },
      onError: () => setReviewError("Failed to submit. Please try again."),
    });
  }

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

        {/* Reviews Section */}
        <div
          className="mt-12 border-t border-border pt-8"
          ref={reviewsRef}
          data-ocid="reviews.section"
        >
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Customer Reviews
            </h2>
            {isAuthenticated && hasOrdered && (
              <Button
                type="button"
                onClick={() => setShowReviewForm((v) => !v)}
                data-ocid="reviews.write_review_button"
                className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 font-semibold"
              >
                <PenLine className="w-4 h-4" />
                {showReviewForm ? "Cancel" : "Write a Review"}
              </Button>
            )}
          </div>

          {/* Rating breakdown */}
          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <RatingBreakdown
              distribution={distribution}
              isLoading={distLoading}
              average={avgRating}
              totalReviews={totalReviews}
              activeStar={activeStar}
              onFilterByStar={setActiveStar}
            />
          </div>

          {/* Review submission form */}
          {showReviewForm && (
            <div
              className="bg-card border border-border rounded-xl p-6 mb-6"
              data-ocid="reviews.form"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-bold text-foreground">
                  Write Your Review
                </h3>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                  aria-label="Close review form"
                  data-ocid="reviews.form_close_button"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">
                    Your Rating *
                  </p>
                  <StarPicker value={reviewRating} onChange={setReviewRating} />
                </div>
                <div>
                  <label
                    htmlFor="review-title"
                    className="text-sm font-medium text-foreground"
                  >
                    Review Title *
                  </label>
                  <input
                    id="review-title"
                    type="text"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="Summarise your experience"
                    maxLength={120}
                    data-ocid="reviews.title_input"
                    className="mt-1.5 w-full h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label
                    htmlFor="review-body"
                    className="text-sm font-medium text-foreground"
                  >
                    Your Review *
                  </label>
                  <textarea
                    id="review-body"
                    value={reviewBody}
                    onChange={(e) => setReviewBody(e.target.value)}
                    placeholder="Share details about your experience"
                    rows={4}
                    maxLength={2000}
                    data-ocid="reviews.body_textarea"
                    className="mt-1.5 w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>
                {reviewError && (
                  <p
                    className="text-sm text-destructive font-medium"
                    data-ocid="reviews.form_error_state"
                  >
                    {reviewError}
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={submitting}
                  data-ocid="reviews.submit_button"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold gap-2"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {submitting ? "Submitting…" : "Submit Review"}
                </Button>
              </form>
            </div>
          )}

          {/* Filter + sort bar */}
          {totalReviews > 0 && (
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => setActiveStar(null)}
                  data-ocid="reviews.filter.all"
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors duration-150 ${
                    activeStar === null
                      ? "bg-accent text-accent-foreground border-accent"
                      : "border-border text-muted-foreground hover:border-accent/50"
                  }`}
                >
                  All
                </button>
                {[5, 4, 3, 2, 1].map((s) => (
                  <button
                    key={`filter-tab-${s}`}
                    type="button"
                    onClick={() => setActiveStar(activeStar === s ? null : s)}
                    data-ocid={`reviews.filter.${s}star`}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors duration-150 ${
                      activeStar === s
                        ? "bg-accent text-accent-foreground border-accent"
                        : "border-border text-muted-foreground hover:border-accent/50"
                    }`}
                  >
                    {s}★
                  </button>
                ))}
              </div>
              <div className="ml-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  data-ocid="reviews.sort_select"
                  aria-label="Sort reviews"
                  className="h-8 pl-3 pr-7 text-xs rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Review list */}
          {reviewsLoading ? (
            <div className="space-y-4" data-ocid="reviews.loading_state">
              {[1, 2, 3].map((k) => (
                <div
                  key={`review-skel-${k}`}
                  className="bg-card border border-border rounded-xl p-5 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
                    <div className="space-y-1 flex-1">
                      <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                      <div className="h-2.5 w-16 bg-muted rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="h-4 w-40 bg-muted rounded animate-pulse" />
                  <div className="space-y-1.5">
                    <div className="h-3 w-full bg-muted rounded animate-pulse" />
                    <div className="h-3 w-4/5 bg-muted rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredReviews.length === 0 ? (
            <div
              className="text-center py-16 bg-card border border-border rounded-xl"
              data-ocid="reviews.empty_state"
            >
              <Star className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-foreground font-semibold text-lg mb-1">
                {activeStar
                  ? `No ${activeStar}★ reviews yet`
                  : "No reviews yet"}
              </p>
              <p className="text-muted-foreground text-sm">
                {isAuthenticated && hasOrdered
                  ? "Be the first to review this product!"
                  : "Purchase this product to leave a review."}
              </p>
            </div>
          ) : (
            <div className="space-y-4" data-ocid="reviews.list">
              {filteredReviews.map((review, idx) => (
                <ReviewCard
                  key={`review-${review.id}-${idx}`}
                  review={review}
                  currentUserId={currentUserId}
                />
              ))}
            </div>
          )}
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
