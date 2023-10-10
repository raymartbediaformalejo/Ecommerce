import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/home/Home";
import ProductsPage from "./pages/products/Products";
import SearchPage from "./pages/products/Search";
import SingleProduct from "./pages/products/SingleProduct";
import CartPage from "./pages/cart/Cart";
import ProfilePage from "./pages/profile/ProfilePage";
import LoginPage from "./pages/sign/Login";
import SignUpPage from "./pages/sign/SignUp";
import AuthGuardedRoute from "./pages/AuthGuardedRoute";
import CheckoutPage from "./pages/checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      { path: "product/:productId", element: <SingleProduct /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "search", element: <SearchPage /> },
      {
        element: <AuthGuardedRoute />,
        children: [{ path: "/profile", element: <ProfilePage /> }],
      },
    ],
  },
  { path: "login", element: <LoginPage /> },
  { path: "signup", element: <SignUpPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
