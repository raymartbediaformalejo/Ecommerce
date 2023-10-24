import { Dispatch, SetStateAction } from "react";

import classes from "../../../../styles/pages/Products/ProductVarietyButton.module.css";
import { SetURLSearchParams } from "react-router-dom";
import { varietyParamsKey } from "../../../../utils/productConstant";
import { TVarietiesProduct } from "../../../../types/TProducts";
import { useCapitalizeText } from "../../../../hooks/useCapitalizeText";

type TProductVarietyButtonProps = {
  variantGroupTitle: string;
  varietyKey: string;
  varietyValue: string;
  images: string[];
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  isSelected: boolean;
  varietiesObject: { [varietyName: string]: string };
  setVarietiesObject: Dispatch<SetStateAction<TVarietiesProduct>>;
  setSelectedVarietyImageId: Dispatch<SetStateAction<string>>;
};

const ProductVarietyButton = ({
  variantGroupTitle,
  varietyKey,
  varietyValue,
  images,
  searchParams,
  setSearchParams,
  isSelected = false,
  varietiesObject,
  setVarietiesObject,
  setSelectedVarietyImageId,
}: TProductVarietyButtonProps) => {
  const imageIndex = varietyValue[0];
  const isSize = variantGroupTitle === "size";

  const { transformedText } = useCapitalizeText(varietyKey);

  const handleSetParam = (variety: string) => {
    const alreadyExist = searchParams.has(variety);
    const isEqualVariety = varietyKey === varietiesObject[variety];
    setSearchParams((prev) => {
      if (variety === "color") {
        if (!alreadyExist || !isEqualVariety) {
          prev.set(varietyParamsKey[0], varietyKey);
          prev.set("imageId", encodeURIComponent(varietyValue));

          setVarietiesObject((prev) => ({ ...prev, [variety]: varietyKey }));
          setSelectedVarietyImageId(varietyValue);
        } else {
          prev.delete(varietyParamsKey[0]);
          setVarietiesObject((prev) => ({ ...prev, [variety]: "" }));
        }
      } else if (variety === "design") {
        if (!alreadyExist || !isEqualVariety) {
          prev.set(varietyParamsKey[1], encodeURIComponent(varietyKey));
          prev.set("imageId", encodeURIComponent(varietyValue));

          setVarietiesObject((prev) => ({ ...prev, [variety]: varietyKey }));
          setSelectedVarietyImageId(varietyValue);
        } else {
          prev.delete(varietyParamsKey[1]);
          setVarietiesObject((prev) => ({ ...prev, [variety]: "" }));
        }
      } else if (variety === "variation") {
        if (!alreadyExist || !isEqualVariety) {
          prev.set(varietyParamsKey[2], encodeURIComponent(varietyKey));
          prev.set("imageId", encodeURIComponent(varietyValue));

          setVarietiesObject((prev) => ({ ...prev, [variety]: varietyKey }));
          setSelectedVarietyImageId(varietyValue);
        } else {
          prev.delete(varietyParamsKey[2]);
          setVarietiesObject((prev) => ({ ...prev, [variety]: "" }));
        }
      } else if (variety === "size") {
        if (!alreadyExist || !isEqualVariety) {
          prev.set(varietyParamsKey[3], encodeURIComponent(varietyKey));
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
      title={`${isSize ? varietyKey.toUpperCase() : transformedText}`}
      className={`${classes["button"]} ${
        isSelected ? classes["selected"] : ""
      } ${!isSize ? classes["button-with-image"] : ""} ${
        classes[variantGroupTitle]
      } `}
    >
      {!isSize && (
        <img src={images[parseInt(imageIndex)]} alt={transformedText} />
      )}
      <p>{isSize ? varietyKey.toUpperCase() : transformedText}</p>
    </button>
  );
};

export default ProductVarietyButton;
