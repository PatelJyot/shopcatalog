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

    let now = Time.now();
    let sevenDaysNs : Int = 7 * 24 * 3600 * 1_000_000_000;
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
      orderStatus = #placed;
      trackingNumber = null;
      estimatedDeliveryDate = ?(now + sevenDaysNs);
      createdAt = now;
      updatedAt = now;
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

  public func updateOrderStatus(
    orders : List.List<Order>,
    notifications : List.List<OrderTypes.OrderNotification>,
    orderId : Nat,
    newStatus : OrderTypes.OrderStatus,
  ) : ?Order {
    switch (orders.findIndex(func(o) { o.id == orderId })) {
      case null null;
      case (?idx) {
        let old = orders.at(idx);
        let now = Time.now();
        let updated : Order = { old with orderStatus = newStatus; updatedAt = now };
        orders.put(idx, updated);
        let note : OrderTypes.OrderNotification = {
          orderId;
          userId = old.userId;
          oldStatus = old.orderStatus;
          newStatus;
          timestamp = now;
          message = "Your order status has been updated.";
        };
        notifications.add(note);
        ?updated;
      };
    };
  };

  public func getAllOrders(
    orders : List.List<Order>,
    offset : Nat,
    limit : Nat,
  ) : OrderTypes.PaginatedOrders {
    let total = orders.size();
    let arr = orders.sliceToArray(offset.toInt(), (offset + limit).toInt());
    { orders = arr; total };
  };

  public func cancelOrder(
    orders : List.List<Order>,
    notifications : List.List<OrderTypes.OrderNotification>,
    userId : Principal,
    orderId : Nat,
  ) : ?Order {
    switch (orders.findIndex(func(o) { o.id == orderId and Principal.equal(o.userId, userId) })) {
      case null null;
      case (?idx) {
        let old = orders.at(idx);
        let cancellable = switch (old.orderStatus) {
          case (#placed) true;
          case (#confirmed) true;
          case _ false;
        };
        if (not cancellable) Runtime.trap("Order cannot be cancelled at this stage");
        let now = Time.now();
        let updated : Order = { old with orderStatus = #cancelled; updatedAt = now };
        orders.put(idx, updated);
        let note : OrderTypes.OrderNotification = {
          orderId;
          userId;
          oldStatus = old.orderStatus;
          newStatus = #cancelled;
          timestamp = now;
          message = "Your order has been cancelled.";
        };
        notifications.add(note);
        ?updated;
      };
    };
  };

  public func returnOrder(
    orders : List.List<Order>,
    notifications : List.List<OrderTypes.OrderNotification>,
    userId : Principal,
    orderId : Nat,
  ) : ?Order {
    switch (orders.findIndex(func(o) { o.id == orderId and Principal.equal(o.userId, userId) })) {
      case null null;
      case (?idx) {
        let old = orders.at(idx);
        switch (old.orderStatus) {
          case (#delivered) {};
          case _ Runtime.trap("Order is not eligible for return");
        };
        let sevenDaysNs : Int = 7 * 24 * 3600 * 1_000_000_000;
        let now = Time.now();
        if (now - old.updatedAt > sevenDaysNs) Runtime.trap("Return window has expired");
        let updated : Order = { old with orderStatus = #returned; updatedAt = now };
        orders.put(idx, updated);
        let note : OrderTypes.OrderNotification = {
          orderId;
          userId;
          oldStatus = old.orderStatus;
          newStatus = #returned;
          timestamp = now;
          message = "Your return request has been initiated.";
        };
        notifications.add(note);
        ?updated;
      };
    };
  };

  public func getOrderNotifications(
    notifications : List.List<OrderTypes.OrderNotification>,
    userId : Principal,
  ) : [OrderTypes.OrderNotification] {
    notifications.filter(func(n) { Principal.equal(n.userId, userId) }).toArray();
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
