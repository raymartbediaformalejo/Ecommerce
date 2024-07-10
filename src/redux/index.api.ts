import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "./index";

// const BASE_URL = "https://dummyjson.com";
const BASE_URL = "https://e-commerce-open-fashion-server.onrender.com/api";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // prepareHeaders: (headers, api) => {
    //   const { auth } = api.getState() as RootState;
    //   if (auth.token) {
    //     headers.set("Authorization", `Bearer ${auth.token}`);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ["Product", "Category"],
  endpoints: () => ({}),
});
