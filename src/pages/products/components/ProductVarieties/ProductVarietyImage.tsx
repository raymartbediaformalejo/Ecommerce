import classes from "../../../../styles/pages/Products/ProductVarietyImage.module.css";

type TProductVarietyImageProps = {
  images: string[];
  imageId: number;
};

const ProductVarietyImage = ({
  images,
  imageId,
}: TProductVarietyImageProps) => {
  console.log(images);

  return <img src={images[imageId]} className={classes["variety-image"]} />;
};

export default ProductVarietyImage;
