export type TDiscountedPrice = {
  price: number;
  discountPercentage: number;
};

const calculateDiscountedPrice = ({
  price,
  discountPercentage,
}: TDiscountedPrice) => {
  const newPrice = price - (discountPercentage / 100) * price;
  return newPrice;
};

export default calculateDiscountedPrice;
