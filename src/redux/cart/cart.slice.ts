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
      const productToIncrement = state.products.find(
        (product) => product.id === productIdToIncrement
      );
      const stringCart = localStorage.getItem("cart");
      const cart: TCartProducts[] = stringCart ? JSON.parse(stringCart) : [];
      const existingCartItem = cart.find(
        (product) => product.id === productIdToIncrement
      );

      if (productToIncrement) {
        if (productToIncrement.quantity > 0) {
          productToIncrement.quantity += 1;
        }
      } else {
        state.products.push(action.payload);
      }

      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        cart.push(action.payload);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    },

    removeFromCartProduct: (
      state: TCartState,
      action: PayloadAction<number>
    ) => {
      const productIdToRemove = action.payload;

      // Find the product with the specified ID in the Redux state
      const productToRemove = state.products.find(
        (product) => product.id === productIdToRemove
      );

      if (productToRemove) {
        if (productToRemove.quantity > 1) {
          // Decrement the quantity if greater than 1
          productToRemove.quantity -= 1;
        } else {
          // Remove the product if the quantity is 1
          state.products = state.products.filter(
            (product) => product.id !== productIdToRemove
          );
        }
      }

      // Update the local storage
      const stringCart = localStorage.getItem("cart");
      const cart: TCartProducts[] = stringCart ? JSON.parse(stringCart) : [];

      // Find the index of the product to update in the local storage cart
      const indexToUpdate = cart.findIndex(
        (product) => product.id === productIdToRemove
      );

      if (indexToUpdate !== -1) {
        if (cart[indexToUpdate].quantity > 1) {
          // Decrement the quantity if greater than 1
          cart[indexToUpdate].quantity -= 1;
        } else {
          // Remove the product if the quantity is 1
          cart.splice(indexToUpdate, 1);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
      }
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

      const stringCart = localStorage.getItem("cart");
      const cart: TCartProducts[] = stringCart ? JSON.parse(stringCart) : [];

      const indexToUpdate = cart.findIndex(
        (product) => product.id === productIdToChangeQty
      );

      if (indexToUpdate !== -1) {
        cart[indexToUpdate].quantity = productUpdatedQty;

        localStorage.setItem("cart", JSON.stringify(cart));
      }
    },

    deleteCartItem: (state: TCartState, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },

    clearCart: (state: TCartState) => {
      state.products = [];
    },
  },
});

export const {
  addToCartProduct,
  removeFromCartProduct,
  changeQuantity,
  deleteCartItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const useCartProductSelector = () =>
  useAppSelector((state: RootState) => state.cart.products);
