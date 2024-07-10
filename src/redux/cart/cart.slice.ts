import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { useAppSelector } from "../hooks/useAppSelector";
import { TCartProducts } from "./cart.types";

type TCartState = {
  products: TCartProducts[];
};

const initialState: TCartState = {
  products: JSON.parse(localStorage.getItem("cart") as string) || [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartProduct: (
      state: TCartState,
      action: PayloadAction<TCartProducts>
    ) => {
      const productIdToIncrement = action.payload.id;
      const productState = state.products.find(
        (product) => product.id === productIdToIncrement
      );
      const productImageId = action.payload.imageId;
      const productQuantity = action.payload.quantity;
      const productVariation = Object.fromEntries(
        Object.entries(action.payload.variation).filter(
          ([key, _]) => key !== "quantity"
        )
      );

      if (productState) {
        if (productState.quantity > 0) {
          productState.imageId = productImageId;
          productState.quantity = productQuantity;
          productState.variation = productVariation;
        }
      } else {
        state.products.push(action.payload);
      }

      localStorage.setItem("cart", JSON.stringify(state.products));
    },

    removeFromCartProduct: (
      state: TCartState,
      action: PayloadAction<string | string[]>
    ) => {
      const productIdsToRemove = action.payload;

      if (Array.isArray(productIdsToRemove)) {
        state.products = state.products.filter(
          (product) => !productIdsToRemove.includes(product.id)
        );
      } else if (typeof productIdsToRemove === "number") {
        const productToRemove = state.products.find(
          (product) => product.id === productIdsToRemove
        );

        if (productToRemove) {
          if (productToRemove.quantity > 1) {
            productToRemove.quantity -= 1;
          } else {
            state.products = state.products.filter(
              (product) => product.id !== productIdsToRemove
            );
          }
        }
      }

      localStorage.setItem("cart", JSON.stringify(state.products));
    },

    changeQuantity: (
      state: TCartState,
      action: PayloadAction<TCartProducts>
    ) => {
      const productIdToChangeQty = action.payload.id;
      const productUpdatedQty = action.payload.quantity;

      const productToChangeQty = state.products.find(
        (product) => product.id === productIdToChangeQty
      );

      if (productToChangeQty) {
        productToChangeQty.quantity = productUpdatedQty;
      }

      localStorage.setItem("cart", JSON.stringify(state.products));
    },
  },
});

export const { addToCartProduct, removeFromCartProduct, changeQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;

export const useCartProductSelector = () =>
  useAppSelector((state: RootState) => state.cart.products);
