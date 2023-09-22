import { TProduct } from "../types/TProducts";
import { TFilters } from "../redux/ui/ProductFilter/productFilter.type";

export const useFilterProducts = (product?: TProduct[], filter?: TFilters) => {
  let filteredProducts = product;
  console.log(filter);
  console.log(filteredProducts);

  if (filter?.categories && filter.categories.length > 0) {
    if (filteredProducts && filteredProducts?.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filter.categories?.includes(product.category)
      );
    }
  }

  if (filter?.brands && filter.brands.length > 0) {
    if (filteredProducts && filteredProducts.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filter.brands?.includes(product.brand)
      );
    }
  }

  if (
    filter?.priceRange &&
    filter?.priceRange?.min >= 0 &&
    filter?.priceRange?.max &&
    filter?.priceRange?.max > 0
  ) {
    if (filteredProducts && filteredProducts.length > 0) {
      filteredProducts = filteredProducts?.filter(
        (product) =>
          filter?.priceRange &&
          product.price >= filter.priceRange.min &&
          product.price <= filter.priceRange.max
      );
    }
  }

  if (filter?.rating && filteredProducts && filteredProducts.length) {
    filteredProducts = filteredProducts.filter(
      (product) => product.rating >= filter.rating
    );
  }
  return { filteredProducts };
};
