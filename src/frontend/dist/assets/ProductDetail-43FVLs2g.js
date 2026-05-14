import { c as createLucideIcon, j as jsxRuntimeExports, r as reactExports, B as Badge, b as Button, X, g as useParams, e as useNavigate, h as useProduct, i as useProductsByCategory, k as useCart, l as useInternetIdentity, m as useActor, L as Link, S as ShoppingCart, n as ue, o as createActor } from "./index-CDI_idwZ.js";
import { S as StarRating, P as ProductCard } from "./ProductCard-BI2zhTH6.js";
import { S as Skeleton } from "./skeleton-DMvFTnKJ.js";
import { u as useToggleHelpfulVote, a as useProductReviews, b as useRatingDistribution, c as useCreateReview, L as LoaderCircle } from "./useReviews-CTu6EKu5.js";
import { C as ChevronUp, a as ChevronDown } from "./chevron-up-P0IVCkIB.js";
import { C as CircleAlert } from "./circle-alert-XXRj3ipx.js";
import { C as ChevronRight } from "./chevron-right-B3ZGuErb.js";
import { T as Truck, R as RotateCcw } from "./truck-DscfpMlK.js";
import { S as Star } from "./star-D95wk3S2.js";
import { P as Package } from "./package-QhM0exBy.js";
import "./useMutation-BJHgXTJq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
];
const PenLine = createLucideIcon("pen-line", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M17 14V2", key: "8ymqnk" }],
  [
    "path",
    {
      d: "M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z",
      key: "m61m77"
    }
  ]
];
const ThumbsDown = createLucideIcon("thumbs-down", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M7 10v12", key: "1qc93n" }],
  [
    "path",
    {
      d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",
      key: "emmmcr"
    }
  ]
];
const ThumbsUp = createLucideIcon("thumbs-up", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
function RatingBreakdown({
  distribution,
  isLoading,
  average,
  totalReviews,
  activeStar,
  onFilterByStar
}) {
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-6 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-32 rounded-xl flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 space-y-2 w-full", children: [5, 4, 3, 2, 1].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-full rounded" }, `skel-star-${s}`)) })
    ] });
  }
  const dist = distribution ?? {
    star5: 0,
    star4: 0,
    star3: 0,
    star2: 0,
    star1: 0
  };
  const total = totalReviews > 0 ? totalReviews : 1;
  const rows = [
    { star: 5, count: dist.star5 },
    { star: 4, count: dist.star4 },
    { star: 3, count: dist.star3 },
    { star: 2, count: dist.star2 },
    { star: 1, count: dist.star1 }
  ];
  function handleClick(star) {
    onFilterByStar(activeStar === star ? null : star);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col sm:flex-row gap-6 items-center sm:items-start",
      "data-ocid": "reviews.rating_breakdown",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 flex-shrink-0 w-32", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-5xl font-bold text-foreground", children: totalReviews > 0 ? average.toFixed(1) : "–" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "out of 5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StarRating,
            {
              rating: totalReviews > 0 ? average : 0,
              showCount: false,
              size: "md"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground mt-0.5", children: [
            totalReviews.toLocaleString(),
            " review",
            totalReviews !== 1 ? "s" : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 w-full space-y-1.5", children: rows.map(({ star, count }) => {
          const pct = totalReviews > 0 ? Math.round(count / total * 100) : 0;
          const isActive = activeStar === star;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => handleClick(star),
              "data-ocid": `reviews.star_filter.${star}`,
              "aria-label": `Filter by ${star} star${star !== 1 ? "s" : ""}`,
              "aria-pressed": isActive,
              className: `w-full flex items-center gap-2 group rounded-lg px-1.5 py-0.5 transition-colors duration-150 ${isActive ? "bg-accent/10" : "hover:bg-muted/50"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-muted-foreground w-8 text-right flex-shrink-0", children: [
                  star,
                  "★"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full rounded-full transition-all duration-300",
                    style: {
                      width: `${pct}%`,
                      backgroundColor: "var(--accent)"
                    }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground w-12 text-right flex-shrink-0", children: [
                  count,
                  " (",
                  pct,
                  "%)"
                ] })
              ]
            },
            `bar-${star}`
          );
        }) })
      ]
    }
  );
}
function maskName(userId) {
  if (!userId) return "A***";
  const first = userId.charAt(0).toUpperCase();
  return `${first}***`;
}
function timeAgo(ts) {
  const ms = Number(ts);
  const now = Date.now();
  const diff = now - ms;
  const days = Math.floor(diff / 864e5);
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
function ReviewCard({ review, currentUserId }) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const [lightboxImg, setLightboxImg] = reactExports.useState(null);
  const { mutate: toggleVote, isPending } = useToggleHelpfulVote();
  const isLong = review.body.length > MAX_BODY;
  const displayBody = isLong && !expanded ? `${review.body.slice(0, MAX_BODY)}…` : review.body;
  const thumbImages = review.images.slice(0, MAX_THUMBS);
  const myVote = currentUserId ? review.helpfulVotes.find((v) => v.userId === currentUserId) : void 0;
  function handleVote(isHelpful) {
    toggleVote({ reviewId: review.id, productId: review.productId, isHelpful });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-5 space-y-3",
      "data-ocid": "reviews.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm font-bold text-accent flex-shrink-0", children: review.userId.charAt(0).toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: maskName(review.userId) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: timeAgo(review.createdAt) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 flex-shrink-0", children: review.verifiedPurchase && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: "bg-accent text-accent-foreground text-[10px] font-semibold px-2 py-0.5 border-0",
              "data-ocid": "reviews.verified_badge",
              children: "✓ Verified Purchase"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: review.rating, showCount: false, size: "sm" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold text-foreground", children: review.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed", children: displayBody }),
          isLong && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setExpanded((e) => !e),
              className: "mt-1 text-xs text-accent font-medium hover:underline flex items-center gap-0.5 transition-colors",
              "data-ocid": "reviews.read_more_button",
              children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3 h-3" }),
                "Show less"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3" }),
                "Read more"
              ] })
            }
          )
        ] }),
        thumbImages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
          thumbImages.map((img, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setLightboxImg(img),
              className: "w-16 h-16 rounded-lg overflow-hidden border border-border hover:border-accent transition-colors flex-shrink-0",
              "aria-label": `View image ${idx + 1}`,
              "data-ocid": `reviews.image.${idx + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: img,
                  alt: `Review ${idx + 1}`,
                  className: "w-full h-full object-cover",
                  loading: "lazy"
                }
              )
            },
            `review-img-${review.id}-${idx}`
          )),
          review.images.length > MAX_THUMBS && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground font-medium border border-border", children: [
            "+",
            review.images.length - MAX_THUMBS
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 pt-1 border-t border-border",
            "data-ocid": "reviews.helpful_row",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                "Helpful? (",
                review.helpfulCount,
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => handleVote(true),
                  disabled: isPending,
                  "data-ocid": "reviews.helpful_yes_button",
                  className: `h-7 px-2 text-xs gap-1 ${(myVote == null ? void 0 : myVote.isHelpful) === true ? "text-accent font-semibold" : "text-muted-foreground"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "w-3 h-3" }),
                    "Yes"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => handleVote(false),
                  disabled: isPending,
                  "data-ocid": "reviews.helpful_no_button",
                  className: `h-7 px-2 text-xs gap-1 ${(myVote == null ? void 0 : myVote.isHelpful) === false ? "text-destructive font-semibold" : "text-muted-foreground"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsDown, { className: "w-3 h-3" }),
                    "No"
                  ]
                }
              )
            ]
          }
        ),
        lightboxImg && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "dialog",
          {
            open: true,
            className: "fixed inset-0 z-50 bg-foreground/80 flex items-center justify-center p-4 border-0 max-w-none w-full h-full m-0 p-4",
            "data-ocid": "reviews.lightbox",
            "aria-label": "Review image",
            onKeyDown: (e) => {
              if (e.key === "Escape") setLightboxImg(null);
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative max-w-2xl w-full",
                onClick: () => setLightboxImg(null),
                onKeyDown: (e) => {
                  if (e.key === "Escape") setLightboxImg(null);
                },
                role: "presentation",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: lightboxImg,
                      alt: "Review detail",
                      className: "w-full rounded-xl"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setLightboxImg(null),
                      className: "absolute top-2 right-2 w-8 h-8 rounded-full bg-background/90 flex items-center justify-center hover:bg-background transition-colors",
                      "aria-label": "Close image",
                      "data-ocid": "reviews.lightbox_close_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                    }
                  )
                ]
              }
            )
          }
        )
      ]
    }
  );
}
function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(price);
}
function StockBadge({ qty }) {
  if (qty === 0)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-sm font-semibold text-destructive", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4" }),
      "Out of Stock"
    ] });
  if (qty < 5)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: "inline-flex items-center gap-1 text-sm font-semibold",
        style: { color: "#b45309" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
          "Only ",
          qty,
          " left in stock — order soon!"
        ]
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-sm font-semibold text-green-700", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
    "In Stock"
  ] });
}
function ProductDetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48 mb-6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square w-full rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["t1", "t2", "t3", "t4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Skeleton,
          {
            className: "w-20 h-20 rounded-lg flex-shrink-0"
          },
          k
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-24" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" })
      ] })
    ] })
  ] });
}
const THUMB_KEYS = ["thumb-0", "thumb-1", "thumb-2", "thumb-3"];
const RELATED_KEYS = ["rel-0", "rel-1", "rel-2", "rel-3"];
const SORT_OPTIONS = [
  { value: "recent", label: "Most Recent" },
  { value: "helpful", label: "Most Helpful" }
];
function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "flex gap-1 border-0 p-0 m-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "sr-only", children: "Select star rating" }),
    [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "aria-label": `${s} star${s !== 1 ? "s" : ""}`,
        "aria-pressed": value === s,
        onMouseEnter: () => setHovered(s),
        onMouseLeave: () => setHovered(0),
        onClick: () => onChange(s),
        className: "cursor-pointer p-0.5 transition-transform hover:scale-110",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Star,
          {
            className: `w-7 h-7 transition-colors duration-100 ${(hovered || value) >= s ? "fill-accent text-accent" : "fill-muted text-muted-foreground"}`
          }
        )
      },
      `pick-${s}`
    ))
  ] });
}
function useUserOrders(productId, actor) {
  const [hasOrdered, setHasOrdered] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!actor) return;
    actor.getUserOrders().then((orders) => {
      const found = orders.some(
        (o) => o.items.some((item) => String(item.productId) === productId)
      );
      setHasOrdered(found);
    }).catch(() => {
    });
  }, [actor, productId]);
  return hasOrdered;
}
function ProductDetail() {
  const { id } = useParams({ from: "/product/$id" });
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useProduct(id);
  const { data: related } = useProductsByCategory((product == null ? void 0 : product.category) ?? "");
  const { addToCart } = useCart();
  const { identity, isAuthenticated } = useInternetIdentity();
  const currentUserId = identity ? identity.getPrincipal().toString() : void 0;
  const { data: reviews, isLoading: reviewsLoading } = useProductReviews(id);
  const { data: distribution, isLoading: distLoading } = useRatingDistribution(id);
  const { mutate: createReview, isPending: submitting } = useCreateReview();
  const { actor } = useActor(createActor);
  const hasOrdered = useUserOrders(id, actor ?? null);
  const [activeStar, setActiveStar] = reactExports.useState(null);
  const [sortBy, setSortBy] = reactExports.useState("recent");
  const [showReviewForm, setShowReviewForm] = reactExports.useState(false);
  const [reviewRating, setReviewRating] = reactExports.useState(5);
  const [reviewTitle, setReviewTitle] = reactExports.useState("");
  const [reviewBody, setReviewBody] = reactExports.useState("");
  const [reviewError, setReviewError] = reactExports.useState("");
  const reviewsRef = reactExports.useRef(null);
  const [activeImage, setActiveImage] = reactExports.useState(0);
  const [quantity, setQuantity] = reactExports.useState(1);
  reactExports.useEffect(() => {
    setActiveImage(0);
    setQuantity(1);
    setActiveStar(null);
    setShowReviewForm(false);
  }, [id]);
  const filteredReviews = (reviews ?? []).filter((r) => activeStar === null ? true : r.rating === activeStar).sort((a, b) => {
    if (sortBy === "helpful") return b.helpfulCount - a.helpfulCount;
    return Number(b.createdAt) - Number(a.createdAt);
  });
  const totalReviews = (reviews == null ? void 0 : reviews.length) ?? 0;
  const avgRating = totalReviews > 0 ? (reviews ?? []).reduce((s, r) => s + r.rating, 0) / totalReviews : 0;
  function handleSubmitReview(e) {
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
    const req = {
      productId: id,
      rating: reviewRating,
      title: reviewTitle.trim(),
      body: reviewBody.trim(),
      images: []
    };
    createReview(req, {
      onSuccess: () => {
        setShowReviewForm(false);
        setReviewRating(5);
        setReviewTitle("");
        setReviewBody("");
      },
      onError: () => setReviewError("Failed to submit. Please try again.")
    });
  }
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(ProductDetailSkeleton, {});
  if (isError || !product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-4xl mx-auto px-4 py-20 text-center",
        "data-ocid": "product.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-16 h-16 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground mb-2", children: "Product Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "The product you're looking for doesn't exist or has been removed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: () => navigate({ to: "/products" }),
              className: "bg-accent hover:bg-accent/90 text-accent-foreground",
              children: "Browse All Products"
            }
          )
        ]
      }
    );
  }
  const isOnSale = product.salePrice !== null && product.salePrice < product.price;
  const displayPrice = isOnSale ? product.salePrice : product.price;
  const discountPct = isOnSale ? Math.round((1 - product.salePrice / product.price) * 100) : 0;
  const maxQty = Math.max(product.stockQuantity, 1);
  const baseImages = product.images.length > 0 ? product.images : ["/assets/images/placeholder.svg"];
  const galleryImages = baseImages.length >= 2 ? baseImages : [
    baseImages[0],
    "/assets/generated/product-detail-hero.dim_600x600.jpg",
    baseImages[0],
    "/assets/generated/product-detail-hero.dim_600x600.jpg"
  ];
  const relatedProducts = (related ?? []).filter((p) => p.id !== product.id).slice(0, 4);
  function handleAddToCart() {
    addToCart(product, quantity);
    ue.success(`${product.title} added to cart!`, { duration: 3e3 });
  }
  function handleBuyNow() {
    addToCart(product, quantity);
    navigate({ to: "/cart" });
  }
  function decQty() {
    setQuantity((q) => Math.max(1, q - 1));
  }
  function incQty() {
    setQuantity((q) => Math.min(maxQty, q + 1));
  }
  function handleQtyInput(e) {
    const val = Number.parseInt(e.target.value, 10);
    if (!Number.isNaN(val)) {
      setQuantity(Math.min(Math.max(1, val), maxQty));
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", "data-ocid": "product.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "nav",
      {
        className: "max-w-6xl mx-auto px-4 py-2.5 flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap",
        "aria-label": "Breadcrumb",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/",
              className: "hover:text-accent transition-colors duration-200",
              children: "Home"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/products",
              className: "hover:text-accent transition-colors duration-200",
              children: "Products"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate max-w-xs", children: product.title })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "product.gallery", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square rounded-xl overflow-hidden border border-border bg-muted/20 shadow-subtle", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: galleryImages[activeImage] ?? "/assets/images/placeholder.svg",
                alt: product.title,
                className: "w-full h-full object-cover transition-smooth"
              }
            ),
            isOnSale && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "absolute top-4 left-4 bg-accent text-accent-foreground text-sm font-bold px-2.5 py-1", children: [
              "-",
              discountPct,
              "% OFF"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1", children: galleryImages.map((img, i) => {
            const thumbKey = THUMB_KEYS[i] ?? `thumb-${i}`;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setActiveImage(i),
                "data-ocid": `product.thumbnail.${i + 1}`,
                "aria-label": `View image ${i + 1}`,
                className: `flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${activeImage === i ? "border-accent shadow-md" : "border-border hover:border-accent/50"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: img,
                    alt: `${product.title} view ${i + 1}`,
                    className: "w-full h-full object-cover",
                    loading: "lazy"
                  }
                )
              },
              thumbKey
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5", "data-ocid": "product.info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-accent", children: product.brand }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "SKU: ",
              product.sku
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h1",
            {
              className: "font-display text-3xl lg:text-4xl font-bold text-foreground leading-tight",
              "data-ocid": "product.title",
              children: product.title
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StarRating,
              {
                rating: product.rating,
                reviewCount: product.reviewCount,
                showCount: true,
                size: "md"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-accent font-bold", children: [
              product.rating.toFixed(1),
              " ★"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex items-baseline gap-3 flex-wrap",
              "data-ocid": "product.price",
              children: isOnSale ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-bold text-accent", children: formatPrice(displayPrice) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl text-muted-foreground line-through", children: formatPrice(product.price) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-accent/10 text-accent border border-accent/30 font-semibold", children: [
                  "Save ",
                  discountPct,
                  "%"
                ] })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-bold text-foreground", children: formatPrice(displayPrice) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "product.stock_status", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StockBadge, { qty: product.stockQuantity }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Sold by:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: product.sellerName })
          ] }),
          product.stockQuantity > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-muted-foreground", children: "Qty:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-border rounded-lg overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: decQty,
                  disabled: quantity <= 1,
                  "data-ocid": "product.qty_dec_button",
                  "aria-label": "Decrease quantity",
                  className: "w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  value: quantity,
                  onChange: handleQtyInput,
                  min: 1,
                  max: maxQty,
                  "data-ocid": "product.qty_input",
                  "aria-label": "Quantity",
                  className: "w-14 h-10 text-center text-sm font-semibold border-x border-border bg-background focus:outline-none focus:ring-1 focus:ring-accent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: incQty,
                  disabled: quantity >= maxQty,
                  "data-ocid": "product.qty_inc_button",
                  "aria-label": "Increase quantity",
                  className: "w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              product.stockQuantity,
              " available"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                onClick: handleAddToCart,
                disabled: product.stockQuantity === 0,
                "data-ocid": "product.add_to_cart_button",
                className: "w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground text-base font-semibold transition-colors duration-200 shadow-subtle",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-5 h-5 mr-2" }),
                  "Add to Cart"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                onClick: handleBuyNow,
                disabled: product.stockQuantity === 0,
                variant: "outline",
                "data-ocid": "product.buy_now_button",
                className: "w-full h-12 border-foreground text-foreground hover:bg-foreground hover:text-background text-base font-semibold transition-colors duration-200",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 mr-2" }),
                  "Buy Now"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 pt-2", children: [
            { Icon: Truck, label: "Free Shipping", sub: "Orders $49+" },
            {
              Icon: RotateCcw,
              label: "Easy Returns",
              sub: "30-day policy"
            },
            { Icon: Shield, label: "Secure Pay", sub: "100% protected" }
          ].map(({ Icon, label, sub }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center text-center p-2.5 rounded-lg bg-muted/30",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-accent mb-1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: sub })
              ]
            },
            label
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mt-12 border-t border-border pt-8",
          "data-ocid": "product.description_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-4", children: "Product Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed text-base", children: product.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
                { label: "Brand", value: product.brand },
                { label: "Category", value: product.category },
                { label: "Seller", value: product.sellerName },
                { label: "SKU", value: product.sku }
              ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: value })
              ] }, label)) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mt-12 border-t border-border pt-8",
          ref: reviewsRef,
          "data-ocid": "reviews.section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6 flex-wrap gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Customer Reviews" }),
              isAuthenticated && hasOrdered && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  onClick: () => setShowReviewForm((v) => !v),
                  "data-ocid": "reviews.write_review_button",
                  className: "bg-accent hover:bg-accent/90 text-accent-foreground gap-2 font-semibold",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-4 h-4" }),
                    showReviewForm ? "Cancel" : "Write a Review"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-6 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              RatingBreakdown,
              {
                distribution,
                isLoading: distLoading,
                average: avgRating,
                totalReviews,
                activeStar,
                onFilterByStar: setActiveStar
              }
            ) }),
            showReviewForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-card border border-border rounded-xl p-6 mb-6",
                "data-ocid": "reviews.form",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-foreground", children: "Write Your Review" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setShowReviewForm(false),
                        className: "w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted transition-colors",
                        "aria-label": "Close review form",
                        "data-ocid": "reviews.form_close_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmitReview, className: "space-y-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-2", children: "Your Rating *" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(StarPicker, { value: reviewRating, onChange: setReviewRating })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "review-title",
                          className: "text-sm font-medium text-foreground",
                          children: "Review Title *"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "review-title",
                          type: "text",
                          value: reviewTitle,
                          onChange: (e) => setReviewTitle(e.target.value),
                          placeholder: "Summarise your experience",
                          maxLength: 120,
                          "data-ocid": "reviews.title_input",
                          className: "mt-1.5 w-full h-10 px-3 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "review-body",
                          className: "text-sm font-medium text-foreground",
                          children: "Your Review *"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "textarea",
                        {
                          id: "review-body",
                          value: reviewBody,
                          onChange: (e) => setReviewBody(e.target.value),
                          placeholder: "Share details about your experience",
                          rows: 4,
                          maxLength: 2e3,
                          "data-ocid": "reviews.body_textarea",
                          className: "mt-1.5 w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        }
                      )
                    ] }),
                    reviewError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-sm text-destructive font-medium",
                        "data-ocid": "reviews.form_error_state",
                        children: reviewError
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "submit",
                        disabled: submitting,
                        "data-ocid": "reviews.submit_button",
                        className: "bg-accent hover:bg-accent/90 text-accent-foreground font-semibold gap-2",
                        children: [
                          submitting && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                          submitting ? "Submitting…" : "Submit Review"
                        ]
                      }
                    )
                  ] })
                ]
              }
            ),
            totalReviews > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setActiveStar(null),
                    "data-ocid": "reviews.filter.all",
                    className: `px-3 py-1 rounded-full text-xs font-semibold border transition-colors duration-150 ${activeStar === null ? "bg-accent text-accent-foreground border-accent" : "border-border text-muted-foreground hover:border-accent/50"}`,
                    children: "All"
                  }
                ),
                [5, 4, 3, 2, 1].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setActiveStar(activeStar === s ? null : s),
                    "data-ocid": `reviews.filter.${s}star`,
                    className: `px-3 py-1 rounded-full text-xs font-semibold border transition-colors duration-150 ${activeStar === s ? "bg-accent text-accent-foreground border-accent" : "border-border text-muted-foreground hover:border-accent/50"}`,
                    children: [
                      s,
                      "★"
                    ]
                  },
                  `filter-tab-${s}`
                ))
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "select",
                {
                  value: sortBy,
                  onChange: (e) => setSortBy(e.target.value),
                  "data-ocid": "reviews.sort_select",
                  "aria-label": "Sort reviews",
                  className: "h-8 pl-3 pr-7 text-xs rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer",
                  children: SORT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value, children: opt.label }, opt.value))
                }
              ) })
            ] }),
            reviewsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "reviews.loading_state", children: [1, 2, 3].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-card border border-border rounded-xl p-5 space-y-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-muted animate-pulse" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-24 bg-muted rounded animate-pulse" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-16 bg-muted rounded animate-pulse" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-40 bg-muted rounded animate-pulse" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-full bg-muted rounded animate-pulse" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-4/5 bg-muted rounded animate-pulse" })
                  ] })
                ]
              },
              `review-skel-${k}`
            )) }) : filteredReviews.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-16 bg-card border border-border rounded-xl",
                "data-ocid": "reviews.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-12 h-12 text-muted-foreground mx-auto mb-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold text-lg mb-1", children: activeStar ? `No ${activeStar}★ reviews yet` : "No reviews yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: isAuthenticated && hasOrdered ? "Be the first to review this product!" : "Purchase this product to leave a review." })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "reviews.list", children: filteredReviews.map((review, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ReviewCard,
              {
                review,
                currentUserId
              },
              `review-${review.id}-${idx}`
            )) })
          ]
        }
      ),
      relatedProducts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12", "data-ocid": "product.related_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Related Products" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/products",
              className: "text-sm text-accent font-medium hover:underline transition-colors",
              "data-ocid": "product.view_all_link",
              children: "View All"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: relatedProducts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProductCard,
          {
            product: p,
            index: i
          },
          RELATED_KEYS[i] ?? p.id
        )) })
      ] })
    ] })
  ] });
}
export {
  ProductDetail as default
};
