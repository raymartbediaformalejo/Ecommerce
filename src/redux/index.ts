import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "./index.api";
import productReducer from "./products/product.slice";
import productFilterReducer from "./ui/ProductFilter/productsFilter.slice";
import cartReducer from "./cart/cart.slice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    product: productReducer,
    filter: productFilterReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware), // need for cache
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
