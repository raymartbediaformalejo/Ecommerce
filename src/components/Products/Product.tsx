import { ReactNode, createContext, useState } from "react";
import star from "../../assets/icons/Star.svg";
import SkeletonElement from "../ui/Skeletons/SkeletonElement";
import classes from "../../styles/components/Products/Product.module.css";
import calculateDiscountedPrice from "../../utils/discountedPrice";

type TProductContext = {
  onChange?: () => void;
  onClick?: () => void;
};

type TProductProps = TProductContext &
  React.HtmlHTMLAttributes<HTMLDivElement> & {
    variants?: "variant-1" | "variant-2" | "variant-3" | "single";
    isGridLayout?: boolean;
    children: ReactNode;
    page?: string;
  };

type TProductWrapper = React.HtmlHTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

type TProductBodyWrapper = React.HtmlHTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

type TProductTitle = React.HtmlHTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
};
type TProductDescription = React.HtmlHTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
};

type TProductImage = React.HtmlHTMLAttributes<HTMLDivElement> & {
  onFullScreen?: () => void;
  src: string;
  alt: string;
  size?: "small" | "medium" | "large";
  variant?: "variant-1" | "variant-2" | "variant-3";
};

type TProductRating = React.HtmlHTMLAttributes<HTMLDivElement> & {
  value: number;
};

type TProductPrice = React.HtmlHTMLAttributes<HTMLParagraphElement> & {
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
  className,
}: TProductProps) => {
  return (
    <ProductContext.Provider value={{ onClick }}>
      <div
        className={`${className ? className : ""} ${classes[variants]} ${
          classes["products-container"]
        } ${
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

Product.Wrapper = ({ children, className }: TProductWrapper) => {
  return (
    <div
      className={`${className ? className : ""} ${classes.flex} ${
        classes["product-item-wrapper"]
      }`}
    >
      {children}
    </div>
  );
};

Product.Title = ({ children, className }: TProductTitle) => {
  if (typeof children === "string") {
    return (
      <p
        className={` ${className ? className : ""} ${classes["product-title"]}`}
      >
        {children.charAt(0) + children.slice(1)}
      </p>
    );
  }

  return;
};

Product.Description = ({ children, className }: TProductDescription) => {
  return (
    <p
      className={`${className ? className : ""} ${
        classes["product-description"]
      }`}
    >
      {children}
    </p>
  );
};

Product.BodyWrapper = ({ children }: TProductBodyWrapper) => {
  return <div className={classes["product-body-wrapper"]}>{children}</div>;
};

export const ProductImage: React.FC<TProductImage> = ({
  onFullScreen,
  src,
  alt,
  variant,
  className,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
  };

  return (
    <div
      className={`${className ? className : ""} ${classes["image-container"]}`}
    >
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
  className,
}: TProductPrice) => {
  let discontedPrice = price;
  const decimalPlaces = 2;

  if (discontedPrice)
    discontedPrice = calculateDiscountedPrice({ price, discountPercentage });
  return (
    <>
      {discontedPrice === null || discontedPrice === undefined ? (
        <p
          className={`${className ? className : ""} ${
            classes["product-price"]
          } ${classes[size]} ${isEmphasize ? classes["emphasize"] : ""}`}
        >
          {`$${parseFloat(price.toFixed(decimalPlaces)).toLocaleString()}`}
        </p>
      ) : (
        <p
          className={`${className ? className : ""} ${
            classes["product-price"]
          } ${classes[size]}  ${isEmphasize ? classes["emphasize"] : ""}`}
        >
          {`$${parseFloat(
            discontedPrice.toFixed(decimalPlaces)
          )?.toLocaleString()}`}
          {discountPercentage > 0 && (
            <span className={classes["discount-percentage"]}>{`$${parseFloat(
              price.toFixed(2)
            ).toLocaleString()}`}</span>
          )}
        </p>
      )}
    </>
  );
};

Product.Rating = ({ value, className }: TProductRating) => {
  return (
    <div
      className={`${className ? className : ""} ${classes["rating-container"]}`}
    >
      <img src={star} alt="star" loading="lazy" />
      <p className={classes["rating"]}>{`${value} Ratings`}</p>
    </div>
  );
};

export default Product;
