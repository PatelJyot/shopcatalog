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
  notifications : List.List<OrderTypes.OrderNotification>,
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

  public shared ({ caller }) func updateOrderStatus(orderId : Nat, newStatus : OrderTypes.OrderStatus) : async ?OrderTypes.Order {
    if (caller == (Principal.anonymous())) Runtime.trap("Not authenticated");
    OrdersLib.updateOrderStatus(orders, notifications, orderId, newStatus);
  };

  public shared query ({ caller = _ }) func getAllOrders(offset : Nat, limit : Nat) : async OrderTypes.PaginatedOrders {
    OrdersLib.getAllOrders(orders, offset, limit);
  };

  public shared ({ caller }) func cancelOrder(orderId : Nat) : async ?OrderTypes.Order {
    if (caller == (Principal.anonymous())) Runtime.trap("Not authenticated");
    OrdersLib.cancelOrder(orders, notifications, caller, orderId);
  };

  public shared ({ caller }) func returnOrder(orderId : Nat) : async ?OrderTypes.Order {
    if (caller == (Principal.anonymous())) Runtime.trap("Not authenticated");
    OrdersLib.returnOrder(orders, notifications, caller, orderId);
  };

  public shared query ({ caller }) func getOrderNotifications() : async [OrderTypes.OrderNotification] {
    if (caller == (Principal.anonymous())) Runtime.trap("Not authenticated");
    OrdersLib.getOrderNotifications(notifications, caller);
  };
}
