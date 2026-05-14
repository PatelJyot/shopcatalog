import { createActor } from "@/backend";
import type {
  CreateReviewRequest as BackendCreateReviewRequest,
  RatingDistribution as BackendRatingDistribution,
  Review as BackendReview,
} from "@/backend";
import type {
  CreateReviewRequest,
  RatingDistribution,
  Review,
} from "@/types/review";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function mapReview(r: BackendReview): Review {
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
      isHelpful: v.isHelpful,
    })),
    createdAt: r.createdAt,
    images: r.images,
  };
}

function mapRatingDistribution(
  d: BackendRatingDistribution,
): RatingDistribution {
  return {
    star1: Number(d.star1),
    star2: Number(d.star2),
    star3: Number(d.star3),
    star4: Number(d.star4),
    star5: Number(d.star5),
  };
}

const MOCK_REVIEWS: Review[] = [
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
    createdAt: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000),
    images: [],
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
    createdAt: BigInt(Date.now() - 14 * 24 * 60 * 60 * 1000),
    images: [],
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
    createdAt: BigInt(Date.now() - 21 * 24 * 60 * 60 * 1000),
    images: [],
  },
];

const MOCK_DISTRIBUTION: RatingDistribution = {
  star5: 60,
  star4: 20,
  star3: 10,
  star2: 5,
  star1: 5,
};

export function useProductReviews(productId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Review[]>({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      if (!actor) return MOCK_REVIEWS.filter((r) => r.productId === productId);
      const raw = await actor.getProductReviews(BigInt(productId));
      return raw.map(mapReview);
    },
    enabled: !isFetching && !!productId,
    staleTime: 2 * 60 * 1000,
  });
}

export function useRatingDistribution(productId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<RatingDistribution>({
    queryKey: ["rating-distribution", productId],
    queryFn: async () => {
      if (!actor) return MOCK_DISTRIBUTION;
      const raw = await actor.getRatingDistribution(BigInt(productId));
      return mapRatingDistribution(raw);
    },
    enabled: !isFetching && !!productId,
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateReview() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<Review, Error, CreateReviewRequest>({
    mutationFn: async (req: CreateReviewRequest) => {
      if (!actor) throw new Error("Backend not available");
      const backendReq: BackendCreateReviewRequest = {
        productId: BigInt(req.productId),
        rating: BigInt(req.rating),
        title: req.title,
        body: req.body,
        images: req.images,
      };
      const raw = await actor.createReview(backendReq);
      return mapReview(raw);
    },
    onSuccess: (review) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", review.productId],
      });
      queryClient.invalidateQueries({
        queryKey: ["rating-distribution", review.productId],
      });
      queryClient.invalidateQueries({
        queryKey: ["product", review.productId],
      });
    },
  });
}

export function useToggleHelpfulVote() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    void,
    Error,
    { reviewId: string; productId: string; isHelpful: boolean }
  >({
    mutationFn: async ({ reviewId, isHelpful }) => {
      if (!actor) throw new Error("Backend not available");
      await actor.toggleHelpfulVote(BigInt(reviewId), isHelpful);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.productId],
      });
    },
  });
}
