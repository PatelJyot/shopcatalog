import List "mo:core/List";
import Types "../types/products";
import ProductsLib "../lib/products";

mixin (products : List.List<Types.Product>) {

  /// Get every product in the catalog
  public query func getProducts() : async [Types.Product] {
    ProductsLib.listAll(products);
  };

  /// Get only featured products (for homepage grid)
  public query func getFeaturedProducts() : async [Types.Product] {
    ProductsLib.listFeatured(products);
  };

  /// Get products filtered by category
  public query func getProductsByCategory(category : Types.Category) : async [Types.Product] {
    ProductsLib.listByCategory(products, category);
  };

  /// Get a single product by ID
  public query func getProduct(id : Nat) : async ?Types.Product {
    ProductsLib.getById(products, id);
  };

  /// Get products that are currently on sale (have a sale price)
  public query func getDeals() : async [Types.Product] {
    ProductsLib.listDeals(products);
  };
}
