type TmergeProductNameID = {
  productName?: string;
  productId?: number;
};
const mergeProductNameID = ({
  productName,
  productId,
}: TmergeProductNameID) => {
  const newProductId =
    productName?.toLowerCase().split(" ").join("-") +
    "-" +
    productId?.toString();
  return { newProductId };
};

export default mergeProductNameID;
