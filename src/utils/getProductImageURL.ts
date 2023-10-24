import { TCartProducts } from "../redux/cart/cart.types";

type TGetProductImageURL = {
  id: number;
  images: string[];
  cartItems: TCartProducts[];
};

type TGetImageId = Omit<TGetProductImageURL, "images">;

export const getImageId = ({ id, cartItems }: TGetImageId) => {
  const imageId = cartItems.find((cart) => (cart.id = id))?.imageId || 0;
  return imageId;
};

export const getProductImageURL = ({
  id,
  images,
  cartItems,
}: TGetProductImageURL) => {
  const imageId = getImageId({ id, cartItems });
  const imageUrl = images[imageId];
  return imageUrl;
};
