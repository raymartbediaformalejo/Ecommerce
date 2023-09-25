import { nanoid } from "@reduxjs/toolkit";
import { baseApi } from "../index.api";
import {
  TProduct,
  TGetProductProps,
  TGetProductResponse,
  TCategory,
} from "./product.types";
import { TFilters } from "../ui/ProductFilter/productFilter.type";

const CATEGORY = [
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

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<TGetProductResponse, TGetProductProps>({
      query: ({ limit, skip }) => `/products?limit=${limit}&skip=${skip}`,
    }),
    getAllProducts: build.query<TGetProductResponse, void>({
      query: () => "/products?limit=100",
    }),

    getAllTopRatedProducts: build.query<
      TGetProductResponse,
      { category: string; mode: string }
    >({
      query: () => `/products?limit=100`,
      transformResponse: (response: TGetProductResponse, _, arg) => {
        let filteredProducts;
        if (arg.category === "all") {
          filteredProducts = response.products.filter((product) =>
            CATEGORY.includes(product.category)
          );
        } else {
          filteredProducts = response.products.filter((product) =>
            arg.category.includes(product.category)
          );
        }

        let sortByRatingAsc = filteredProducts.sort(
          (a, b) => b.rating - a.rating
        );

        if (arg.mode === "top-4") {
          sortByRatingAsc = sortByRatingAsc.slice(0, 4);
        }

        sortByRatingAsc.map((product) => {
          product.title =
            product.title.charAt(0).toUpperCase() + product.title.slice(1);
        });

        return { ...response, products: sortByRatingAsc };
      },

      providesTags: () => {
        return [{ type: "Product", id: "LIST" }];
      },
    }),

    getProduct: build.query<TProduct, { id: number }>({
      query: ({ id }) => `/products/${id}`,
    }),

    getCategories: build.query<TCategory[], void>({
      query: () => "/products/categories",
      transformResponse: (response: string[]) => {
        const filteredCategory = response.filter((category) =>
          CATEGORY.includes(category)
        );
        return [
          { id: nanoid(), value: "all", name: "All" },

          ...filteredCategory.map((category) => {
            const name = category
              .split("-")
              .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
              .join(" ");
            return {
              id: nanoid(),
              value: category,
              name,
            };
          }),
        ];
      },
    }),

    getCategoryProducts: build.query<
      TGetProductResponse,
      { category: string; mode?: string }
    >({
      query: ({ category }) => `/products/category/${category}`,
      // transformResponse: (response: ),
    }),

    searchProducts: build.query<
      TGetProductResponse,
      { query: string | null; filters: TFilters }
    >({
      query: ({ query }) => `/products/search?q=${query}`,
      transformResponse: (response: TGetProductResponse, _, { filters }) => {
        const filteredProducts = response.products.filter((product) =>
          CATEGORY.includes(product.category)
        );

        // console.log(filteredProducts);
        // console.log(filters.categories);

        // if (filters.categories && filters.categories.length > 0) {
        //   console.log("eme");

        //   filteredProducts = filteredProducts.filter((product) =>
        //     filters.categories?.includes(product.category)
        //   );
        // } else {
        //   filteredProducts = response.products.filter((product) =>
        //     CATEGORY.includes(product.category)
        //   );
        // }

        // if (filters.brands) {
        //   filteredProducts = filteredProducts.filter((product) =>
        //     filters.brands?.includes(product.brand)
        //   );
        // }

        // if (filters.priceRange?.min !== 0 && filters.priceRange?.max !== 0) {
        //   filteredProducts = filteredProducts.filter(
        //     (product) =>
        //       filters.priceRange &&
        //       product.price >= filters.priceRange?.min &&
        //       product.price <= filters.priceRange?.max
        //   );
        // }
        return { ...response, products: filteredProducts };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetAllProductsQuery,
  useGetAllTopRatedProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
  useGetCategoryProductsQuery,
  useSearchProductsQuery,
  useLazySearchProductsQuery,
} = productApi;
