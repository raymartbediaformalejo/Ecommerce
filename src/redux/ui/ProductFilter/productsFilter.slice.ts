import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TProductFilterState, TFilters } from "./productFilter.type";

const initialState: TProductFilterState = {
  sortByPriceLowToHigh: true,
  isGridLayout: true,
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
    setSortByPriceLowToHigh: (
      state: TProductFilterState,
      action: PayloadAction<boolean>
    ) => {
      state.sortByPriceLowToHigh = action.payload;
    },

    setIsGridLayout: (
      state: TProductFilterState,
      action: PayloadAction<boolean>
    ) => {
      state.isGridLayout = action.payload;
    },

    setFilters: (
      state: TProductFilterState,
      action: PayloadAction<TFilters>
    ) => {
      state.filters = action.payload;
    },
  },
});

export const { setSortByPriceLowToHigh, setIsGridLayout, setFilters } =
  productFilterSlice.actions;

export default productFilterSlice.reducer;
