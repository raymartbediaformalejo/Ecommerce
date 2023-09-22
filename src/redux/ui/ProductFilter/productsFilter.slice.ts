import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TProductFilterState, TFilters } from "./productFilter.type";

const initialState: TProductFilterState = {
  sortBy: "",
  viewLayout: "",
  filters: {
    categories: [],
    rating: 0,
    priceRange: { min: 0, max: 0 },
    brands: [],
  },
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
      action: PayloadAction<TFilters>
    ) => {
      state.filters = action.payload;
    },
  },
});

export const { setSortBy, setViewLayout, setFilters } =
  productFilterSlice.actions;

export default productFilterSlice.reducer;
