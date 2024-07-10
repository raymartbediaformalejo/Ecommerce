import { TVarietiesProduct } from "../../types/TProducts";

export type TCartProduct = {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
};

export type TCartProducts = {
  id: string;
  imageId?: number;
  quantity: number;
  variation: TVarietiesProduct;
};

export type TFetchCartProduct = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
};

export type TFetchCartResponse = {
  id: string;
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

export type TSelectedCart = {
  id: string;
  imageId?: number;
  quantity: number;
  variation: TVarietiesProduct;
};
