import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  showCount?: boolean;
  size?: "sm" | "md" | "lg";
}

const SIZE_MAP = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

export default function StarRating({
  rating,
  reviewCount,
  showCount = true,
  size = "sm",
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const totalStars = 5;
  const iconClass = SIZE_MAP[size];

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: totalStars }).map((_, i) => {
          const key = `star-${i}`;
          if (i < fullStars) {
            return (
              <Star
                key={key}
                className={`${iconClass} fill-accent text-accent`}
              />
            );
          }
          if (i === fullStars && hasHalf) {
            return (
              <StarHalf
                key={key}
                className={`${iconClass} fill-accent text-accent`}
              />
            );
          }
          return (
            <Star
              key={key}
              className={`${iconClass} fill-muted text-muted-foreground`}
            />
          );
        })}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className="text-xs text-muted-foreground">
          ({reviewCount.toLocaleString()} Reviews)
        </span>
      )}
    </div>
  );
}
