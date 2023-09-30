import { TFiltersValue } from "../redux/ui/ProductFilter/productFilter.type";

export const PRODUCT_LIMIT = 10;

export const PER_PAGE = 10;

export const initialFiltersValue: TFiltersValue = {
  categoriesToFilter: [],
  rating: 0,
  priceRangeToFilter: { min: 0, max: 0 },
  brandsToFilter: [],
};

export const productQueryKeys = [
  "q",
  "page",
  "categories",
  "rating",
  "price-range",
  "brands",
];

export const ratingsRange = {
  "5 Stars": 5,
  "4 Stars & Up": 4,
  "3 Stars & Up": 3,
  "2 Stars & Up": 2,
  "1 Stars & Up": 1,
};

export const priceRangeAutoCompleteValue = {
  ["0-200"]: [0, 200],
  ["200-400"]: [200, 400],
  ["400-600"]: [400, 600],
};
