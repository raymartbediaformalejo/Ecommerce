export const useConvertToArray = (arr: string | number) => {
  let newArray;
  if (typeof arr === "string")
    newArray = arr.split(",").filter((arr) => arr !== "");
  return { newArray };
};
