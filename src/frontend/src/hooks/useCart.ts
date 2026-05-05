import { createActor } from "@/backend";
import type { CartItem, Product } from "@/types/product";
import { useActor } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect, useState } from "react";

const CART_STORAGE_KEY = "shopcentral_cart";

function loadCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const { actor, isFetching } = useActor(createActor);

  // Persist to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Sync from backend when authenticated
  useEffect(() => {
    if (!actor || isFetching) return;
    actor
      .getCart()
      .then((backendItems) => {
        if (backendItems.length > 0) {
          // Merge backend items into local cart as source of truth
          const merged: CartItem[] = backendItems.map((bi) => ({
            product: {
              id: String(bi.productId),
              title: bi.title,
              description: "",
              price: bi.price,
              salePrice: bi.salePrice ?? null,
              category: "",
              brand: "",
              images: [bi.image],
              stockQuantity: 0,
              sku: "",
              rating: 0,
              reviewCount: 0,
              isFeatured: false,
              sellerName: "",
            },
            quantity: Number(bi.quantity),
          }));
          setItems(merged);
        }
      })
      .catch(() => {
        /* fall back to localStorage */
      });
  }, [actor, isFetching]);

  const addToCart = useCallback(
    (product: Product, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.product.id === product.id);
        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          );
        }
        return [...prev, { product, quantity }];
      });
      // Optimistically sync to backend
      if (actor) {
        actor.addToCart(BigInt(product.id), BigInt(quantity)).catch(() => {});
      }
    },
    [actor],
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      setItems((prev) => {
        const item = prev.find((i) => i.product.id === productId);
        if (item && actor) {
          // cartItemId == productId in view, use productId as bigint
          actor.removeFromCart(BigInt(productId)).catch(() => {});
        }
        return prev.filter((i) => i.product.id !== productId);
      });
    },
    [actor],
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        setItems((prev) => prev.filter((i) => i.product.id !== productId));
        if (actor) actor.removeFromCart(BigInt(productId)).catch(() => {});
        return;
      }
      setItems((prev) =>
        prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
      );
      if (actor) {
        actor
          .updateCartQuantity(BigInt(productId), BigInt(quantity))
          .catch(() => {});
      }
    },
    [actor],
  );

  const clearCart = useCallback(() => {
    setItems([]);
    if (actor) actor.clearCart().catch(() => {});
  }, [actor]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + (i.product.salePrice ?? i.product.price) * i.quantity,
    0,
  );

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };
}
