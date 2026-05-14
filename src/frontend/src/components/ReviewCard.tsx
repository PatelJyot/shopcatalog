import StarRating from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToggleHelpfulVote } from "@/hooks/useReviews";
import type { Review } from "@/types/review";
import { ChevronDown, ChevronUp, ThumbsDown, ThumbsUp, X } from "lucide-react";
import { useState } from "react";

function maskName(userId: string): string {
  if (!userId) return "A***";
  const first = userId.charAt(0).toUpperCase();
  return `${first}***`;
}

function timeAgo(ts: bigint): string {
  const ms = Number(ts);
  const now = Date.now();
  const diff = now - ms;
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months === 1) return "1 month ago";
  if (months < 12) return `${months} months ago`;
  const years = Math.floor(months / 12);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}

const MAX_BODY = 300;
const MAX_THUMBS = 3;

interface ReviewCardProps {
  review: Review;
  currentUserId?: string;
}

export default function ReviewCard({ review, currentUserId }: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const { mutate: toggleVote, isPending } = useToggleHelpfulVote();

  const isLong = review.body.length > MAX_BODY;
  const displayBody =
    isLong && !expanded ? `${review.body.slice(0, MAX_BODY)}…` : review.body;

  const thumbImages = review.images.slice(0, MAX_THUMBS);

  const myVote = currentUserId
    ? review.helpfulVotes.find((v) => v.userId === currentUserId)
    : undefined;

  function handleVote(isHelpful: boolean) {
    toggleVote({ reviewId: review.id, productId: review.productId, isHelpful });
  }

  return (
    <div
      className="bg-card border border-border rounded-xl p-5 space-y-3"
      data-ocid="reviews.card"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm font-bold text-accent flex-shrink-0">
            {review.userId.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {maskName(review.userId)}
            </p>
            <p className="text-xs text-muted-foreground">
              {timeAgo(review.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {review.verifiedPurchase && (
            <Badge
              className="bg-accent text-accent-foreground text-[10px] font-semibold px-2 py-0.5 border-0"
              data-ocid="reviews.verified_badge"
            >
              ✓ Verified Purchase
            </Badge>
          )}
        </div>
      </div>

      {/* Star rating */}
      <div>
        <StarRating rating={review.rating} showCount={false} size="sm" />
      </div>

      {/* Title */}
      <h4 className="text-sm font-bold text-foreground">{review.title}</h4>

      {/* Body */}
      <div>
        <p className="text-sm text-foreground/80 leading-relaxed">
          {displayBody}
        </p>
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="mt-1 text-xs text-accent font-medium hover:underline flex items-center gap-0.5 transition-colors"
            data-ocid="reviews.read_more_button"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-3 h-3" />
                Show less
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3" />
                Read more
              </>
            )}
          </button>
        )}
      </div>

      {/* Thumbnail images */}
      {thumbImages.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {thumbImages.map((img, idx) => (
            <button
              key={`review-img-${review.id}-${idx}`}
              type="button"
              onClick={() => setLightboxImg(img)}
              className="w-16 h-16 rounded-lg overflow-hidden border border-border hover:border-accent transition-colors flex-shrink-0"
              aria-label={`View image ${idx + 1}`}
              data-ocid={`reviews.image.${idx + 1}`}
            >
              <img
                src={img}
                alt={`Review ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
          {review.images.length > MAX_THUMBS && (
            <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground font-medium border border-border">
              +{review.images.length - MAX_THUMBS}
            </div>
          )}
        </div>
      )}

      {/* Helpful row */}
      <div
        className="flex items-center gap-3 pt-1 border-t border-border"
        data-ocid="reviews.helpful_row"
      >
        <span className="text-xs text-muted-foreground">
          Helpful? ({review.helpfulCount})
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleVote(true)}
          disabled={isPending}
          data-ocid="reviews.helpful_yes_button"
          className={`h-7 px-2 text-xs gap-1 ${
            myVote?.isHelpful === true
              ? "text-accent font-semibold"
              : "text-muted-foreground"
          }`}
        >
          <ThumbsUp className="w-3 h-3" />
          Yes
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleVote(false)}
          disabled={isPending}
          data-ocid="reviews.helpful_no_button"
          className={`h-7 px-2 text-xs gap-1 ${
            myVote?.isHelpful === false
              ? "text-destructive font-semibold"
              : "text-muted-foreground"
          }`}
        >
          <ThumbsDown className="w-3 h-3" />
          No
        </Button>
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <dialog
          open
          className="fixed inset-0 z-50 bg-foreground/80 flex items-center justify-center p-4 border-0 max-w-none w-full h-full m-0 p-4"
          data-ocid="reviews.lightbox"
          aria-label="Review image"
          onKeyDown={(e) => {
            if (e.key === "Escape") setLightboxImg(null);
          }}
        >
          <div
            className="relative max-w-2xl w-full"
            onClick={() => setLightboxImg(null)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setLightboxImg(null);
            }}
            role="presentation"
          >
            <img
              src={lightboxImg}
              alt="Review detail"
              className="w-full rounded-xl"
            />
            <button
              type="button"
              onClick={() => setLightboxImg(null)}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/90 flex items-center justify-center hover:bg-background transition-colors"
              aria-label="Close image"
              data-ocid="reviews.lightbox_close_button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
}
