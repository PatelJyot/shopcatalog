import Time "mo:core/Time";

module {
  public type CartItem = {
    id : Nat;
    userId : Principal;
    productId : Nat;
    quantity : Nat;
    addedAt : Time.Time;
    updatedAt : Time.Time;
  };

  public type CartItemView = {
    id : Nat;
    productId : Nat;
    title : Text;
    image : Text;
    price : Float;
    salePrice : ?Float;
    quantity : Nat;
    addedAt : Time.Time;
    updatedAt : Time.Time;
  };
}
