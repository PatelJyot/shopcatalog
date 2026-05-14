import List "mo:core/List";
import Time "mo:core/Time";
import OrderTypes "types/orders";

module {
  // Old types copied from .old/src/backend/types/orders.mo
  type OldOrderItem = {
    productId : Nat;
    title : Text;
    image : Text;
    price : Float;
    quantity : Nat;
  };

  type OldAddressSnapshot = {
    name : Text;
    phone : Text;
    addressLine1 : Text;
    addressLine2 : Text;
    city : Text;
    state : Text;
    pinCode : Text;
  };

  type OldPaymentMethod = { #UPI : Text; #Card : Text; #COD };
  type OldPaymentStatus = { #Pending; #Paid; #Failed };

  // Old OrderStatus had 5 PascalCase variants
  type OldOrderStatus = {
    #Pending;
    #Confirmed;
    #Shipped;
    #Delivered;
    #Cancelled;
  };

  type OldOrder = {
    id : Nat;
    userId : Principal;
    items : [OldOrderItem];
    totalPrice : Float;
    subtotal : Float;
    taxAmount : Float;
    deliveryCharge : Float;
    shippingAddress : OldAddressSnapshot;
    paymentMethod : OldPaymentMethod;
    paymentStatus : OldPaymentStatus;
    orderStatus : OldOrderStatus;
    createdAt : Time.Time;
  };

  type OldActor = {
    orders : List.List<OldOrder>;
  };

  type NewActor = {
    orders : List.List<OrderTypes.Order>;
  };

  func migrateStatus(s : OldOrderStatus) : OrderTypes.OrderStatus {
    switch (s) {
      case (#Pending) #placed;
      case (#Confirmed) #confirmed;
      case (#Shipped) #shipped;
      case (#Delivered) #delivered;
      case (#Cancelled) #cancelled;
    };
  };

  public func run(old : OldActor) : NewActor {
    let orders = old.orders.map<OldOrder, OrderTypes.Order>(
      func(o) : OrderTypes.Order {
        {
          id = o.id;
          userId = o.userId;
          items = o.items;
          totalPrice = o.totalPrice;
          subtotal = o.subtotal;
          taxAmount = o.taxAmount;
          deliveryCharge = o.deliveryCharge;
          shippingAddress = o.shippingAddress;
          paymentMethod = o.paymentMethod;
          paymentStatus = o.paymentStatus;
          orderStatus = migrateStatus(o.orderStatus);
          trackingNumber = null;
          estimatedDeliveryDate = null;
          createdAt = o.createdAt;
          updatedAt = o.createdAt;
        };
      }
    );
    { orders };
  };
}
