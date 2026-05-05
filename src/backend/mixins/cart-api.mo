import List "mo:core/List";
import Runtime "mo:core/Runtime";
import CartTypes "../types/cart";
import ProductTypes "../types/products";
import CartLib "../lib/cart";
import Principal "mo:core/Principal";

mixin (
  cartItems : List.List<CartTypes.CartItem>,
  products : List.List<ProductTypes.Product>,
) {
  var nextCartId : Nat = 1;

  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat) : async CartTypes.CartItem {
    if (caller == (Principal.anonymous())) Runtime.trap("Not authenticated");
    let item = CartLib.addToCart(cartItems, caller, productId, quantity, nextCartId);
    nextCartId += 1;
    item;
  };

  public shared ({ caller }) func removeFromCart(cartItemId : Nat) : async Bool {
    if (caller == (Principal.anonymous())) Runtime.trap("Not authenticated");
    CartLib.removeFromCart(cartItems, caller, cartItemId);
  };

  public shared ({ caller }) func updateCartQuantity(cartItemId : Nat, quantity : Nat) : async Bool {
    if (caller == (Principal.anonymous())) Runtime.trap("Not authenticated");
    CartLib.updateCartQuantity(cartItems, caller, cartItemId, quantity);
  };

  public shared query ({ caller }) func getCart() : async [CartTypes.CartItemView] {
    let items = CartLib.getCartItems(cartItems, caller);
    CartLib.buildCartView(items, products);
  };

  public shared ({ caller }) func clearCart() : async () {
    if (caller == (Principal.anonymous())) Runtime.trap("Not authenticated");
    CartLib.clearCart(cartItems, caller);
  };
}
