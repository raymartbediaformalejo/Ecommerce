import classes from "../../../../styles/pages/Products/ProductVarietyImage.module.css";

type TProductVarietyImageProps = {
  imageURl?: string;
};

const ProductVarietyImage = ({ imageURl }: TProductVarietyImageProps) => {
  return <img src={imageURl} className={classes["variety-image"]} />;
};

export default ProductVarietyImage;
