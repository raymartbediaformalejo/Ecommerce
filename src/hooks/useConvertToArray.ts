export const useConvertToArray = (arr: string | number) => {
  let newArray;
  if (typeof arr === "string") newArray = arr.split(",");
  return { newArray };
};
