import { Dispatch, SetStateAction } from "react";

import classes from "../../../../styles/pages/Products/ProductVarietyButton.module.css";
import { SetURLSearchParams } from "react-router-dom";
import { varietyParamsKey } from "../../../../utils/productConstant";
import { TVarietiesProduct } from "../../../../types/TProducts";

type TProductVarietyButtonProps = {
  variantGroupTitle: string;
  varietyKey: string;
  varietyValue: string;
  images: string[];
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  isSelected: boolean;
  isAllGroupHaveValue: boolean;
  quantity?: number;
  varietiesObject: { [varietyName: string]: string };
  setVarietiesObject: Dispatch<SetStateAction<TVarietiesProduct>>;
};

const ProductVarietyButton = ({
  variantGroupTitle,
  varietyKey,
  varietyValue,
  images,
  searchParams,
  setSearchParams,
  isSelected = false,
  isAllGroupHaveValue = false,
  quantity = 0,
  varietiesObject,
  setVarietiesObject,
}: TProductVarietyButtonProps) => {
  const allParams = Array.from(searchParams.keys());
  const imageIndex = varietyValue[0];
  const isSize = variantGroupTitle === "size";
  const transformText = (text: string) => {
    const transformedText = text.replace(/([A-Z0-9])/g, " $1") || "";
    return (
      transformedText.charAt(0).toUpperCase() +
      transformedText.slice(1).toLowerCase()
    );
  };
  const isAllURLParamsValidForQuantity =
    isAllGroupHaveValue && allParams.length > 0;

  const handleSetParam = (variety: string) => {
    const alreadyExist = searchParams.has(variety);
    const isEqualVariety = varietyKey === varietiesObject[variety];
    // if (isEqualVariety) {
    //   setVarietiesObject((prev) => ({ ...prev, [variety]: "" }));
    // } else {
    //   setVarietiesObject((prev) => ({ ...prev, [variety]: varietyKey }));
    // }
    setSearchParams((prev) => {
      if (variety === "color") {
        if (!alreadyExist || !isEqualVariety) {
          prev.set(varietyParamsKey[0], varietyKey);
          setVarietiesObject((prev) => ({ ...prev, [variety]: varietyKey }));
        } else {
          prev.delete(varietyParamsKey[0]);
          setVarietiesObject((prev) => ({ ...prev, [variety]: "" }));
        }
      } else if (variety === "design") {
        if (!alreadyExist || !isEqualVariety) {
          prev.set(varietyParamsKey[1], varietyKey);
          setVarietiesObject((prev) => ({ ...prev, [variety]: varietyKey }));
        } else {
          prev.delete(varietyParamsKey[1]);
          setVarietiesObject((prev) => ({ ...prev, [variety]: "" }));
        }
      } else if (variety === "variation") {
        if (!alreadyExist || !isEqualVariety) {
          prev.set(varietyParamsKey[2], varietyKey);
          setVarietiesObject((prev) => ({ ...prev, [variety]: varietyKey }));
        } else {
          prev.delete(varietyParamsKey[2]);
          setVarietiesObject((prev) => ({ ...prev, [variety]: "" }));
        }
      } else if (variety === "size") {
        if (!alreadyExist || !isEqualVariety) {
          prev.set(varietyParamsKey[3], varietyKey);
          setVarietiesObject((prev) => ({ ...prev, [variety]: varietyKey }));
        } else {
          prev.delete(varietyParamsKey[3]);
          setVarietiesObject((prev) => ({ ...prev, [variety]: "" }));
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
