import { nanoid } from "@reduxjs/toolkit";

import { TProduct, TBrands } from "../types/TProducts";

export const useBrands = (products?: TProduct[]): TBrands => {
  const extractBrands = [...new Set(products?.map((product) => product.brand))];

  const brands = extractBrands.map((brand) => {
    const name = brand
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
    return {
      id: nanoid(),
      value: brand,
      name,
    };
  });
  return { brands };
};
