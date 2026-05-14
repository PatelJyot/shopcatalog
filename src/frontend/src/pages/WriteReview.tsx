import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProduct } from "@/hooks/useProducts";
import { useCreateReview } from "@/hooks/useReviews";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ImagePlus, Loader2, Star, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const STAR_LABELS = ["", "Terrible", "Poor", "Average", "Good", "Very good"];
const MAX_TITLE = 100;
const MAX_BODY = 2000;
const MAX_IMAGES = 5;

interface ImagePreview {
  dataUrl: string;
  name: string;
}

export default function WriteReview() {
  const { id } = useParams({ from: "/product/$id/review" });
  const navigate = useNavigate();
  const { data: product, isLoading: productLoading } = useProduct(id);
  const createReview = useCreateReview();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [errors, setErrors] = useState<{ rating?: string; title?: string }>({
    rating: undefined,
    title: undefined,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  function validate(): boolean {
    const newErrors: { rating?: string; title?: string } = {};
    if (rating === 0) newErrors.rating = "Please select a star rating.";
    if (!title.trim()) newErrors.title = "Please add a review headline.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleImageFiles(files: FileList | null) {
    if (!files) return;
    const remaining = MAX_IMAGES - images.length;
    const toProcess = Array.from(files).slice(0, remaining);
    const previews = await Promise.all(
      toProcess.map(
        (file) =>
          new Promise<ImagePreview>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) =>
              resolve({ dataUrl: e.target?.result as string, name: file.name });
            reader.readAsDataURL(file);
          }),
      ),
    );
    setImages((prev) => [...prev, ...previews]);
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    try {
      await createReview.mutateAsync({
        productId: id,
        rating,
        title: title.trim(),
        body: body.trim(),
        images: images.map((img) => img.dataUrl),
      });
      toast.success("Your review has been submitted!");
      navigate({ to: "/product/$id", params: { id } });
    } catch {
      toast.error("Failed to submit review. Please try again.");
    }
  }

  const activeStars = hovered || rating;

  return (
    <div
      data-ocid="write-review.page"
      className="min-h-screen bg-background py-8"
    >
      <div className="max-w-2xl mx-auto px-4">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Create Review</h1>
          {productLoading ? (
            <div className="mt-2 h-4 w-48 bg-muted rounded animate-pulse" />
          ) : product ? (
            <p className="mt-1 text-muted-foreground text-sm line-clamp-1">
              {product.title}
            </p>
          ) : null}
        </div>

        <div className="bg-card border border-border rounded-lg shadow-subtle p-6 space-y-7">
          <form onSubmit={handleSubmit} className="space-y-7" noValidate>
            {/* ── 1. Star selector ───────────────────────── */}
            <fieldset>
              <legend className="text-base font-semibold text-foreground mb-3">
                Overall rating
              </legend>
              <div className="flex items-center gap-1" aria-label="Star rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    data-ocid={`write-review.star.${star}`}
                    aria-label={`${star} star${star > 1 ? "s" : ""}: ${STAR_LABELS[star]}`}
                    aria-pressed={rating === star}
                    className="p-0.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-transform hover:scale-110"
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => {
                      setRating(star);
                      setErrors((prev) => ({ ...prev, rating: undefined }));
                    }}
                  >
                    <Star
                      className="w-9 h-9 transition-colors duration-150"
                      fill={activeStars >= star ? "#FF9900" : "none"}
                      stroke={activeStars >= star ? "#FF9900" : "currentColor"}
                    />
                  </button>
                ))}
              </div>
              {/* Star label */}
              <div className="mt-2 h-5">
                {activeStars > 0 && (
                  <span
                    className="text-sm font-medium"
                    style={{ color: "oklch(var(--accent))" }}
                  >
                    {STAR_LABELS[activeStars]}
                  </span>
                )}
              </div>
              {errors.rating && (
                <p
                  data-ocid="write-review.rating.field_error"
                  className="mt-1 text-sm text-destructive"
                >
                  {errors.rating}
                </p>
              )}
            </fieldset>

            {/* ── 2. Review headline ─────────────────────── */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="review-title"
                  className="text-base font-semibold"
                >
                  Add a headline
                </Label>
                <span className="text-xs text-muted-foreground">
                  {title.length}/{MAX_TITLE}
                </span>
              </div>
              <Input
                id="review-title"
                data-ocid="write-review.title.input"
                placeholder="What's most important to know?"
                value={title}
                maxLength={MAX_TITLE}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (e.target.value.trim())
                    setErrors((prev) => ({ ...prev, title: undefined }));
                }}
                onBlur={() => {
                  if (!title.trim())
                    setErrors((prev) => ({
                      ...prev,
                      title: "Please add a review headline.",
                    }));
                }}
                className="bg-background"
                aria-describedby={errors.title ? "title-error" : undefined}
              />
              {errors.title && (
                <p
                  id="title-error"
                  data-ocid="write-review.title.field_error"
                  className="text-sm text-destructive"
                >
                  {errors.title}
                </p>
              )}
            </div>

            {/* ── 3. Review body ─────────────────────────── */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="review-body"
                  className="text-base font-semibold"
                >
                  Add a written review
                </Label>
                <span className="text-xs text-muted-foreground">
                  {body.length}/{MAX_BODY}
                </span>
              </div>
              <Textarea
                id="review-body"
                data-ocid="write-review.body.textarea"
                placeholder="What did you like or dislike? What did you use this product for?"
                value={body}
                maxLength={MAX_BODY}
                onChange={(e) => setBody(e.target.value)}
                rows={6}
                className="bg-background resize-none"
              />
            </div>

            {/* ── 4. Image upload ────────────────────────── */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-foreground">
                  Add photos
                </span>
                <span className="text-xs text-muted-foreground">
                  {images.length}/{MAX_IMAGES}
                </span>
              </div>

              <div className="flex flex-wrap gap-3 items-start">
                {/* Existing previews */}
                {images.map((img, idx) => (
                  <div
                    key={`${img.name}-${idx}`}
                    className="relative w-20 h-20 rounded-md overflow-hidden border border-border group"
                  >
                    <img
                      src={img.dataUrl}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      data-ocid={`write-review.image.delete_button.${idx + 1}`}
                      aria-label={`Remove image ${idx + 1}`}
                      onClick={() => removeImage(idx)}
                      className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-foreground/80 text-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus-visible:opacity-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                {/* Upload button */}
                {images.length < MAX_IMAGES && (
                  <button
                    type="button"
                    data-ocid="write-review.image.upload_button"
                    aria-label="Upload photo"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-20 h-20 rounded-md border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-accent hover:text-accent transition-colors duration-200"
                  >
                    <ImagePlus className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Add photo</span>
                  </button>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={(e) => handleImageFiles(e.target.files)}
              />
              <p className="text-xs text-muted-foreground">
                JPEG, PNG, GIF up to 10 MB each · max {MAX_IMAGES} photos
              </p>
            </div>

            {/* ── 5. Action buttons ──────────────────────── */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                type="submit"
                data-ocid="write-review.submit_button"
                disabled={createReview.isPending}
                className="sm:w-auto"
              >
                {createReview.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  "Submit review"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                data-ocid="write-review.cancel_button"
                onClick={() => navigate({ to: "/product/$id", params: { id } })}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>

        {/* Guidelines sidebar note */}
        <div className="mt-4 p-4 bg-muted/40 rounded-lg border border-border">
          <h3 className="text-sm font-semibold text-foreground mb-1">
            Review guidelines
          </h3>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li>Share your honest experience with the product.</li>
            <li>Focus on the product itself, not seller or shipping.</li>
            <li>Keep it respectful and free of offensive language.</li>
            <li>Do not include personal information or external links.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
