import List "mo:core/List";
import CartTypes "../types/cart";
import ProductTypes "../types/products";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

module {
  public type CartItem = CartTypes.CartItem;
  public type CartItemView = CartTypes.CartItemView;

  public func addToCart(
    cartItems : List.List<CartItem>,
    userId : Principal,
    productId : Nat,
    quantity : Nat,
    nextId : Nat,
  ) : CartItem {
    switch (cartItems.find(func(i) { Principal.equal(i.userId, userId) and i.productId == productId })) {
      case (?_existing) {
        cartItems.mapInPlace(func(i) {
          if (Principal.equal(i.userId, userId) and i.productId == productId) {
            { i with quantity = i.quantity + quantity; updatedAt = Time.now() }
          } else { i }
        });
        switch (cartItems.find(func(i) { Principal.equal(i.userId, userId) and i.productId == productId })) {
          case (?updated) updated;
          case null Runtime.trap("unreachable");
        };
      };
      case null {
        let item : CartItem = {
          id = nextId;
          userId;
          productId;
          quantity;
          addedAt = Time.now();
          updatedAt = Time.now();
        };
        cartItems.add(item);
        item;
      };
    };
  };

  public func removeFromCart(
    cartItems : List.List<CartItem>,
    userId : Principal,
    cartItemId : Nat,
  ) : Bool {
    let sizeBefore = cartItems.size();
    let filtered = cartItems.filter(func(i) { not (i.id == cartItemId and Principal.equal(i.userId, userId)) });
    cartItems.clear();
    cartItems.addAll(filtered.values());
    cartItems.size() < sizeBefore;
  };

  public func updateCartQuantity(
    cartItems : List.List<CartItem>,
    userId : Principal,
    cartItemId : Nat,
    quantity : Nat,
  ) : Bool {
    var found = false;
    cartItems.mapInPlace(func(i) {
      if (i.id == cartItemId and Principal.equal(i.userId, userId)) {
        found := true;
        { i with quantity; updatedAt = Time.now() }
      } else { i }
    });
    found;
  };

  public func getCartItems(
    cartItems : List.List<CartItem>,
    userId : Principal,
  ) : [CartItem] {
    cartItems.filter(func(i) { Principal.equal(i.userId, userId) }).toArray();
  };

  public func buildCartView(
    items : [CartItem],
    products : List.List<ProductTypes.Product>,
  ) : [CartItemView] {
    items.filterMap<CartItem, CartItemView>(func(item) : ?CartItemView {
      switch (products.find(func(p) { p.id == item.productId })) {
        case (?p) {
          let image = if (p.images.size() > 0) p.images[0] else "";
          ?{
            id = item.id;
            productId = item.productId;
            title = p.title;
            image;
            price = p.price;
            salePrice = p.salePrice;
            quantity = item.quantity;
            addedAt = item.addedAt;
            updatedAt = item.updatedAt;
          };
        };
        case null null;
      };
    });
  };

  public func clearCart(
    cartItems : List.List<CartItem>,
    userId : Principal,
  ) : () {
    let remaining = cartItems.filter(func(i) { not Principal.equal(i.userId, userId) });
    cartItems.clear();
    cartItems.addAll(remaining.values());
  };
}
