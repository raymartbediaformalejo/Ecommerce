import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProductFilterState } from "./productFilter.type";

const initialState: TProductFilterState = {
  sortBy: "",
  viewLayout: "",
  filters: [],
};

export const productFilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSortBy: (state: TProductFilterState, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },

    setViewLayout: (
      state: TProductFilterState,
      action: PayloadAction<string>
    ) => {
      state.viewLayout = action.payload;
    },

    setFilters: (
      state: TProductFilterState,
      action: PayloadAction<string[]>
    ) => {
      state.filters = action.payload;
    },
  },
});

export const { setSortBy, setViewLayout, setFilters } =
  productFilterSlice.actions;

export default productFilterSlice.reducer;
