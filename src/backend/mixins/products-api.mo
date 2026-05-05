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

  /// Search and filter products with pagination
  public query func searchProducts(params : Types.SearchParams) : async Types.SearchResult {
    ProductsLib.searchProducts(products, params);
  };

  /// Get unique brand names from the catalog
  public query func getBrands() : async [Text] {
    ProductsLib.getBrands(products);
  };

  /// Get up to 8 lightweight search suggestions by title/brand match
  public query func getSearchSuggestions(q : Text) : async [Types.Product] {
    ProductsLib.getSearchSuggestions(products, q);
  };
}
