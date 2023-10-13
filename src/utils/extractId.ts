import { TSelectedCart } from "../redux/cart/cart.types";

export const extractIdFromText = (text: string) => {
  return parseInt(text.split("-").slice(-1)[0]);
};

export const extractIdFromURLParam = (product: TSelectedCart[]) => {
  if (Array.isArray(product)) {
    const productIds = product.map((prod) => {
      const parseId = extractIdFromText(prod.id);

      return parseId;
    });
    return productIds;
  } else {
    return [];
  }
};
