import { nanoid } from "@reduxjs/toolkit";

import { TProduct } from "../types/TProducts";
import { TCategories } from "../types/TProducts";

export const useCategories = (products?: TProduct[]): TCategories => {
  const extractCategory = [
    ...new Set(products?.map((products) => products.category)),
  ];

  const categories = extractCategory.map((category) => {
    const name = category
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
    return {
      id: nanoid(),
      value: category,
      name,
    };
  });

  return { categories };
};
