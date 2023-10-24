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
      action: PayloadAction<number>
    ) => {
      const productIdToRemove = action.payload;

      const productToRemove = state.products.find(
        (product) => product.id === productIdToRemove
      );

      if (productToRemove) {
        if (productToRemove.quantity > 1) {
          productToRemove.quantity -= 1;
        } else {
          state.products = state.products.filter(
            (product) => product.id !== productIdToRemove
          );
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

    deleteCartItems: (state: TCartState, action: PayloadAction<number[]>) => {
      const cartItemsToRemove = action.payload;

      console.log(cartItemsToRemove);

      state.products = state.products.filter(
        (product) => !cartItemsToRemove.includes(product.id)
      );

      localStorage.setItem("cart", JSON.stringify(state.products));
    },
  },
});

export const {
  addToCartProduct,
  removeFromCartProduct,
  changeQuantity,
  deleteCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;

export const useCartProductSelector = () =>
  useAppSelector((state: RootState) => state.cart.products);
