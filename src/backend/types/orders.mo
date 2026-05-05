import Time "mo:core/Time";

module {
  public type OrderItem = {
    productId : Nat;
    title : Text;
    image : Text;
    price : Float;
    quantity : Nat;
  };

  public type AddressSnapshot = {
    name : Text;
    phone : Text;
    addressLine1 : Text;
    addressLine2 : Text;
    city : Text;
    state : Text;
    pinCode : Text;
  };

  public type PaymentMethod = {
    #UPI : Text;
    #Card : Text;
    #COD;
  };

  public type PaymentStatus = {
    #Pending;
    #Paid;
    #Failed;
  };

  public type OrderStatus = {
    #Pending;
    #Confirmed;
    #Shipped;
    #Delivered;
    #Cancelled;
  };

  public type Order = {
    id : Nat;
    userId : Principal;
    items : [OrderItem];
    totalPrice : Float;
    subtotal : Float;
    taxAmount : Float;
    deliveryCharge : Float;
    shippingAddress : AddressSnapshot;
    paymentMethod : PaymentMethod;
    paymentStatus : PaymentStatus;
    orderStatus : OrderStatus;
    createdAt : Time.Time;
  };

  public type CreateOrderRequest = {
    shippingAddress : AddressSnapshot;
    paymentMethod : PaymentMethod;
  };
}
