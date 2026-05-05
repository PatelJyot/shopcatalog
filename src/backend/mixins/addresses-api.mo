import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AddressTypes "../types/addresses";
import AddressesLib "../lib/addresses";

mixin (
  addresses : List.List<AddressTypes.UserAddress>,
) {
  var nextAddressId : Nat = 1;

  public shared ({ caller }) func createAddress(req : AddressTypes.CreateAddressRequest) : async AddressTypes.UserAddress {
    if (caller == (Principal.anonymous())) Runtime.trap("Not authenticated");
    let addr = AddressesLib.createAddress(addresses, caller, req, nextAddressId);
    nextAddressId += 1;
    addr;
  };

  public shared query ({ caller }) func getSavedAddresses() : async [AddressTypes.UserAddress] {
    AddressesLib.getSavedAddresses(addresses, caller);
  };
}
