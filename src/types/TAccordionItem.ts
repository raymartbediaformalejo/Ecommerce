export type TArrayOfIds = {
  arr: number[];
};

export type TAccordionItem = {
  [key: string]: number[] | TArrayOfIds | TAccordionItem;
};
