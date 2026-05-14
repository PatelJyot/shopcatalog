import { c as createLucideIcon, g as useParams, e as useNavigate, h as useProduct, r as reactExports, j as jsxRuntimeExports, I as Input, X, b as Button, n as ue } from "./index-CDI_idwZ.js";
import { L as Label } from "./label-iMFkthOJ.js";
import { T as Textarea } from "./textarea-nE9K9Ohj.js";
import { c as useCreateReview, L as LoaderCircle } from "./useReviews-CTu6EKu5.js";
import { S as Star } from "./star-D95wk3S2.js";
import "./index-MKM3TZ4q.js";
import "./useMutation-BJHgXTJq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 5h6", key: "1vod17" }],
  ["path", { d: "M19 2v6", key: "4bpg5p" }],
  ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5", key: "1ue2ih" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
];
const ImagePlus = createLucideIcon("image-plus", __iconNode);
const STAR_LABELS = ["", "Terrible", "Poor", "Average", "Good", "Very good"];
const MAX_TITLE = 100;
const MAX_BODY = 2e3;
const MAX_IMAGES = 5;
function WriteReview() {
  const { id } = useParams({ from: "/product/$id/review" });
  const navigate = useNavigate();
  const { data: product, isLoading: productLoading } = useProduct(id);
  const createReview = useCreateReview();
  const [rating, setRating] = reactExports.useState(0);
  const [hovered, setHovered] = reactExports.useState(0);
  const [title, setTitle] = reactExports.useState("");
  const [body, setBody] = reactExports.useState("");
  const [images, setImages] = reactExports.useState([]);
  const [errors, setErrors] = reactExports.useState({
    rating: void 0,
    title: void 0
  });
  const fileInputRef = reactExports.useRef(null);
  function validate() {
    const newErrors = {};
    if (rating === 0) newErrors.rating = "Please select a star rating.";
    if (!title.trim()) newErrors.title = "Please add a review headline.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  async function handleImageFiles(files) {
    if (!files) return;
    const remaining = MAX_IMAGES - images.length;
    const toProcess = Array.from(files).slice(0, remaining);
    const previews = await Promise.all(
      toProcess.map(
        (file) => new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            var _a;
            return resolve({ dataUrl: (_a = e.target) == null ? void 0 : _a.result, name: file.name });
          };
          reader.readAsDataURL(file);
        })
      )
    );
    setImages((prev) => [...prev, ...previews]);
  }
  function removeImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    try {
      await createReview.mutateAsync({
        productId: id,
        rating,
        title: title.trim(),
        body: body.trim(),
        images: images.map((img) => img.dataUrl)
      });
      ue.success("Your review has been submitted!");
      navigate({ to: "/product/$id", params: { id } });
    } catch {
      ue.error("Failed to submit review. Please try again.");
    }
  }
  const activeStars = hovered || rating;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-ocid": "write-review.page",
      className: "min-h-screen bg-background py-8",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Create Review" }),
          productLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-4 w-48 bg-muted rounded animate-pulse" }) : product ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground text-sm line-clamp-1", children: product.title }) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-lg shadow-subtle p-6 space-y-7", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-7", noValidate: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "text-base font-semibold text-foreground mb-3", children: "Overall rating" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", "aria-label": "Star rating", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `write-review.star.${star}`,
                "aria-label": `${star} star${star > 1 ? "s" : ""}: ${STAR_LABELS[star]}`,
                "aria-pressed": rating === star,
                className: "p-0.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-transform hover:scale-110",
                onMouseEnter: () => setHovered(star),
                onMouseLeave: () => setHovered(0),
                onClick: () => {
                  setRating(star);
                  setErrors((prev) => ({ ...prev, rating: void 0 }));
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    className: "w-9 h-9 transition-colors duration-150",
                    fill: activeStars >= star ? "#FF9900" : "none",
                    stroke: activeStars >= star ? "#FF9900" : "currentColor"
                  }
                )
              },
              star
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-5", children: activeStars > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-sm font-medium",
                style: { color: "oklch(var(--accent))" },
                children: STAR_LABELS[activeStars]
              }
            ) }),
            errors.rating && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                "data-ocid": "write-review.rating.field_error",
                className: "mt-1 text-sm text-destructive",
                children: errors.rating
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "review-title",
                  className: "text-base font-semibold",
                  children: "Add a headline"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                title.length,
                "/",
                MAX_TITLE
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "review-title",
                "data-ocid": "write-review.title.input",
                placeholder: "What's most important to know?",
                value: title,
                maxLength: MAX_TITLE,
                onChange: (e) => {
                  setTitle(e.target.value);
                  if (e.target.value.trim())
                    setErrors((prev) => ({ ...prev, title: void 0 }));
                },
                onBlur: () => {
                  if (!title.trim())
                    setErrors((prev) => ({
                      ...prev,
                      title: "Please add a review headline."
                    }));
                },
                className: "bg-background",
                "aria-describedby": errors.title ? "title-error" : void 0
              }
            ),
            errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                id: "title-error",
                "data-ocid": "write-review.title.field_error",
                className: "text-sm text-destructive",
                children: errors.title
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "review-body",
                  className: "text-base font-semibold",
                  children: "Add a written review"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                body.length,
                "/",
                MAX_BODY
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "review-body",
                "data-ocid": "write-review.body.textarea",
                placeholder: "What did you like or dislike? What did you use this product for?",
                value: body,
                maxLength: MAX_BODY,
                onChange: (e) => setBody(e.target.value),
                rows: 6,
                className: "bg-background resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-semibold text-foreground", children: "Add photos" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                images.length,
                "/",
                MAX_IMAGES
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-start", children: [
              images.map((img, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "relative w-20 h-20 rounded-md overflow-hidden border border-border group",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: img.dataUrl,
                        alt: `Preview ${idx + 1}`,
                        className: "w-full h-full object-cover"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": `write-review.image.delete_button.${idx + 1}`,
                        "aria-label": `Remove image ${idx + 1}`,
                        onClick: () => removeImage(idx),
                        className: "absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-foreground/80 text-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus-visible:opacity-100",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                      }
                    )
                  ]
                },
                `${img.name}-${idx}`
              )),
              images.length < MAX_IMAGES && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": "write-review.image.upload_button",
                  "aria-label": "Upload photo",
                  onClick: () => {
                    var _a;
                    return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                  },
                  className: "w-20 h-20 rounded-md border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-accent hover:text-accent transition-colors duration-200",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "w-5 h-5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium", children: "Add photo" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: fileInputRef,
                type: "file",
                accept: "image/*",
                multiple: true,
                className: "sr-only",
                onChange: (e) => handleImageFiles(e.target.files)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "JPEG, PNG, GIF up to 10 MB each · max ",
              MAX_IMAGES,
              " photos"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                "data-ocid": "write-review.submit_button",
                disabled: createReview.isPending,
                className: "sm:w-auto",
                children: createReview.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                  "Submitting…"
                ] }) : "Submit review"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                "data-ocid": "write-review.cancel_button",
                onClick: () => navigate({ to: "/product/$id", params: { id } }),
                children: "Cancel"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-4 bg-muted/40 rounded-lg border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-1", children: "Review guidelines" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-xs text-muted-foreground space-y-1 list-disc list-inside", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Share your honest experience with the product." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Focus on the product itself, not seller or shipping." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Keep it respectful and free of offensive language." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Do not include personal information or external links." })
          ] })
        ] })
      ] })
    }
  );
}
export {
  WriteReview as default
};
