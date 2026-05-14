import Time "mo:core/Time";

module {
  public type HelpfulVote = {
    userId : Principal;
    isHelpful : Bool;
  };

  public type Review = {
    id : Nat;
    userId : Principal;
    productId : Nat;
    rating : Nat;
    title : Text;
    body : Text;
    verifiedPurchase : Bool;
    helpfulCount : Nat;
    helpfulVotes : [HelpfulVote];
    createdAt : Time.Time;
    images : [Text];
  };

  public type CreateReviewRequest = {
    productId : Nat;
    rating : Nat;
    title : Text;
    body : Text;
    images : [Text];
  };

  public type RatingDistribution = {
    star1 : Nat;
    star2 : Nat;
    star3 : Nat;
    star4 : Nat;
    star5 : Nat;
  };
}
