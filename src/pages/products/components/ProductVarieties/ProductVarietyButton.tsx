import { ReactNode } from "react";
import classes from "../../../../styles/pages/Products/ProductVarietyButton.module.css";
import { SetURLSearchParams } from "react-router-dom";
import { varietyParamsKey } from "../../../../utils/productConstant";

type TProductVarietyButtonProps = {
  variantGroupTitle: string;
  varietyKey: string;
  varietyValue: string;
  images: string[];
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  isSelected: boolean;
};

const ProductVarietyButton = ({
  variantGroupTitle,
  varietyKey,
  varietyValue,
  images,
  searchParams,
  setSearchParams,
  isSelected = false,
}: TProductVarietyButtonProps) => {
  const imageIndex = varietyValue[0];
  const isSize = variantGroupTitle === "size";
  const transformText = (text: string) => {
    const transformedText = text.replace(/([A-Z0-9])/g, " $1") || "";
    return (
      transformedText.charAt(0).toUpperCase() +
      transformedText.slice(1).toLowerCase()
    );
  };

  const handleSetParam = (variety: string) => {
    const alreadyExist = searchParams.has(variety);
    setSearchParams((prev) => {
      if (variety === "color") {
        if (!alreadyExist) {
          prev.set(varietyParamsKey[0], varietyKey);
        } else {
          prev.delete(varietyParamsKey[0]);
        }
      } else if (variety === "design") {
        if (!alreadyExist) {
          prev.set(varietyParamsKey[1], varietyKey);
        } else {
          prev.delete(varietyParamsKey[1]);
        }
      } else if (variety === "variation") {
        if (!alreadyExist) {
          prev.set(varietyParamsKey[2], varietyKey);
        } else {
          prev.delete(varietyParamsKey[2]);
        }
      } else if (variety === "size") {
        if (!alreadyExist) {
          prev.set(varietyParamsKey[3], varietyKey);
        } else {
          prev.delete(varietyParamsKey[3]);
        }
      }
      return prev;
    });
  };

  return (
    <button
      onClick={() => handleSetParam(variantGroupTitle)}
      title={`${
        isSize ? varietyKey.toUpperCase() : transformText(varietyKey as string)
      }`}
      className={`${classes["button"]} ${
        isSelected ? classes["selected"] : ""
      } ${!isSize ? classes["button-with-image"] : ""} ${
        classes[variantGroupTitle]
      } `}
    >
      {!isSize && (
        <img
          src={images[parseInt(imageIndex)]}
          alt={transformText(varietyKey as string)}
        />
      )}
      <p>{isSize ? varietyKey.toUpperCase() : transformText(varietyKey)}</p>
    </button>
  );
};

export default ProductVarietyButton;
