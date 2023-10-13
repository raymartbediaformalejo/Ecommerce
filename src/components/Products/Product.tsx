import { ReactNode, createContext, useState } from "react";
import star from "../../assets/icons/Star.svg";
import SkeletonElement from "../ui/Skeletons/SkeletonElement";
import classes from "../../styles/components/Products/Product.module.css";
import calculateDiscountedPrice from "../../utils/discountedPrice";

type TProductContext = {
  onChange?: () => void;
  onClick?: () => void;
};

type TProductProps = TProductContext & {
  variants?: "variant-1" | "variant-2" | "variant-3" | "single";
  isGridLayout?: boolean;
  children: ReactNode;
  page?: string;
};

type TProductWrapper = {
  children: ReactNode;
};

type TProductBodyWrapper = {
  children: ReactNode;
};

type TProductTitle = {
  children: ReactNode;
};
type TProductDescription = {
  children: ReactNode;
};

type TProductImage = {
  onFullScreen?: () => void;
  src: string;
  alt: string;
  size?: "small" | "medium" | "large";
  variant?: "variant-1" | "variant-2" | "variant-3";
};

type TProductRating = {
  value: number;
};

type TProductPrice = {
  price: number;
  isEmphasize?: boolean;
  size?: "small" | "medium" | "large";
  discountPercentage?: number;
};

const ProductContext = createContext<TProductContext | undefined>(undefined);

const Product = ({
  variants = "variant-1",
  onClick,
  children,
  isGridLayout = true,
  page = "",
}: TProductProps) => {
  return (
    <ProductContext.Provider value={{ onClick }}>
      <div
        className={`${classes[variants]} ${classes["products-container"]} ${
          isGridLayout
            ? classes["product-grid-layout"]
            : classes["product-list-layout"]
        } ${classes[page]}`}
      >
        {children}
      </div>
    </ProductContext.Provider>
  );
};

Product.Wrapper = ({ children }: TProductWrapper) => {
  return (
    <div className={`${classes.flex} ${classes["product-item-wrapper"]}`}>
      {children}
    </div>
  );
};

Product.Title = ({ children }: TProductTitle) => {
  if (typeof children === "string") {
    return (
      <p className={classes["product-title"]}>
        {children.charAt(0) + children.slice(1)}
      </p>
    );
  }

  return;
};

Product.Description = ({ children }: TProductDescription) => {
  return <p className={classes["product-description"]}>{children}</p>;
};

Product.BodyWrapper = ({ children }: TProductBodyWrapper) => {
  return <div className={classes["product-body-wrapper"]}>{children}</div>;
};

export const ProductImage: React.FC<TProductImage> = ({
  onFullScreen,
  src,
  alt,
  variant,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
  };

  return (
    <div className={classes["image-container"]}>
      {isLoading && variant === "variant-1" ? (
        <>
          <SkeletonElement type="thumbnail" variant={variant} />
          <img
            style={{ display: "none" }}
            src={`${src}?${Date.now()}`}
            alt={alt}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </>
      ) : isLoading && variant === "variant-2" ? (
        <>
          <SkeletonElement type="thumbnail" variant={variant} />
          <img
            style={{ display: "none" }}
            src={`${src}?${Date.now()}`}
            alt={alt}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </>
      ) : (
        <img src={`${src}?${Date.now()}`} alt={alt} onLoad={handleImageLoad} />
      )}
      {onFullScreen && <button onClick={onFullScreen}></button>}
    </div>
  );
};

Product.Price = ({
  price,
  isEmphasize = false,
  discountPercentage = 0,
  size = "medium",
}: TProductPrice) => {
  let discontedPrice = price;

  if (discontedPrice)
    discontedPrice = calculateDiscountedPrice({ price, discountPercentage });
  return (
    <>
      {discontedPrice === null || discontedPrice === undefined ? (
        <p
          className={`${classes["product-price"]} ${classes[size]} ${
            isEmphasize ? classes["emphasize"] : ""
          }`}
        >
          {`$${price?.toFixed(2)}`}
        </p>
      ) : (
        <p
          className={`${classes["product-price"]} ${classes[size]}  ${
            isEmphasize ? classes["emphasize"] : ""
          }`}
        >
          {`$${discontedPrice?.toFixed(2)}`}
          {discountPercentage > 0 && (
            <span className={classes["discount-percentage"]}>{`$${price.toFixed(
              2
            )}`}</span>
          )}
        </p>
      )}
    </>
  );
};

Product.Rating = ({ value }: TProductRating) => {
  return (
    <div className={classes["rating-container"]}>
      <img src={star} alt="star" loading="lazy" />
      <p className={classes["rating"]}>{`${value} Ratings`}</p>
    </div>
  );
};

export default Product;
