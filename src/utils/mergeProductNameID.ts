type TmergeProductNameID = {
  productName?: string;
  productId?: number;
};

export const convertToLowercaseSpaceWithDash = ({
  name,
  idNumber,
}: {
  name: string;
  idNumber?: number;
}) => {
  const convertedId = idNumber
    ? name?.toLowerCase().split(" ").join("-") + "-" + idNumber?.toString()
    : name?.toLowerCase().split(" ").join("-");
  return convertedId;
};

const mergeProductNameID = ({
  productName,
  productId,
}: TmergeProductNameID) => {
  const newProductId =
    productName &&
    convertToLowercaseSpaceWithDash({ name: productName, idNumber: productId });
  return { newProductId };
};

export default mergeProductNameID;
