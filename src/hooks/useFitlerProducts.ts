import { TProduct } from "../types/TProducts";
import {
  TFilters,
  TPriceRange,
} from "../redux/ui/ProductFilter/productFilter.type";

export const useFilterProducts = (
  rating: string,
  categories?: string[],
  brands?: string[],
  priceRange?: TPriceRange,
  product?: TProduct[],
  filter?: TFilters
) => {
  const categoryArray = categories?.filter((categ) => categ !== "");
  const brandArray = brands?.filter((brand) => brand !== "");
  let filteredProducts = product ? [...product] : [];

  if (filter?.categories && categoryArray && categoryArray.length > 0) {
    console.log("categ keme");

    if (filteredProducts?.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        categoryArray?.includes(product.category)
      );
    }
  }

  if (filter?.brands && brandArray && brandArray.length > 0) {
    console.log("brands keme");

    if (filteredProducts.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        brandArray?.includes(product.brand)
      );
    }
  }

  if (
    priceRange &&
    priceRange?.min >= 0 &&
    priceRange?.max &&
    priceRange?.max > 0
  ) {
    if (filteredProducts.length > 0) {
      filteredProducts = filteredProducts?.filter(
        (product) =>
          filter?.priceRange &&
          product.price >= priceRange.min &&
          product.price <= priceRange.max
      );
    }
  }

  if (filter?.rating && filteredProducts.length) {
    console.log("keme");

    filteredProducts = filteredProducts.filter(
      (product) => product.rating >= parseInt(rating)
    );
  }
  return { filteredProducts };
};
