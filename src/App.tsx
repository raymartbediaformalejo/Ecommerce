import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/home/Home";
import ProductsPage from "./pages/products/Products";
import SearchPage from "./pages/products/Search";
import SingleProduct from "./pages/products/SingleProduct";
import CartPage from "./pages/cart/Cart";

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

      { path: "search", element: <SearchPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
