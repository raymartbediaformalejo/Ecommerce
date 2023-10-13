import { TPriceRange } from "../redux/ui/ProductFilter/productFilter.type";

type TCartParams = {
  cartId: number;
  subtotal: number;
  totalDiscount: number;
};
export const useConvertStringToObject = (text: string) => {
  const arrayOfString = text.split(",");
  const convertedToObject: TPriceRange = {
    min: parseInt(arrayOfString[1]),
    max: parseInt(arrayOfString[3]),
  };

  return { convertedToObject };
};

export const useConvertStringToObjectCartItem = (text: string) => {
  const arrayOfString = text.split(",");
  const convertedToObject: TCartParams = {
    cartId: parseInt(arrayOfString[1]),
    subtotal: parseInt(arrayOfString[3]),
    totalDiscount: parseInt(arrayOfString[5]),
  };

  return { convertedToObject };
};
