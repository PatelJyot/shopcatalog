import Debug "mo:core/Debug";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import ReviewTypes "../types/reviews";
import ProductTypes "../types/products";
import OrderTypes "../types/orders";

mixin (
  reviews : List.List<ReviewTypes.Review>,
  products : List.List<ProductTypes.Product>,
  orders : List.List<OrderTypes.Order>,
  nextReviewId : { var value : Nat },
) {
  /// Submit a review for a product (authenticated).
  /// Checks that the caller has purchased the product (verified purchase).
  public shared ({ caller }) func createReview(
    req : ReviewTypes.CreateReviewRequest,
  ) : async ReviewTypes.Review {
    if (caller == Principal.anonymous()) Runtime.trap("Not authenticated");
    Debug.todo();
  };

  /// Fetch all reviews for a product (query).
  public query func getProductReviews(
    productId : Nat,
  ) : async [ReviewTypes.Review] {
    Debug.todo();
  };

  /// Fetch rating distribution for a product (query).
  public query func getRatingDistribution(
    productId : Nat,
  ) : async ReviewTypes.RatingDistribution {
    Debug.todo();
  };

  /// Toggle a helpful vote on a review (authenticated).
  public shared ({ caller }) func toggleHelpfulVote(
    reviewId : Nat,
    isHelpful : Bool,
  ) : async () {
    if (caller == Principal.anonymous()) Runtime.trap("Not authenticated");
    Debug.todo();
  };
}
