import { TProduct } from "../types/TProducts";
import { useAppSelector } from "../redux";

export const useSortProduct = (product?: TProduct[]) => {
  const isSortByLowToHighPrice = useAppSelector(
    (state) => state.filter.sortByPriceLowToHigh
  );

  let sortedProduct = product ? [...product] : [];

  if (isSortByLowToHighPrice) {
    sortedProduct = sortedProduct.sort((a, b) => a.price - b.price);
  } else {
    sortedProduct = sortedProduct.sort((a, b) => b.price - a.price);
  }

  return { sortedProduct };
};
