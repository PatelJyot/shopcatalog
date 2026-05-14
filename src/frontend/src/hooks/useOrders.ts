import { createActor } from "@/backend";
import type { Order, OrderStatus } from "@/backend";
import { getStatusLabel } from "@/types/orders";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function useOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUserOrders();
    },
    enabled: !!actor && !isFetching,
    refetchOnWindowFocus: true,
    staleTime: 60_000,
  });
}

export function useOrder(orderId: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Order | null>({
    queryKey: ["order", orderId?.toString()],
    queryFn: async () => {
      if (!actor || orderId === undefined) return null;
      return actor.getOrder(orderId);
    },
    enabled: !!actor && !isFetching && orderId !== undefined,
    staleTime: 30_000,
  });
}

export function useCancelOrder() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<Order | null, Error, bigint>({
    mutationFn: async (orderId) => {
      if (!actor) throw new Error("Not connected");
      return actor.cancelOrder(orderId);
    },
    onSuccess: (order) => {
      if (order) {
        toast.success("Order cancelled", {
          description: `Order #${order.id} has been cancelled.`,
        });
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        queryClient.invalidateQueries({
          queryKey: ["order", order.id.toString()],
        });
      }
    },
    onError: () => {
      toast.error("Failed to cancel order", {
        description: "Please try again or contact support.",
      });
    },
  });
}

export function useReturnOrder() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<Order | null, Error, bigint>({
    mutationFn: async (orderId) => {
      if (!actor) throw new Error("Not connected");
      return actor.returnOrder(orderId);
    },
    onSuccess: (order) => {
      if (order) {
        toast.success("Return requested", {
          description: `Return/replacement for Order #${order.id} has been initiated.`,
        });
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        queryClient.invalidateQueries({
          queryKey: ["order", order.id.toString()],
        });
      }
    },
    onError: () => {
      toast.error("Failed to request return", {
        description: "Please try again or contact support.",
      });
    },
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    Order | null,
    Error,
    { orderId: bigint; status: OrderStatus }
  >({
    mutationFn: async ({ orderId, status }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateOrderStatus(orderId, status);
    },
    onSuccess: (order) => {
      if (order) {
        toast.success("Status updated", {
          description: `Order #${order.id} is now ${getStatusLabel(order.orderStatus)}.`,
        });
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        queryClient.invalidateQueries({
          queryKey: ["order", order.id.toString()],
        });
        queryClient.invalidateQueries({ queryKey: ["allOrders"] });
      }
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });
}

export function useAllOrders(offset: bigint, limit: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["allOrders", offset.toString(), limit.toString()],
    queryFn: async () => {
      if (!actor) return { orders: [], total: BigInt(0) };
      return actor.getAllOrders(offset, limit);
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useOrderNotifications() {
  const { actor, isFetching } = useActor(createActor);
  const seenIds = useRef<Set<string>>(new Set());

  const query = useQuery({
    queryKey: ["orderNotifications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getOrderNotifications();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
    staleTime: 25_000,
  });

  useEffect(() => {
    const notifications = query.data ?? [];
    for (const notif of notifications) {
      const key = `${notif.orderId}-${notif.timestamp}`;
      if (!seenIds.current.has(key)) {
        seenIds.current.add(key);
        toast.info(notif.message, {
          description: `Order #${notif.orderId}: ${getStatusLabel(notif.newStatus)}`,
          duration: 6000,
        });
      }
    }
  }, [query.data]);

  return query;
}
