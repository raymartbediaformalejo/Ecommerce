export type TCartProduct = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

export type TCartProducts = {
  id: number;
  quantity: number;
  variation: { [varietyName: string]: string };
};

export type TFetchCartProduct = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
};

export type TFetchCartResponse = {
  id: number;
  products: TFetchCartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProduct: number;
  totalQuantity: number;
};

export type TFetchCartBody = {
  id: number;
  quantity: number;
};
