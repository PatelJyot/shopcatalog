import List "mo:core/List";
import CartTypes "../types/cart";
import OrderTypes "../types/orders";
import ProductTypes "../types/products";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Float "mo:core/Float";

module {
  public type Order = OrderTypes.Order;
  public type OrderItem = OrderTypes.OrderItem;
  public type CreateOrderRequest = OrderTypes.CreateOrderRequest;

  public func createOrder(
    orders : List.List<Order>,
    cartItems : List.List<CartTypes.CartItem>,
    products : List.List<ProductTypes.Product>,
    userId : Principal,
    req : CreateOrderRequest,
    nextId : Nat,
  ) : Order {
    let userItems = cartItems.filter(func(i) { Principal.equal(i.userId, userId) });
    if (userItems.size() == 0) Runtime.trap("Cart is empty");

    let orderItems = userItems.filterMap<CartTypes.CartItem, OrderItem>(func(item) : ?OrderItem {
      switch (products.find(func(p) { p.id == item.productId })) {
        case (?p) {
          let price = switch (p.salePrice) { case (?sp) sp; case null p.price };
          let image = if (p.images.size() > 0) p.images[0] else "";
          ?{ productId = p.id; title = p.title; image; price; quantity = item.quantity };
        };
        case null null;
      };
    }).toArray();

    let subtotal = orderItems.foldLeft(0.0, func(acc, i) : Float {
      acc + i.price * i.quantity.toFloat()
    });
    let (_, taxAmount, deliveryCharge, total) = calculateTotals(subtotal);

    let paymentStatus : OrderTypes.PaymentStatus = switch (req.paymentMethod) {
      case (#COD) #Pending;
      case (#UPI _) #Paid;
      case (#Card _) #Paid;
    };

    let order : Order = {
      id = nextId;
      userId;
      items = orderItems;
      subtotal;
      taxAmount;
      deliveryCharge;
      totalPrice = total;
      shippingAddress = req.shippingAddress;
      paymentMethod = req.paymentMethod;
      paymentStatus;
      orderStatus = #Pending;
      createdAt = Time.now();
    };
    orders.add(order);
    order;
  };

  public func getOrder(
    orders : List.List<Order>,
    userId : Principal,
    orderId : Nat,
  ) : ?Order {
    orders.find(func(o) { o.id == orderId and Principal.equal(o.userId, userId) });
  };

  public func getUserOrders(
    orders : List.List<Order>,
    userId : Principal,
  ) : [Order] {
    orders.filter(func(o) { Principal.equal(o.userId, userId) }).toArray();
  };

  // Returns (subtotal, taxAmount, deliveryCharge, total)
  public func calculateTotals(subtotal : Float) : (Float, Float, Float, Float) {
    let taxAmount = subtotal * 0.18;
    let deliveryCharge = if (subtotal >= 499.0) 0.0 else 50.0;
    let total = subtotal + taxAmount + deliveryCharge;
    (subtotal, taxAmount, deliveryCharge, total);
  };
}
