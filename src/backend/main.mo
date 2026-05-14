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
import ReviewTypes "types/reviews";
import ReviewsApi "mixins/reviews-api";
import Migration "migration";

(with migration = Migration.run)
actor {
  let products = List.empty<ProductTypes.Product>();
  ProductsLib.seed(products);

  let cartItems = List.empty<CartTypes.CartItem>();

  let orders = List.empty<OrderTypes.Order>();
  let orderNotifications = List.empty<OrderTypes.OrderNotification>();

  let addresses = List.empty<AddressTypes.UserAddress>();

  let reviews = List.empty<ReviewTypes.Review>();
  let nextReviewId = { var value : Nat = 0 };

  include ProductsApi(products);
  include CartApi(cartItems, products);
  include OrdersApi(orders, cartItems, products, orderNotifications);
  include AddressesApi(addresses);
  include ReviewsApi(reviews, products, orders, nextReviewId);
}
