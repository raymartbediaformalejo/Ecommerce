import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "../../../../redux/hooks/useAppDispatch";
import { addToCartProduct } from "../../../../redux/cart/cart.slice";
import { productVariety } from "../../../../utils/productVariety";
import ProductVarietyButton from "./ProductVarietyButton";
import Button from "../../../../components/ui/Button";
import { TCartProducts } from "../../../../redux/cart/cart.types";
import classes from "../../../../styles/pages/Products/ProductVarieties.module.css";
import QuantityButtons from "../../../cart/components/QuantityButtons";
import ProductVarietyImage from "./ProductVarietyImage";
import { varietyParamsKey } from "../../../../utils/productConstant";
import { TVarietiesProduct } from "../../../../types/TProducts";

type TProductVarietiesProps = {
  productId: number;
  images: string[];
  setIsOpenVariety: Dispatch<SetStateAction<boolean>>;
  isOpenVariety: boolean;
  selectedButton: string;
};

const ProductVarieties = ({
  productId,
  images,
  setIsOpenVariety,
  isOpenVariety,
  selectedButton,
}: TProductVarietiesProps) => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const productVarietyArray = productVariety();
  const productVarietyItem = productVarietyArray.find(
    (product) => product.id === productId
  );
  const variety = productVarietyItem?.variety || {};
  const varietyKeys = Object.keys(variety);

  const colorParam = searchParams.get(varietyParamsKey[0]) || "";
  const designParam = searchParams.get(varietyParamsKey[1]) || "";
  const variationParam = searchParams.get(varietyParamsKey[2]) || "";
  const sizeParam = searchParams.get(varietyParamsKey[3]) || "";
  const quantityParam = searchParams.get("quantity") || "0";
  const imageIdParam = searchParams.get("imageId") || "0";

  const [varietyObject, setVarietyObject] = useState<TVarietiesProduct>({
    color: colorParam,
    design: designParam,
    variation: variationParam,
    size: sizeParam,
  });
  const [selectedVarietyImageId, setSelectedVarietyImageId] =
    useState(imageIdParam);

  const isAllVarietyHaveValue = varietyKeys.every((varietyKey) => {
    const isSelected = searchParams.has(varietyKey);
    return isSelected;
  });
  const allParams = Array.from(searchParams.keys());
  const isAllURLParamsValidForQuantity =
    isAllVarietyHaveValue && allParams.length > 0;

  useEffect(() => {
    setSearchParams((prev) => {
      if (isAllURLParamsValidForQuantity && parseInt(quantityParam) > 0) {
        return prev;
      } else if (isAllURLParamsValidForQuantity) {
        prev.set("quantity", "1");
      } else {
        prev.delete("quantity");
      }
      return prev;
    });
  }, [isAllURLParamsValidForQuantity]);

  const handleAddToCartClick = (cartItem: TCartProducts) => {
    console.log(cartItem);

    dispatch(addToCartProduct(cartItem));
    setIsOpenVariety((prev) => !prev);
  };

  const handleIncrementQuantity = () => {
    setSearchParams((prev) => {
      prev.set("quantity", (parseInt(quantityParam) + 1).toString());
      return prev;
    });
  };

  const handleDecrementQuantity = () => {
    setSearchParams((prev) => {
      prev.set("quantity", (parseInt(quantityParam) - 1).toString());
      return prev;
    });
  };

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSearchParams((prev) => {
      prev.set("quantity", value.toString());
      return prev;
    });
  };

  const hangleClose = () => {
    setIsOpenVariety((prev) => !prev);
    setSearchParams((prev) => {
      prev.delete("quantity");
      return prev;
    });
  };

  const checkIsSelected = (varietyKey: string) => {
    let isSelected = false;
    if (
      colorParam === varietyKey ||
      designParam === varietyKey ||
      variationParam === varietyKey ||
      sizeParam === varietyKey
    ) {
      isSelected = true;
    }

    return isSelected;
  };

  return (
    <>
      {isOpenVariety && (
        <div onClick={hangleClose} className={classes["overflow"]}></div>
      )}
      <div
        className={`${classes["variety-and-action-button-card"]} ${
          isOpenVariety ? classes["active"] : ""
        }`}
      >
        {selectedVarietyImageId.length > 0 && (
          <div className={classes["variety-image-wrapper"]}>
            <ProductVarietyImage
              images={images}
              selectedVarietyImageId={parseInt(selectedVarietyImageId)}
            />
          </div>
        )}
        {productVarietyItem && (
          <div className={classes["varieties"]}>
            <div className={classes["varieties-wrapper"]}>
              {varietyKeys.map((key) => (
                <div key={key} className={classes["variety"]}>
                  <p className={classes["title"]}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </p>
                  <div
                    className={`${classes["variety-buttons"]} ${classes[key]}`}
                  >
                    {Object.entries(
                      variety[key as keyof typeof variety] || {}
                    ).map(([varietyKey, varietyValue]) => {
                      return (
                        <ProductVarietyButton
                          key={varietyKey}
                          searchParams={searchParams}
                          setSearchParams={setSearchParams}
                          varietiesObject={varietyObject}
                          setVarietiesObject={setVarietyObject}
                          images={images}
                          variantGroupTitle={key}
                          varietyKey={varietyKey}
                          varietyValue={varietyValue}
                          isSelected={checkIsSelected(varietyKey)}
                          setSelectedVarietyImageId={setSelectedVarietyImageId}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
              <div className={classes["quantity-wrapper"]}>
                <p className={classes["quantity-title"]}>Quantity</p>

                <QuantityButtons
                  value={parseInt(quantityParam)}
                  isDisabled={!isAllVarietyHaveValue}
                  onChange={handleChangeQuantity}
                  onDecrement={handleDecrementQuantity}
                  onIncrement={handleIncrementQuantity}
                />
              </div>
            </div>
          </div>
        )}

        <div className={classes["buttons-container"]}>
          {selectedButton === "buy-now" ? (
            <Button
              onClick={hangleClose}
              size="large"
              disabled={!isAllVarietyHaveValue || parseInt(quantityParam) === 0}
            >
              Buy now
            </Button>
          ) : (
            <Button
              onClick={() =>
                handleAddToCartClick({
                  id: productId,
                  quantity: parseInt(quantityParam),
                  variation: Object.fromEntries(
                    Object.entries(varietyObject).filter(
                      ([_, value]) => value.length > 0
                    )
                  ),
                })
              }
              size="large"
              variant="outlined"
              disabled={!isAllVarietyHaveValue || parseInt(quantityParam) === 0}
            >
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductVarieties;
