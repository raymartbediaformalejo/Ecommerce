import { TSelectedCart } from "../redux/cart/cart.types";

export const extractIdFromText = (text: string) => {
  return text.split("-").slice(-1)[0];
};

export const extractIdFromURLParam = (product: TSelectedCart[]) => {
  if (Array.isArray(product)) {
    const productIds = product.map((prod) => {
      return prod.id;
    });
    return productIds;
  } else {
    return [];
  }
};
