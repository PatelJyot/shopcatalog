import StarRating from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types/product";
import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  index?: number;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const isOnSale =
    product.salePrice !== null && product.salePrice < product.price;
  const displayPrice = isOnSale ? product.salePrice! : product.price;
  const discountPct = isOnSale
    ? Math.round((1 - product.salePrice! / product.price) * 100)
    : 0;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.title} added to cart!`, { duration: 3000 });
  }

  return (
    <Card
      className="group overflow-hidden border border-border bg-card hover:shadow-md transition-shadow duration-200 flex flex-col"
      data-ocid={`product.item.${index + 1}`}
    >
      <Link to="/product/$id" params={{ id: product.id }} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted/30">
          <img
            src={product.images[0] ?? "/assets/images/placeholder.svg"}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {isOnSale && (
            <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-bold">
              -{discountPct}%
            </Badge>
          )}
          {product.stockQuantity < 5 && product.stockQuantity > 0 && (
            <Badge
              variant="outline"
              className="absolute top-2 right-2 bg-card text-xs border-destructive text-destructive"
            >
              Only {product.stockQuantity} left
            </Badge>
          )}
        </div>
      </Link>

      <div className="p-3 flex flex-col gap-2 flex-1">
        <Link to="/product/$id" params={{ id: product.id }}>
          <h3
            className="text-sm font-medium text-foreground line-clamp-2 leading-snug hover:text-accent transition-colors duration-200"
            data-ocid={`product.title.${index + 1}`}
          >
            {product.title}
          </h3>
        </Link>

        <StarRating
          rating={product.rating}
          reviewCount={product.reviewCount}
          showCount
          size="sm"
        />

        <div className="flex items-baseline gap-2">
          <span
            className="text-base font-bold text-accent"
            data-ocid={`product.price.${index + 1}`}
          >
            {formatPrice(displayPrice)}
          </span>
          {isOnSale && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        <div className="mt-auto">
          <Button
            type="button"
            onClick={handleAddToCart}
            className="w-full h-9 bg-accent hover:bg-accent/90 text-accent-foreground text-sm font-medium transition-colors duration-200"
            data-ocid={`product.add_button.${index + 1}`}
          >
            <ShoppingCart className="w-4 h-4 mr-1.5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
}
