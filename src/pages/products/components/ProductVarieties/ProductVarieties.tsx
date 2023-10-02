import { Dispatch, SetStateAction, useState } from "react";

import { useAppDispatch } from "../../../../redux/hooks/useAppDispatch";
import { addToCartProduct } from "../../../../redux/cart/cart.slice";
import { productVariety } from "../../../../utils/productVariety";
import ProductVarietyButton from "./ProductVarietyButton";
import Button from "../../../../components/ui/Button";
import { TCartProducts } from "../../../../redux/cart/cart.types";
import classes from "../../../../styles/pages/Products/ProductVarieties.module.css";

type TProductVarietiesProps = {
  productId: number;
  setIsOpenVariety: Dispatch<SetStateAction<boolean>>;
  isOpenVariety: boolean;
  selectedButton: string;
};

const ProductVarieties = ({
  productId,
  setIsOpenVariety,
  isOpenVariety,
  selectedButton,
}: TProductVarietiesProps) => {
  const dispatch = useAppDispatch();
  const productVarietyArray = productVariety();

  const selectedProductVariety = productVarietyArray.find(
    (product) => product.id === productId
  );

  const variety = selectedProductVariety?.variety || {};
  const varietyKeys = Object.keys(variety);

  const handleAddToCartClick = (cartItem: TCartProducts) => {
    dispatch(addToCartProduct(cartItem));
    setIsOpenVariety((prev) => !prev);
  };

  return (
    <>
      {isOpenVariety && (
        <div
          onClick={() => setIsOpenVariety((prev) => !prev)}
          className={classes["overflow"]}
        ></div>
      )}
      <div
        className={`${classes["variety-and-action-button-card"]} ${
          isOpenVariety ? classes["active"] : ""
        }`}
      >
        {selectedProductVariety && (
          <div className={classes["varieties"]}>
            {varietyKeys.map((key) => (
              <div key={key} className={classes["variety"]}>
                <p className={classes["title"]}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </p>
                <div className={classes["variety-buttons"]}>
                  {Object.keys(variety[key as keyof typeof variety] || {}).map(
                    (varietyItem) => (
                      <ProductVarietyButton
                        key={varietyItem}
                        variant={key}
                        color={varietyItem}
                      >
                        {varietyItem}
                      </ProductVarietyButton>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={classes["buttons-container"]}>
          {selectedButton === "buy-now" ? (
            <Button size="large">Buy now</Button>
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
