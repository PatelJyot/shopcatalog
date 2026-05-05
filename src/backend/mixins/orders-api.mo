import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import CartTypes "../types/cart";
import OrderTypes "../types/orders";
import ProductTypes "../types/products";
import OrdersLib "../lib/orders";
import CartLib "../lib/cart";

mixin (
  orders : List.List<OrderTypes.Order>,
  cartItems : List.List<CartTypes.CartItem>,
  products : List.List<ProductTypes.Product>,
) {
  var nextOrderId : Nat = 1;

  public shared ({ caller }) func createOrder(req : OrderTypes.CreateOrderRequest) : async OrderTypes.Order {
    if (caller == (Principal.anonymous())) Runtime.trap("Not authenticated");
    let order = OrdersLib.createOrder(orders, cartItems, products, caller, req, nextOrderId);
    nextOrderId += 1;
    CartLib.clearCart(cartItems, caller);
    order;
  };

  public shared query ({ caller }) func getOrder(orderId : Nat) : async ?OrderTypes.Order {
    OrdersLib.getOrder(orders, caller, orderId);
  };

  public shared query ({ caller }) func getUserOrders() : async [OrderTypes.Order] {
    OrdersLib.getUserOrders(orders, caller);
  };
}
