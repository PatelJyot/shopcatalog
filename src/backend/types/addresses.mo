import Time "mo:core/Time";

module {
  public type UserAddress = {
    id : Nat;
    userId : Principal;
    name : Text;
    phone : Text;
    addressLine1 : Text;
    addressLine2 : Text;
    city : Text;
    state : Text;
    pinCode : Text;
    isDefault : Bool;
    createdAt : Time.Time;
  };

  public type CreateAddressRequest = {
    name : Text;
    phone : Text;
    addressLine1 : Text;
    addressLine2 : Text;
    city : Text;
    state : Text;
    pinCode : Text;
    isDefault : Bool;
  };
}
