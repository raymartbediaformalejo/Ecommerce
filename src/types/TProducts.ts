export type TProduct = {
  id: number;
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
  skip: number;
};

export type TCategory = {
  id: string;
  value: string;
  name: string;
};

export type TCategories = {
  categories: TCategory[];
};

export type TBrand = TCategory;

export type TBrands = {
  brands: TBrand[];
};

export type TProductState = {
  products: TProduct[];
  product: TProduct | null;
  categories: TCategory[];
};

export type TProductSizeVariety = string[];

export type TProductColorVariety = {
  black?: number[];
  red?: number[];
  lightYellow?: number[];
  yellow?: number[];
  pink?: number[];
  lightPink?: number[];
  maroon?: number[];
  darkBlue?: number[];
  gray?: number[];
  darkGreen?: number[];
  gold?: number[];
  blueGreen?: number[];
  cream?: number[];
  blue?: number[];
  brown?: number[];
  darkBrown?: number[];
  orange?: number[];
  lightBlue?: number[];
  fedspar?: number[];
  silver?: number[];
  redbud?: number[];
  mossIsland?: number[];
  spicedCoral?: number[];
};

export type TProductDesignVariety = {
  design1?: number[];
  design2?: number[];
  design3?: number[];
  design4?: number[];
  design5?: number[];
  plain?: number[];
  rose?: number[];
  bigFlower?: number[];
  smallFlower?: number[];
  jewels?: number[];
};
export type TProductTypeVariety = {
  tShirt?: number[];
  hoodie?: number[];
  sweater?: number[];
};
export type TProductGenderVariety = {
  unisex?: number[];
  women?: number[];
  men?: number[];
};
export type TProductVariety = {
  id: number;
  variety: {
    size?: TProductSizeVariety;
    color?: TProductColorVariety;
    design?: TProductDesignVariety;
    type?: TProductTypeVariety;
    gender?: TProductGenderVariety;
  };
};
