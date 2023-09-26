import { TPriceRange } from "../redux/ui/ProductFilter/productFilter.type";

const useConvertStringToObject = (text: string) => {
  const arrayOfString = text.split(",");
  const convertedToObject:TPriceRange = {
    min: parseInt(arrayOfString[1]),
    max: parseInt(arrayOfString[3]),
  };

  return { convertedToObject };
};

export default useConvertStringToObject;
