import List "mo:core/List";
import Types "types/products";
import ProductsApi "mixins/products-api";
import ProductsLib "lib/products";

actor {
  let products = List.empty<Types.Product>();
  ProductsLib.seed(products);
  include ProductsApi(products);
}
