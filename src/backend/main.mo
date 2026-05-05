import List "mo:core/List";
import ProductTypes "types/products";
import CartTypes "types/cart";
import OrderTypes "types/orders";
import AddressTypes "types/addresses";
import ProductsApi "mixins/products-api";
import CartApi "mixins/cart-api";
import OrdersApi "mixins/orders-api";
import AddressesApi "mixins/addresses-api";
import ProductsLib "lib/products";

actor {
  let products = List.empty<ProductTypes.Product>();
  ProductsLib.seed(products);

  let cartItems = List.empty<CartTypes.CartItem>();

  let orders = List.empty<OrderTypes.Order>();

  let addresses = List.empty<AddressTypes.UserAddress>();

  include ProductsApi(products);
  include CartApi(cartItems, products);
  include OrdersApi(orders, cartItems, products);
  include AddressesApi(addresses);
}
