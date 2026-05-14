import StarRating from "@/components/StarRating";
import { Skeleton } from "@/components/ui/skeleton";
import type { RatingDistribution } from "@/types/review";

interface RatingBreakdownProps {
  distribution: RatingDistribution | undefined;
  isLoading: boolean;
  average: number;
  totalReviews: number;
  activeStar: number | null;
  onFilterByStar: (star: number | null) => void;
}

export default function RatingBreakdown({
  distribution,
  isLoading,
  average,
  totalReviews,
  activeStar,
  onFilterByStar,
}: RatingBreakdownProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <Skeleton className="h-24 w-32 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-2 w-full">
          {[5, 4, 3, 2, 1].map((s) => (
            <Skeleton key={`skel-star-${s}`} className="h-5 w-full rounded" />
          ))}
        </div>
      </div>
    );
  }

  const dist = distribution ?? {
    star5: 0,
    star4: 0,
    star3: 0,
    star2: 0,
    star1: 0,
  };
  const total = totalReviews > 0 ? totalReviews : 1;

  const rows: Array<{ star: number; count: number }> = [
    { star: 5, count: dist.star5 },
    { star: 4, count: dist.star4 },
    { star: 3, count: dist.star3 },
    { star: 2, count: dist.star2 },
    { star: 1, count: dist.star1 },
  ];

  function handleClick(star: number) {
    onFilterByStar(activeStar === star ? null : star);
  }

  return (
    <div
      className="flex flex-col sm:flex-row gap-6 items-center sm:items-start"
      data-ocid="reviews.rating_breakdown"
    >
      {/* Average display */}
      <div className="flex flex-col items-center gap-1 flex-shrink-0 w-32">
        <span className="font-display text-5xl font-bold text-foreground">
          {totalReviews > 0 ? average.toFixed(1) : "–"}
        </span>
        <span className="text-sm text-muted-foreground">out of 5</span>
        <StarRating
          rating={totalReviews > 0 ? average : 0}
          showCount={false}
          size="md"
        />
        <span className="text-xs text-muted-foreground mt-0.5">
          {totalReviews.toLocaleString()} review{totalReviews !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Bars */}
      <div className="flex-1 w-full space-y-1.5">
        {rows.map(({ star, count }) => {
          const pct = totalReviews > 0 ? Math.round((count / total) * 100) : 0;
          const isActive = activeStar === star;
          return (
            <button
              key={`bar-${star}`}
              type="button"
              onClick={() => handleClick(star)}
              data-ocid={`reviews.star_filter.${star}`}
              aria-label={`Filter by ${star} star${star !== 1 ? "s" : ""}`}
              aria-pressed={isActive}
              className={`w-full flex items-center gap-2 group rounded-lg px-1.5 py-0.5 transition-colors duration-150 ${
                isActive ? "bg-accent/10" : "hover:bg-muted/50"
              }`}
            >
              <span className="text-xs font-medium text-muted-foreground w-8 text-right flex-shrink-0">
                {star}★
              </span>
              <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: "var(--accent)",
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground w-12 text-right flex-shrink-0">
                {count} ({pct}%)
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
