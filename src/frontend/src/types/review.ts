export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  title: string;
  body: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  helpfulVotes: Array<{ userId: string; isHelpful: boolean }>;
  createdAt: bigint;
  images: string[];
}

export interface CreateReviewRequest {
  productId: string;
  rating: number;
  title: string;
  body: string;
  images: string[];
}

export interface RatingDistribution {
  star1: number;
  star2: number;
  star3: number;
  star4: number;
  star5: number;
}
