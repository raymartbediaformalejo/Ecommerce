import { TProduct } from "../types/TProducts";
import { TFiltersValue } from "../redux/ui/ProductFilter/productFilter.type";

export const useFilterProducts = (
  filters: TFiltersValue,
  product?: TProduct[]
) => {
  let filteredProducts = product ? [...product] : [];

  if (
    filters.categoriesToFilter &&
    filters.categoriesToFilter.length > 0 &&
    filteredProducts?.length > 0
  ) {
    console.log("categ keme");

    filteredProducts = filteredProducts.filter((product) =>
      filters.categoriesToFilter?.includes(product.category)
    );
  }

  if (
    filters.brandsToFilter &&
    filters.brandsToFilter.length > 0 &&
    filteredProducts.length > 0
  ) {
    filteredProducts = filteredProducts.filter((product) =>
      filters.brandsToFilter?.includes(product.brand)
    );
  }

  if (
    filters.priceRangeToFilter &&
    filters.priceRangeToFilter?.min >= 0 &&
    filters.priceRangeToFilter?.max &&
    filters.priceRangeToFilter?.max > 0 &&
    filteredProducts.length > 0
  ) {
    filteredProducts = filteredProducts?.filter(
      (product) =>
        product.price >= filters.priceRangeToFilter.min &&
        product.price <= filters.priceRangeToFilter.max
    );
  }

  if (filteredProducts.length) {
    filteredProducts = filteredProducts.filter(
      (product) => product.rating >= filters.rating
    );
  }
  return { filteredProducts };
};
