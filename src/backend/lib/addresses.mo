import List "mo:core/List";
import AddressTypes "../types/addresses";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

module {
  public type UserAddress = AddressTypes.UserAddress;
  public type CreateAddressRequest = AddressTypes.CreateAddressRequest;

  public func createAddress(
    addresses : List.List<UserAddress>,
    userId : Principal,
    req : CreateAddressRequest,
    nextId : Nat,
  ) : UserAddress {
    if (req.isDefault) {
      let updated = addresses.map<UserAddress, UserAddress>(func(a) {
        if (Principal.equal(a.userId, userId) and a.isDefault) { { a with isDefault = false } } else { a }
      });
      addresses.clear();
      addresses.addAll(updated.values());
    };
    let addr : UserAddress = {
      id = nextId;
      userId;
      name = req.name;
      phone = req.phone;
      addressLine1 = req.addressLine1;
      addressLine2 = req.addressLine2;
      city = req.city;
      state = req.state;
      pinCode = req.pinCode;
      isDefault = req.isDefault;
      createdAt = Time.now();
    };
    addresses.add(addr);
    addr;
  };

  public func getSavedAddresses(
    addresses : List.List<UserAddress>,
    userId : Principal,
  ) : [UserAddress] {
    addresses.filter(func(a) { Principal.equal(a.userId, userId) }).toArray();
  };
}
