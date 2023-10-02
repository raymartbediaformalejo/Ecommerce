import React from "react";
import { productVariety } from "../../../../utils/productVariety";
import ProductVarietyButton from "./ProductVarietyButton";
import classes from "../../../../styles/pages/Products/ProductVarieties.module.css";

type TProductVarietiesProps = {
  productId: number;
};

const ProductVarieties = ({ productId }: TProductVarietiesProps) => {
  const productVarietyArray = productVariety();

  const selectedProductVariety = productVarietyArray.find(
    (product) => product.id === productId
  );

  const variety = selectedProductVariety?.variety || {};
  const varietyKeys = Object.keys(variety);

  return (
    <div>
      {selectedProductVariety ? (
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
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductVarieties;
