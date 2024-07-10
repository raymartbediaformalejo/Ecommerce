import { baseApi } from "../index.api";
import {
  TProduct,
  TGetProductProps,
  TGetProductResponse,
} from "./product.types";

export const CATEGORY = [
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
      query: ({ limit }) => `/products?limit=${limit}`,
    }),
    getAllProducts: build.query<
      TGetProductResponse,
      { ids?: string[] | null } | null
    >({
      query: () => "/products?limit=100",
      transformResponse: (response: TGetProductResponse, _, arg) => {
        console.log("getAllProducts");

        let filteredProducts = response.products.filter((product) =>
          CATEGORY.includes(product.category)
        );

        if (arg && arg.ids && arg.ids?.length > 0) {
          filteredProducts = response.products.filter((product) =>
            arg.ids?.includes(product.id)
          );
        }

        return { ...response, products: filteredProducts };
      },
    }),

    getAllTopRatedProducts: build.query<
      TGetProductResponse,
      { category: string; mode: string }
    >({
      query: () => `/products?limit=100`,
      transformResponse: (response: TGetProductResponse, _, arg) => {
        console.log("getAllTopRatedProducts");
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

        if (arg.mode === "top-3") {
          sortByRatingAsc = sortByRatingAsc.slice(0, 3);
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

    getProduct: build.query<TProduct, { id: string }>({
      query: ({ id }) => `/products/${id}`,
    }),

    searchProducts: build.query<TGetProductResponse, { query: string | null }>({
      query: ({ query }) => `/search?q=${query}`,
      transformResponse: (response: TGetProductResponse) => {
        console.log("searchProducts");
        const filteredProducts = response.products.filter((product) =>
          CATEGORY.includes(product.category)
        );

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
  useLazySearchProductsQuery,
} = productApi;
