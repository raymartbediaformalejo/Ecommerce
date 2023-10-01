import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { TProduct, TCategory, TProductState } from "./product.types";
import { useAppSelector } from "../hooks/useAppSelector";

const initialState: TProductState = {
  products: [],
  product: null,
  categories: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state: TProductState, action: PayloadAction<TProduct[]>) => {
      state.products = action.payload;
    },

    setProduct: (state: TProductState, action: PayloadAction<TProduct>) => {
      state.product = action.payload;
    },

    setCategories: (
      state: TProductState,
      action: PayloadAction<TCategory[]>
    ) => {
      state.categories = action.payload;
    },
  },
});

export const { setProducts, setProduct, setCategories } = productSlice.actions;

export default productSlice.reducer;

export const useProductsSelector = () =>
  useAppSelector((state: RootState) => state.product.products);

export const useProductByIdSelector = (id: number | string) =>
  useAppSelector((state: RootState) =>
    state.product.products.find((product) => product.id === id)
  );
