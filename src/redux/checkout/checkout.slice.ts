import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { useAppSelector } from "../hooks/useAppSelector";
import { TDelivery } from "../../types/TDelivery";

type TCheckoutState = {
  address: TDelivery;
};

const initialState: TCheckoutState = {
  address: JSON.parse(localStorage.getItem("address") as string) || {},
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    saveAddress: (state: TCheckoutState, action: PayloadAction<TDelivery>) => {
      state.address = action.payload;

      localStorage.setItem("address", JSON.stringify(state.address));
    },
  },
});

export const { saveAddress } = checkoutSlice.actions;

export default checkoutSlice.reducer;

export const useCheckoutSelector = () =>
  useAppSelector((state: RootState) => state.checkout.address);
