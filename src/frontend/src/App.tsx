import Layout from "@/components/Layout";
import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("@/pages/Home"));
const ProductsPage = lazy(() => import("@/pages/Products"));
const ProductDetailPage = lazy(() => import("@/pages/ProductDetail"));
const CartPage = lazy(() => import("@/pages/Cart"));
const SearchPage = lazy(() => import("@/pages/Search"));
const CategoryPage = lazy(() => import("@/pages/Category"));
const CheckoutPage = lazy(() => import("@/pages/Checkout"));
const OrderSuccessPage = lazy(() => import("@/pages/OrderSuccess"));
const WriteReviewPage = lazy(() => import("@/pages/WriteReview"));
const MyOrdersPage = lazy(() => import("@/pages/MyOrders"));
const OrderDetailPage = lazy(() => import("@/pages/OrderDetail"));
const AdminOrdersPage = lazy(() => import("@/pages/AdminOrders"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  ),
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProductsPage />
    </Suspense>
  ),
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProductDetailPage />
    </Suspense>
  ),
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CartPage />
    </Suspense>
  ),
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SearchPage />
    </Suspense>
  ),
});

const categoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/category/$name",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CategoryPage />
    </Suspense>
  ),
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CheckoutPage />
    </Suspense>
  ),
});

const orderSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order-success",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <OrderSuccessPage />
    </Suspense>
  ),
});

const writeReviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id/review",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <WriteReviewPage />
    </Suspense>
  ),
});

const myOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <MyOrdersPage />
    </Suspense>
  ),
});

const orderDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order/$id",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <OrderDetailPage />
    </Suspense>
  ),
});

const adminOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/orders",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminOrdersPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  productsRoute,
  productDetailRoute,
  cartRoute,
  searchRoute,
  categoryRoute,
  checkoutRoute,
  orderSuccessRoute,
  writeReviewRoute,
  myOrdersRoute,
  orderDetailRoute,
  adminOrdersRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" richColors />
    </>
  );
}
