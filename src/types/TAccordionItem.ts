export type TArrayOfIds = {
  arr: number[];
};

export type TAccordionItem = {
  [key: string]: number[] | TArrayOfIds | TAccordionItem;
};

export type TTopnavItems = Record<string, TAccordionItem | number[]>;
