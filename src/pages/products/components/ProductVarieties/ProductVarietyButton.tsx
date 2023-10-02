import { ReactNode } from "react";
import { colorsProductVariety } from "../../../../utils/productConstant";
import classes from "../../../../styles/pages/Products/ProductVarietyButton.module.css";

type TProductVarietyButtonProps = {
  variant: string;
  children: ReactNode;
  color?: string;
};

const ProductVarietyButton = ({
  variant,
  color,
  children,
}: TProductVarietyButtonProps) => {
  const productColorVarient =
    (variant === "color" &&
      color &&
      colorsProductVariety[color as keyof typeof colorsProductVariety]) ||
    "#ffff";
  const backgroundColor = productColorVarient
    ? productColorVarient
    : "transparent";

  const transformText = (text: string) => {
    const transformedText = text.replace(/([A-Z0-9])/g, " $1") || "";
    return (
      transformedText.charAt(0).toUpperCase() +
      transformedText.slice(1).toLowerCase()
    );
  };

  return (
    <>
      {variant === "color" ? (
        <button
          title={transformText(color as string)}
          className={`${classes["button"]} ${classes[variant]} `}
          style={{
            backgroundColor: backgroundColor,
            width: "24px",
            height: "24px",
          }}
        ></button>
      ) : variant === "design" ? (
        <button
          title={transformText(children as string)}
          className={`${classes["button"]} ${classes[variant]} `}
        >
          {transformText(children as string)}
        </button>
      ) : variant === "size" ? (
        <button
          title={(children as string).toUpperCase()}
          className={`${classes["button"]} ${classes[variant]} `}
        >
          {(children as string).toUpperCase()}
        </button>
      ) : (
        <button
          title={transformText(children as string)}
          className={classes["button"]}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default ProductVarietyButton;
