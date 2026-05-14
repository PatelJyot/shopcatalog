import Debug "mo:core/Debug";
import List "mo:core/List";
import ReviewTypes "../types/reviews";
import ProductTypes "../types/products";
import OrderTypes "../types/orders";

module {
  public type Review = ReviewTypes.Review;
  public type RatingDistribution = ReviewTypes.RatingDistribution;
  public type Product = ProductTypes.Product;
  public type Order = OrderTypes.Order;

  /// Create a new review and append it to the reviews list.
  /// Returns the created Review.
  public func createReview(
    reviews : List.List<Review>,
    id : Nat,
    userId : Principal,
    productId : Nat,
    rating : Nat,
    title : Text,
    body : Text,
    images : [Text],
    verifiedPurchase : Bool,
  ) : Review {
    Debug.todo();
  };

  /// Return all reviews for a given product.
  public func getByProduct(
    reviews : List.List<Review>,
    productId : Nat,
  ) : [Review] {
    Debug.todo();
  };

  /// Return star-rating distribution counts for a given product.
  public func getRatingDistribution(
    reviews : List.List<Review>,
    productId : Nat,
  ) : RatingDistribution {
    Debug.todo();
  };

  /// Toggle (or clear) a helpful vote for a review.
  /// If user already voted the same way, clears the vote.
  /// If user voted differently, flips the vote.
  public func toggleHelpfulVote(
    reviews : List.List<Review>,
    reviewId : Nat,
    userId : Principal,
    isHelpful : Bool,
  ) : () {
    Debug.todo();
  };

  /// Update product rating and reviewCount after a new review is added.
  public func updateProductStats(
    products : List.List<Product>,
    productId : Nat,
  ) : () {
    Debug.todo();
  };

  /// Check whether a user has purchased a given product (verified purchase).
  public func hasUserPurchasedProduct(
    orders : List.List<Order>,
    userId : Principal,
    productId : Nat,
  ) : Bool {
    Debug.todo();
  };
}
