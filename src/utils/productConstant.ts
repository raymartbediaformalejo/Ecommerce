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

export const colorsProductVariety = {
  black: "#000000",
  red: "#F82626",
  lightYellow: "#CBC7AA",
  yellow: "#BBAC03",
  pink: "#E4378F",
  lightPink: "#F4D0D4",
  maroon: "#5A1F3B",
  darkBlue: "#172240",
  gray: "#A29697",
  darkGreen: "#151F1A",
  gold: "#9C5100",
  blueGreen: "#103244",
  cream: "#D9C8A5",
  blue: "#0F1534",
  brown: "#8B3803",
  darkBrown: "#1F0C00",
  orange: "#D0522D",
  lightBlue: "#6B90A4",
  fedspar: "#D29271",
  silver: "#E3DFE0",
  redbud: "#AE6366",
  mossIsland: "#CAC6B3",
  spicedCoral: "#D9505A",
  darkGray: "#333333",
};

export const varietyParamsKey = ["color", "design", "variation", "size"];

export const TO_CHECKOUT_PARAM = "selectedcart";
