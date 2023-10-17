import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "./index.api";
import authReducer from "./auth/auth.slice";
import productReducer from "./products/product.slice";
import productFilterReducer from "./ui/ProductFilter/productsFilter.slice";
import cartReducer from "./cart/cart.slice";
import checkoutReducer from "./checkout/checkout.slice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    product: productReducer,
    filter: productFilterReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
