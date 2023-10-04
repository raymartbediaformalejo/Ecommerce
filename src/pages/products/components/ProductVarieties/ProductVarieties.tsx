import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
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
  const [selectedProductVarietyId, setSelectedProductVarietyId] = useState("0");

  const colorParam = searchParams.get(varietyParamsKey[0]) ?? "";
  const designParam = searchParams.get(varietyParamsKey[1]) ?? "";
  const variationParam = searchParams.get(varietyParamsKey[2]) ?? "";
  const sizeParam = searchParams.get(varietyParamsKey[3]) ?? "";
  const quantityParam = searchParams.get("quantity") ?? "0";

  const isAllVarietyHaveValue = varietyKeys.every((varietyKey) => {
    const isSelected = searchParams.has(varietyKey);
    return isSelected;
  });
  const allParams = Array.from(searchParams.keys());
  const isAllURLParamsValidForQuantity =
    isAllVarietyHaveValue && allParams.length > 0;

  useEffect(() => {
    setSearchParams((prev) => {
      if (isAllURLParamsValidForQuantity) {
        console.log("eme");

        prev.set("quantity", "1");
      } else {
        console.log("keme");

        prev.delete("quantity");
      }
      return prev;
    });
  }, [isAllURLParamsValidForQuantity]);

  const handleAddToCartClick = (cartItem: TCartProducts) => {
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
  console.log("quantity parent: ", quantityParam);

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
        {selectedProductVarietyId.length > 0 && (
          <div className={classes["variety-image-wrapper"]}>
            <ProductVarietyImage
              images={images}
              imageId={parseInt(selectedProductVarietyId)}
            />
          </div>
        )}
        {productVarietyItem && (
          <div className={classes["varieties"]}>
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
                        images={images}
                        variantGroupTitle={key}
                        varietyKey={varietyKey}
                        varietyValue={varietyValue}
                        isSelected={checkIsSelected(varietyKey)}
                        quantity={parseInt(quantityParam)}
                        isAllGroupHaveValue={isAllVarietyHaveValue}
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
        )}

        <div className={classes["buttons-container"]}>
          {selectedButton === "buy-now" ? (
            <Button
              onClick={hangleClose}
              size="large"
              disabled={!isAllVarietyHaveValue}
            >
              Buy now
            </Button>
          ) : (
            <Button
              onClick={() =>
                handleAddToCartClick({
                  id: productId,
                  quantity: 1,
                })
              }
              size="large"
              variant="outlined"
              disabled={!isAllVarietyHaveValue}
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
