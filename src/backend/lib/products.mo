import List "mo:core/List";
import Types "../types/products";
import Set "mo:core/Set";
import Float "mo:core/Float";
import Array "mo:core/Array";

module {
  public type Product = Types.Product;
  public type Category = Types.Category;
  public type SearchParams = Types.SearchParams;
  public type SearchResult = Types.SearchResult;

  /// Return all products as an immutable array
  public func listAll(products : List.List<Product>) : [Product] {
    products.toArray();
  };

  /// Return only featured products
  public func listFeatured(products : List.List<Product>) : [Product] {
    products.filter(func(p) { p.isFeatured }).toArray();
  };

  /// Return products matching a given category
  public func listByCategory(products : List.List<Product>, category : Category) : [Product] {
    products.filter(func(p) { p.category == category }).toArray();
  };

  /// Return products that have a sale price set
  public func listDeals(products : List.List<Product>) : [Product] {
    products.filter(func(p) { p.salePrice != null }).toArray();
  };

  /// Find a single product by its numeric ID
  public func getById(products : List.List<Product>, id : Nat) : ?Product {
    products.find(func(p) { p.id == id });
  };

  /// Convert a Category variant to its Text name
  func categoryToText(cat : Category) : Text {
    switch cat {
      case (#Electronics) "Electronics";
      case (#Fashion) "Fashion";
      case (#Grocery) "Grocery";
      case (#Books) "Books";
      case (#Home) "Home";
    };
  };

  /// Case-insensitive partial match helper
  func containsIgnoreCase(haystack : Text, needle : Text) : Bool {
    if (needle == "") return true;
    haystack.toLower().contains(#text (needle.toLower()));
  };

  /// Return unique brand strings across all products
  public func getBrands(products : List.List<Product>) : [Text] {
    let seen = Set.empty<Text>();
    let result = List.empty<Text>();
    for (p in products.values()) {
      if (not seen.contains(p.brand)) {
        seen.add(p.brand);
        result.add(p.brand);
      };
    };
    result.toArray();
  };

  /// Return up to 8 products whose title or brand partially matches the query
  public func getSearchSuggestions(products : List.List<Product>, searchQuery : Text) : [Product] {
    if (searchQuery == "") return [];
    let q = searchQuery.toLower();
    var count = 0;
    let result = List.empty<Product>();
    label search for (p in products.values()) {
      if (count >= 8) break search;
      if (containsIgnoreCase(p.title, q) or containsIgnoreCase(p.brand, q)) {
        result.add(p);
        count += 1;
      };
    };
    result.toArray();
  };

  /// Search and filter products, returning a paginated SearchResult
  public func searchProducts(products : List.List<Product>, params : SearchParams) : SearchResult {
    let q = params.searchQuery.toLower();

    // Filter pass
    let filtered = products.filter(func(p) {
      // Query match (empty query matches all)
      let queryMatch = q == "" or
        containsIgnoreCase(p.title, q) or
        containsIgnoreCase(p.description, q) or
        containsIgnoreCase(p.brand, q);
      if (not queryMatch) return false;

      // Category filter
      if (params.categories.size() > 0) {
        let catText = categoryToText(p.category);
        let catMatch = params.categories.find(func(c) { c == catText });
        if (catMatch == null) return false;
      };

      // Brand filter
      if (params.brands.size() > 0) {
        let brandMatch = params.brands.find(func(b) { b == p.brand });
        if (brandMatch == null) return false;
      };

      // Price range
      let effectivePrice = switch (p.salePrice) {
        case (?sp) sp;
        case null p.price;
      };
      if (params.minPrice > 0.0 and effectivePrice < params.minPrice) return false;
      if (params.maxPrice > 0.0 and effectivePrice > params.maxPrice) return false;

      // Rating
      if (params.minRating > 0.0 and p.rating < params.minRating) return false;

      // Stock
      if (params.inStock and p.stockQuantity == 0) return false;

      true;
    });

    // Sort pass
    let sorted = switch (params.sortBy) {
      case "price-asc" {
        filtered.sort(func(a, b) {
          let pa = switch (a.salePrice) { case (?sp) sp; case null a.price };
          let pb = switch (b.salePrice) { case (?sp) sp; case null b.price };
          Float.compare(pa, pb);
        });
      };
      case "price-desc" {
        filtered.sort(func(a, b) {
          let pa = switch (a.salePrice) { case (?sp) sp; case null a.price };
          let pb = switch (b.salePrice) { case (?sp) sp; case null b.price };
          Float.compare(pb, pa);
        });
      };
      case "rating-desc" {
        filtered.sort(func(a, b) { Float.compare(b.rating, a.rating) });
      };
      case "newest" {
        // Higher id = newer
        filtered.sort(func(a, b) {
          if (a.id > b.id) #less
          else if (a.id < b.id) #greater
          else #equal;
        });
      };
      // "relevance": title match first, then others
      case _ {
        if (q == "") {
          filtered;
        } else {
          filtered.sort(func(a, b) {
            let aTitle = containsIgnoreCase(a.title, q);
            let bTitle = containsIgnoreCase(b.title, q);
            if (aTitle and not bTitle) #less
            else if (not aTitle and bTitle) #greater
            else #equal;
          });
        };
      };
    };

    let total = sorted.size();
    let pageSize = if (params.pageSize == 0) 48 else params.pageSize;
    let startIdx = params.page * pageSize;

    let pageProducts = if (startIdx >= total) {
      [];
    } else {
      let endIdx = if (startIdx + pageSize > total) total else startIdx + pageSize;
      sorted.sliceToArray(startIdx, endIdx);
    };

    { products = pageProducts; total; page = params.page; pageSize };
  };

  /// Seed the products list with sample catalog data
  public func seed(products : List.List<Product>) {
    let items : [Product] = [
      {
        id = 1;
        title = "Apple AirPods Pro (2nd Generation)";
        description = "Active Noise Cancellation, Transparency mode, Personalized Spatial Audio, MagSafe Charging Case. Up to 30 hours of battery life. Sweat and water resistant.";
        price = 249.00;
        salePrice = ?189.99;
        category = #Electronics;
        brand = "Apple";
        images = ["https://picsum.photos/seed/airpods/400/400", "https://picsum.photos/seed/airpods2/400/400"];
        stockQuantity = 85;
        sku = "APPLE-APP-PRO-2";
        rating = 4.8;
        reviewCount = 12430;
        isFeatured = true;
        sellerName = "Apple Authorized Store";
      },
      {
        id = 2;
        title = "Samsung 65\" QLED 4K Smart TV";
        description = "Quantum HDR 12X, 100% Color Volume with Quantum Dot, Object Tracking Sound+, Real Depth Enhancer, Motion Xcelerator Turbo+.";
        price = 1299.99;
        salePrice = ?997.99;
        category = #Electronics;
        brand = "Samsung";
        images = ["https://picsum.photos/seed/samsungtv/400/400", "https://picsum.photos/seed/samsungtv2/400/400"];
        stockQuantity = 32;
        sku = "SAMS-TV-65-QLED";
        rating = 4.6;
        reviewCount = 3872;
        isFeatured = true;
        sellerName = "Samsung Official";
      },
      {
        id = 3;
        title = "Logitech MX Master 3S Wireless Mouse";
        description = "8K DPI any-surface tracking, ultra-quiet clicks, MagSpeed scroll wheel, ergonomic design, USB-C charging, multi-device connectivity.";
        price = 99.99;
        salePrice = null;
        category = #Electronics;
        brand = "Logitech";
        images = ["https://picsum.photos/seed/logimouse/400/400"];
        stockQuantity = 200;
        sku = "LOGI-MX3S-MOUSE";
        rating = 4.7;
        reviewCount = 8901;
        isFeatured = false;
        sellerName = "Logitech Direct";
      },
      {
        id = 4;
        title = "Nike Air Max 270 Sneakers";
        description = "Lightweight, breathable mesh upper with Max Air heel unit for all-day comfort. Rubber outsole for traction. Available in multiple colorways.";
        price = 150.00;
        salePrice = ?109.99;
        category = #Fashion;
        brand = "Nike";
        images = ["https://picsum.photos/seed/nikeairmax/400/400", "https://picsum.photos/seed/nikeairmax2/400/400"];
        stockQuantity = 120;
        sku = "NIKE-AM270-WHT";
        rating = 4.5;
        reviewCount = 5640;
        isFeatured = true;
        sellerName = "Nike Store";
      },
      {
        id = 5;
        title = "Levi's 501 Original Fit Jeans";
        description = "The original blue jean since 1873. Sits at waist, straight leg, button fly. Made with 100% cotton denim for a classic look and comfortable fit.";
        price = 69.50;
        salePrice = null;
        category = #Fashion;
        brand = "Levi's";
        images = ["https://picsum.photos/seed/levisjeans/400/400"];
        stockQuantity = 300;
        sku = "LEVIS-501-32X32";
        rating = 4.4;
        reviewCount = 22100;
        isFeatured = false;
        sellerName = "Levi's Official";
      },
      {
        id = 6;
        title = "Organic Whole Bean Coffee, Dark Roast 2lb";
        description = "USDA certified organic, Fair Trade certified. Rich, bold dark roast with notes of dark chocolate and toasted nuts. Sourced from sustainable farms.";
        price = 24.99;
        salePrice = ?19.99;
        category = #Grocery;
        brand = "Equal Exchange";
        images = ["https://picsum.photos/seed/coffee/400/400"];
        stockQuantity = 500;
        sku = "EE-COFFEE-DB-2LB";
        rating = 4.6;
        reviewCount = 3100;
        isFeatured = false;
        sellerName = "Equal Exchange";
      },
      {
        id = 7;
        title = "KIND Snack Bars Variety Pack, 18 Count";
        description = "Gluten-free snack bars made with whole nuts and real ingredients. Includes Dark Chocolate Nuts & Sea Salt, Caramel Almond & Sea Salt, and more.";
        price = 21.98;
        salePrice = null;
        category = #Grocery;
        brand = "KIND";
        images = ["https://picsum.photos/seed/kindbars/400/400"];
        stockQuantity = 750;
        sku = "KIND-VAR-18CT";
        rating = 4.7;
        reviewCount = 14200;
        isFeatured = false;
        sellerName = "KIND Direct";
      },
      {
        id = 8;
        title = "Atomic Habits by James Clear";
        description = "An easy and proven way to build good habits and break bad ones. Over 15 million copies sold. #1 New York Times bestseller.";
        price = 27.00;
        salePrice = ?16.99;
        category = #Books;
        brand = "Avery Publishing";
        images = ["https://picsum.photos/seed/atomichabits/400/400"];
        stockQuantity = 1000;
        sku = "BOOK-ATOMIC-HC";
        rating = 4.8;
        reviewCount = 98700;
        isFeatured = true;
        sellerName = "Books & More";
      },
      {
        id = 9;
        title = "The Pragmatic Programmer, 20th Anniversary Edition";
        description = "Your journey to mastery. Timeless advice on software development, covering career, code quality, debugging, and pragmatic practices.";
        price = 59.99;
        salePrice = null;
        category = #Books;
        brand = "Addison-Wesley";
        images = ["https://picsum.photos/seed/pragprog/400/400"];
        stockQuantity = 400;
        sku = "BOOK-PRAGPROG-20";
        rating = 4.7;
        reviewCount = 6720;
        isFeatured = false;
        sellerName = "Tech Books Hub";
      },
      {
        id = 10;
        title = "Instant Pot Duo 7-in-1 Electric Pressure Cooker, 6Qt";
        description = "Pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and food warmer. 14 smart programs for one-touch convenience.";
        price = 99.95;
        salePrice = ?79.95;
        category = #Home;
        brand = "Instant Pot";
        images = ["https://picsum.photos/seed/instantpot/400/400", "https://picsum.photos/seed/instantpot2/400/400"];
        stockQuantity = 175;
        sku = "IP-DUO-6QT-7IN1";
        rating = 4.7;
        reviewCount = 87600;
        isFeatured = true;
        sellerName = "Instant Pot Store";
      },
      {
        id = 11;
        title = "Dyson V15 Detect Cordless Vacuum Cleaner";
        description = "Laser detects microscopic dust. Automatically adapts suction and reports what it's cleaned. Up to 60 min run time. HEPA filtration captures 99.99% of particles.";
        price = 749.99;
        salePrice = null;
        category = #Home;
        brand = "Dyson";
        images = ["https://picsum.photos/seed/dysonv15/400/400"];
        stockQuantity = 60;
        sku = "DYSON-V15-DET";
        rating = 4.6;
        reviewCount = 4350;
        isFeatured = false;
        sellerName = "Dyson Official";
      },
      {
        id = 12;
        title = "Patagonia Men's Better Sweater Fleece Jacket";
        description = "Classic sweater-knit fleece with a zip-up front. Made from 100% recycled polyester fleece. Regular fit, multiple pockets, available in many colors.";
        price = 139.00;
        salePrice = null;
        category = #Fashion;
        brand = "Patagonia";
        images = ["https://picsum.photos/seed/patagonia/400/400"];
        stockQuantity = 95;
        sku = "PAT-BS-FLEECE-M";
        rating = 4.8;
        reviewCount = 7890;
        isFeatured = false;
        sellerName = "Patagonia";
      }
    ];
    for (item in items.values()) {
      products.add(item);
    };
  };
}
