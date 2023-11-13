import { memo } from "react";

import Product, { ProductImage, Price } from "../../../components/Products/Product";
import { TSelectedCart } from "../../../redux/cart/cart.types";
import { TProduct, TVarietiesProduct } from "../../../types/TProducts";
import CartItemVariation from "../../cart/components/CartItemVariation";
import { extractIdFromText } from "../../../utils/extractId";
import calculateDiscountedPrice from "../../../utils/discountedPrice";
import { TDiscountedPrice } from "../../../utils/discountedPrice";
import OrderTotalSummary from "./OrderTotalSummary";
import classes from "../../../styles/pages/checkout/OrderProductSummary.module.css";

type TOrderSummary = {
  productParamObjects: TSelectedCart[];
  products?: TProduct[];
  subtotal: number;
  shippingFee?: number;
  showOrderTotal?: boolean;
};

type TProductItemPrice = TDiscountedPrice & { id: number };

const MemoizedProductImage = memo(ProductImage);

const OrderProductSummary = ({
  products,
  productParamObjects,
  subtotal,
  shippingFee,
  showOrderTotal = false,
}: TOrderSummary) => {
  const getProductVariation = (id: number) => {
    const variaton = productParamObjects.find(
      (product) => extractIdFromText(product.id) === id
    )?.variation;

    return variaton as TVarietiesProduct;
  };

  const getProductQuantity = (id: number) => {
    const quantity = productParamObjects.find(
      (product) => extractIdFromText(product.id) === id
    )?.quantity;

    return quantity as number;
  };

  const calculateProductItemPrice = ({
    id,
    price,
    discountPercentage,
  }: TProductItemPrice) => {
    const quantity = getProductQuantity(id);
    const discountedPrice = calculateDiscountedPrice({
      price,
      discountPercentage,
    });
    const totalprice = quantity * discountedPrice;
    return totalprice;
  };

  return (
    <div className={` ${classes["order-summary"]}`}>
      <Product isGridLayout={false} variants="variant-3">
        {products?.map((product) => {
          const imageId = productParamObjects.find(
            (productItem) => extractIdFromText(productItem.id) === product.id
          )?.imageId;

          return (
            <Product.Wrapper key={product.id}>
              <div className={classes["product-item-card"]}>
                <MemoizedProductImage
                  src={product.images[imageId as number]}
                  alt={product.title}
                  variant="variant-2"
                  quantity={getProductQuantity(product.id)}
                  className={classes["product-image"]}
                />
                <Product.BodyWrapper>
                  <Product.Title>{product.title}</Product.Title>
                  <CartItemVariation
                    className={classes["variation"]}
                    variation={getProductVariation(product.id)}
                  />
                  <div className={classes["price"]}>
                    <Price
                      price={product.price}
                      discountPercentage={product.discountPercentage}
                    />
                  </div>
                </Product.BodyWrapper>
              </div>
              <div className={classes["product-item-subtotal"]}>
                <Price
                  price={calculateProductItemPrice({
                    id: product.id,
                    price: product.price,
                    discountPercentage: product.discountPercentage,
                  })}
                />
              </div>
            </Product.Wrapper>
          );
        })}
      </Product>

      {showOrderTotal && (
        <OrderTotalSummary subtotal={subtotal} shippingFee={shippingFee} />
      )}
    </div>
  );
};

export default OrderProductSummary;
