import { c as createLucideIcon, m as useActor, t as useQuery, v as useQueryClient, o as createActor } from "./index-CDI_idwZ.js";
import { u as useMutation } from "./useMutation-BJHgXTJq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
function mapReview(r) {
  return {
    id: String(r.id),
    userId: String(r.userId),
    productId: String(r.productId),
    rating: Number(r.rating),
    title: r.title,
    body: r.body,
    verifiedPurchase: r.verifiedPurchase,
    helpfulCount: Number(r.helpfulCount),
    helpfulVotes: r.helpfulVotes.map((v) => ({
      userId: String(v.userId),
      isHelpful: v.isHelpful
    })),
    createdAt: r.createdAt,
    images: r.images
  };
}
function mapRatingDistribution(d) {
  return {
    star1: Number(d.star1),
    star2: Number(d.star2),
    star3: Number(d.star3),
    star4: Number(d.star4),
    star5: Number(d.star5)
  };
}
const MOCK_REVIEWS = [
  {
    id: "1",
    userId: "user-1",
    productId: "1",
    rating: 5,
    title: "Absolutely love these earbuds!",
    body: "The noise cancellation is phenomenal. I use them daily for commuting and calls. Battery life is excellent and they pair instantly with my phone.",
    verifiedPurchase: true,
    helpfulCount: 42,
    helpfulVotes: [],
    createdAt: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1e3),
    images: []
  },
  {
    id: "2",
    userId: "user-2",
    productId: "1",
    rating: 4,
    title: "Great sound, minor fit issues",
    body: "Sound quality is top-notch and the ANC works really well in noisy environments. The only downside is the fit can be slightly uncomfortable after 2+ hours of continuous use.",
    verifiedPurchase: true,
    helpfulCount: 18,
    helpfulVotes: [],
    createdAt: BigInt(Date.now() - 14 * 24 * 60 * 60 * 1e3),
    images: []
  },
  {
    id: "3",
    userId: "user-3",
    productId: "1",
    rating: 5,
    title: "Worth every rupee",
    body: "Best wireless earbuds I've owned. The call quality is crystal clear and the touch controls are very responsive. Highly recommend!",
    verifiedPurchase: false,
    helpfulCount: 9,
    helpfulVotes: [],
    createdAt: BigInt(Date.now() - 21 * 24 * 60 * 60 * 1e3),
    images: []
  }
];
const MOCK_DISTRIBUTION = {
  star5: 60,
  star4: 20,
  star3: 10,
  star2: 5,
  star1: 5
};
function useProductReviews(productId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      if (!actor) return MOCK_REVIEWS.filter((r) => r.productId === productId);
      const raw = await actor.getProductReviews(BigInt(productId));
      return raw.map(mapReview);
    },
    enabled: !isFetching && !!productId,
    staleTime: 2 * 60 * 1e3
  });
}
function useRatingDistribution(productId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["rating-distribution", productId],
    queryFn: async () => {
      if (!actor) return MOCK_DISTRIBUTION;
      const raw = await actor.getRatingDistribution(BigInt(productId));
      return mapRatingDistribution(raw);
    },
    enabled: !isFetching && !!productId,
    staleTime: 2 * 60 * 1e3
  });
}
function useCreateReview() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Backend not available");
      const backendReq = {
        productId: BigInt(req.productId),
        rating: BigInt(req.rating),
        title: req.title,
        body: req.body,
        images: req.images
      };
      const raw = await actor.createReview(backendReq);
      return mapReview(raw);
    },
    onSuccess: (review) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", review.productId]
      });
      queryClient.invalidateQueries({
        queryKey: ["rating-distribution", review.productId]
      });
      queryClient.invalidateQueries({
        queryKey: ["product", review.productId]
      });
    }
  });
}
function useToggleHelpfulVote() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ reviewId, isHelpful }) => {
      if (!actor) throw new Error("Backend not available");
      await actor.toggleHelpfulVote(BigInt(reviewId), isHelpful);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.productId]
      });
    }
  });
}
export {
  LoaderCircle as L,
  useProductReviews as a,
  useRatingDistribution as b,
  useCreateReview as c,
  useToggleHelpfulVote as u
};
