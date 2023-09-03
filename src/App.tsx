import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/home/Home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

import axios from "axios";

interface Product {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumnail: string;
  title: string;
}

interface ProductsByCategory {
  [category: string]: Product[];
}

const Categories = [
  "tops",
  "womens-dresses",
  "womens-shoes",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "womens-watches",
  "womens-bags",
  "womens-jewellery",
  "sunglasses",
];

// const fetchDataByCategory = async (category: string): Promise<Product[]> => {
//   try {
//     const response = await axios.get(
//       `https://dummyjson.com/products/category/${category}`
//     );
//     return response.data?.products;
//   } catch (error) {
//     console.error(`Error fetching data for category ${category}:`, error);
//     return [];
//   }
// };

function App() {
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        `https://dummyjson.com/products/category/womens-jewellery`
      );

      // const productsByCategory: ProductsByCategory = {};
      // console.log(productsByCategory);

      // for (const category of Categories) {
      //   const products = await fetchDataByCategory(category);
      //   productsByCategory[category] = products;
      // }
    };

    fetchProducts();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
