import { m as useActor, t as useQuery, v as useQueryClient, n as ue, o as createActor } from "./index-CDI_idwZ.js";
import { u as useMutation } from "./useMutation-BJHgXTJq.js";
const ORDER_STATUSES = [
  "placed",
  "confirmed",
  "packed",
  "shipped",
  "outForDelivery",
  "delivered"
];
function getStatusLabel(status) {
  const labels = {
    placed: "Order Placed",
    confirmed: "Confirmed",
    packed: "Packed",
    shipped: "Shipped",
    outForDelivery: "Out for Delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
    returned: "Returned"
  };
  return labels[status] ?? status;
}
function getStatusCssClass(status) {
  const classes = {
    placed: "status-placed",
    confirmed: "status-confirmed",
    packed: "status-packed",
    shipped: "status-shipped",
    outForDelivery: "status-out-for-delivery",
    delivered: "status-delivered",
    cancelled: "status-cancelled",
    returned: "status-returned"
  };
  return classes[status] ?? "status-placed";
}
function isActiveOrder(status) {
  return ["placed", "confirmed", "packed", "shipped", "outForDelivery"].includes(status);
}
function isCompletedOrder(status) {
  return status === "delivered";
}
function isCancelledOrder(status) {
  return ["cancelled", "returned"].includes(status);
}
function canCancelOrder(status) {
  return ["placed", "confirmed"].includes(status);
}
function canReturnOrder(order) {
  if (order.orderStatus !== "delivered") return false;
  const sevenDaysMs = BigInt(7 * 24 * 60 * 60 * 1e9);
  const now = BigInt(Date.now()) * BigInt(1e6);
  return now - order.updatedAt <= sevenDaysMs;
}
function formatPrice(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}
function formatDate(timestamp) {
  const ms = Number(timestamp / BigInt(1e6));
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(ms));
}
function useOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUserOrders();
    },
    enabled: !!actor && !isFetching,
    refetchOnWindowFocus: true,
    staleTime: 6e4
  });
}
function useOrder(orderId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["order", orderId == null ? void 0 : orderId.toString()],
    queryFn: async () => {
      if (!actor || orderId === void 0) return null;
      return actor.getOrder(orderId);
    },
    enabled: !!actor && !isFetching && orderId !== void 0,
    staleTime: 3e4
  });
}
function useCancelOrder() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId) => {
      if (!actor) throw new Error("Not connected");
      return actor.cancelOrder(orderId);
    },
    onSuccess: (order) => {
      if (order) {
        ue.success("Order cancelled", {
          description: `Order #${order.id} has been cancelled.`
        });
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        queryClient.invalidateQueries({
          queryKey: ["order", order.id.toString()]
        });
      }
    },
    onError: () => {
      ue.error("Failed to cancel order", {
        description: "Please try again or contact support."
      });
    }
  });
}
function useReturnOrder() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId) => {
      if (!actor) throw new Error("Not connected");
      return actor.returnOrder(orderId);
    },
    onSuccess: (order) => {
      if (order) {
        ue.success("Return requested", {
          description: `Return/replacement for Order #${order.id} has been initiated.`
        });
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        queryClient.invalidateQueries({
          queryKey: ["order", order.id.toString()]
        });
      }
    },
    onError: () => {
      ue.error("Failed to request return", {
        description: "Please try again or contact support."
      });
    }
  });
}
function useUpdateOrderStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId, status }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateOrderStatus(orderId, status);
    },
    onSuccess: (order) => {
      if (order) {
        ue.success("Status updated", {
          description: `Order #${order.id} is now ${getStatusLabel(order.orderStatus)}.`
        });
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        queryClient.invalidateQueries({
          queryKey: ["order", order.id.toString()]
        });
        queryClient.invalidateQueries({ queryKey: ["allOrders"] });
      }
    },
    onError: () => {
      ue.error("Failed to update status");
    }
  });
}
function useAllOrders(offset, limit) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["allOrders", offset.toString(), limit.toString()],
    queryFn: async () => {
      if (!actor) return { orders: [], total: BigInt(0) };
      return actor.getAllOrders(offset, limit);
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4
  });
}
export {
  ORDER_STATUSES as O,
  isCompletedOrder as a,
  isCancelledOrder as b,
  formatPrice as c,
  getStatusCssClass as d,
  useOrder as e,
  formatDate as f,
  getStatusLabel as g,
  canCancelOrder as h,
  isActiveOrder as i,
  canReturnOrder as j,
  useCancelOrder as k,
  useReturnOrder as l,
  useAllOrders as m,
  useUpdateOrderStatus as n,
  useOrders as u
};
