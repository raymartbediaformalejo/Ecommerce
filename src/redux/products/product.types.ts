import { TOption } from "../../types/TDelivery";

export type TProduct = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export type TGetProductResponse = {
  products: TProduct[];
  total: number;
  skip: number;
  limit: number;
};

export type TGetProductProps = {
  limit: number;
  skip?: number;
};

export type TCategory = {
  id: string;
  value: string;
  name: string;
};

export type TProductState = {
  products: TProduct[];
  product: TProduct | null;
  categories: TCategory[];
  currency: TOption;
};
