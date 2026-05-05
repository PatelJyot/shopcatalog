module {
  public type Category = {
    #Electronics;
    #Fashion;
    #Grocery;
    #Books;
    #Home;
  };

  public type Product = {
    id : Nat;
    title : Text;
    description : Text;
    price : Float;
    salePrice : ?Float;
    category : Category;
    brand : Text;
    images : [Text];
    stockQuantity : Nat;
    sku : Text;
    rating : Float;
    reviewCount : Nat;
    isFeatured : Bool;
    sellerName : Text;
  };
}
