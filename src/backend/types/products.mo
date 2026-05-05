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

  public type SearchParams = {
    searchQuery : Text;
    categories : [Text];
    minPrice : Float;
    maxPrice : Float;
    brands : [Text];
    minRating : Float;
    inStock : Bool;
    sortBy : Text;
    page : Nat;
    pageSize : Nat;
  };

  public type SearchResult = {
    products : [Product];
    total : Nat;
    page : Nat;
    pageSize : Nat;
  };
}
