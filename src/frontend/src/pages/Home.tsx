import ProductCard from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeals, useFeaturedProducts } from "@/hooks/useProducts";
import { CATEGORIES } from "@/types/product";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronRight,
  Flame,
  Headphones,
  Home,
  Laptop,
  RotateCcw,
  ShieldCheck,
  Shirt,
  ShoppingBasket,
  Truck,
} from "lucide-react";

const CATEGORY_CONFIG = [
  { name: "Electronics" as const, Icon: Laptop, emoji: "💻" },
  { name: "Fashion" as const, Icon: Shirt, emoji: "👕" },
  { name: "Grocery" as const, Icon: ShoppingBasket, emoji: "🛒" },
  { name: "Books" as const, Icon: BookOpen, emoji: "📚" },
  { name: "Home" as const, Icon: Home, emoji: "🏠" },
];

const TRUST_BADGES = [
  { Icon: Truck, label: "Free Shipping", sub: "On orders over $49" },
  { Icon: ShieldCheck, label: "Secure Payment", sub: "256-bit SSL encrypted" },
  { Icon: RotateCcw, label: "Easy Returns", sub: "30-day hassle-free" },
  { Icon: Headphones, label: "24/7 Support", sub: "Always here to help" },
];

const TRUST_IDS = [
  "trust.shipping",
  "trust.payment",
  "trust.returns",
  "trust.support",
];

function ProductSkeleton({ count = 4 }: { count?: number }) {
  const ids = Array.from({ length: count }, (_, i) => `skel-${i}`);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {ids.map((id) => (
        <div key={id} className="flex flex-col gap-2">
          <Skeleton className="aspect-square rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-8 w-full" />
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const { data: featured, isLoading: featuredLoading } = useFeaturedProducts();
  const { data: deals, isLoading: dealsLoading } = useDeals();

  return (
    <div data-ocid="home.page">
      {/* ── Hero Banner ────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #FF9900 0%, #FFC300 40%, #FFE066 100%)",
        }}
        data-ocid="home.hero_section"
      >
        {/* Decorative circles */}
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4">
          <div className="relative flex flex-col md:flex-row items-center gap-8 py-12 md:py-16">
            {/* Text */}
            <div className="flex-1 z-10 text-center md:text-left">
              <Badge className="bg-white/25 text-white border-0 mb-4 text-xs font-semibold tracking-wide uppercase">
                New Arrivals · Summer 2026
              </Badge>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
                Shop Everything,
                <br />
                <span className="text-white drop-shadow-sm">
                  Delivered Fast
                </span>
              </h1>
              <p className="text-white/85 text-base md:text-lg mb-8 max-w-md">
                Millions of products, unbeatable prices, and lightning-fast
                delivery — right to your door.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Button
                  asChild
                  className="bg-white text-amber-600 hover:bg-white/90 font-bold px-8 h-12 text-base shadow-md transition-colors duration-200"
                  data-ocid="home.hero_shop_button"
                >
                  <Link to="/products">Shop Now</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/60 text-white hover:bg-white/15 bg-transparent font-semibold h-12 px-6"
                  data-ocid="home.hero_deals_button"
                >
                  <Link to="/products">View Deals</Link>
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="flex-1 flex items-center justify-center">
              <img
                src="/assets/generated/hero-products.dim_800x500.jpg"
                alt="Shop Everything, Delivered Fast"
                className="w-full max-w-md rounded-2xl object-cover shadow-2xl"
                width={800}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Badges ───────────────────────────────────────────── */}
      <section
        className="bg-card border-b border-border py-5"
        data-ocid="home.trust_section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRUST_BADGES.map(({ Icon, label, sub }, i) => (
              <div
                key={TRUST_IDS[i]}
                data-ocid={TRUST_IDS[i]}
                className="flex items-center gap-3 p-3"
              >
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4.5 h-4.5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground leading-tight">
                    {label}
                  </p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories Row ─────────────────────────────────────────── */}
      <section
        className="bg-background py-8"
        data-ocid="home.categories_section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display text-xl font-bold text-foreground mb-5">
            Shop by Category
          </h2>
          <div className="grid grid-cols-5 gap-3">
            {CATEGORY_CONFIG.map(({ name, emoji }) => (
              <Link
                key={name}
                to="/products"
                search={{ category: name }}
                className="flex flex-col items-center gap-2.5 p-4 rounded-xl border border-border bg-card hover:border-accent hover:shadow-md transition-all duration-200 cursor-pointer"
                data-ocid={`home.category_${name.toLowerCase()}_link`}
              >
                <span className="text-3xl leading-none">{emoji}</span>
                <span className="text-xs font-semibold text-foreground text-center">
                  {name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ──────────────────────────────────────── */}
      <section className="py-10 bg-muted/30" data-ocid="home.featured_section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Featured Products
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Hand-picked top deals just for you
              </p>
            </div>
            <Link
              to="/products"
              search={{ featured: "true" }}
              className="flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
              data-ocid="home.featured_see_all_link"
            >
              See all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {featuredLoading ? (
            <ProductSkeleton count={4} />
          ) : featured && featured.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featured.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div
              className="text-center py-12 text-muted-foreground"
              data-ocid="home.featured_empty_state"
            >
              No featured products available.
            </div>
          )}
        </div>
      </section>

      {/* ── Deals of the Day ───────────────────────────────────────── */}
      <section className="py-10 bg-background" data-ocid="home.deals_section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <Flame className="w-4 h-4 text-accent" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground leading-none">
                  Deals of the Day
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Limited time offers
                </p>
              </div>
            </div>
            <Link
              to="/products"
              search={{ deals: "true" }}
              className="flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
              data-ocid="home.deals_see_all_link"
            >
              See all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {dealsLoading ? (
            <ProductSkeleton count={4} />
          ) : deals && deals.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {deals.slice(0, 8).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div
              className="text-center py-12 text-muted-foreground"
              data-ocid="home.deals_empty_state"
            >
              No deals available at the moment.
            </div>
          )}
        </div>
      </section>

      {/* ── Promo Banner ───────────────────────────────────────────── */}
      <section
        className="py-10 bg-card border-t border-border"
        data-ocid="home.promo_section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{
              background: "linear-gradient(135deg, #FF9900 0%, #FFC300 100%)",
            }}
          >
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                Free Shipping on Orders Over $49
              </h3>
              <p className="text-white/85 text-sm md:text-base">
                Millions of items eligible for fast, free delivery — no
                membership needed.
              </p>
            </div>
            <Button
              asChild
              className="bg-white text-amber-600 hover:bg-white/90 font-bold px-8 h-11 text-base flex-shrink-0 shadow-md"
              data-ocid="home.promo_cta_button"
            >
              <Link to="/products">Browse All Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
