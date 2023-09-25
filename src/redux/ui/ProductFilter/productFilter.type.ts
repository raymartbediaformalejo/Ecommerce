export type TPriceRange = {
  min: number;
  max: number;
};

export type TFilters = {
  categories?: string[];
  rating: number;
  priceRange?: TPriceRange;
  brands?: string[];
};

export type TProductFilterState = {
  sortByPriceLowToHigh: boolean;
  filters: TFilters;
  isGridLayout: boolean;
};

export type TFiltersValue = {
  categoriesToFilter: string[];
  rating: number;
  priceRangeToFilter: TPriceRange;
  brandsToFilter: string[];
};
