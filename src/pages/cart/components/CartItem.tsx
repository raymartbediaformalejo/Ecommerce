import React from "react";
import { useAppDispatch } from "../../../redux/hooks/useAppDispatch";

import {
  addToCartProduct,
  removeFromCartProduct,
  changeQuantity,
} from "../../../redux/cart/cart.slice";
import checkIcon from "../../../assets/icons/check2.svg";
import Product from "../../../components/Products/Product";
import { ProductImage } from "../../../components/Products/Product";
import mergeProductNameID from "../../../utils/mergeProductNameID";
import { TProduct } from "../../../types/TProducts";
import { Link } from "react-router-dom";
import QuantityButtons from "./QuantityButtons";
import { TCartProducts } from "../../../redux/cart/cart.types";
import { TVarietiesProduct } from "../../../types/TProducts";
import CartItemVariation from "./CartItemVariation";
import classes from "../../../styles/pages/cart/CartItem.module.css";

type TCartItemProps = {
  products?: TProduct[];
  cartItems: TCartProducts[];
};

const CartItem = ({ products, cartItems }: TCartItemProps) => {
  const dispatch = useAppDispatch();
  const transformProductIdForURL = (title: string, id: number) => {
    const { newProductId } = mergeProductNameID({
      productName: title,
      productId: id,
    });
    return newProductId;
  };

  const getCartItemQuantity = (id: number) => {
    const selectedCartItem = cartItems.find((cartItem) => cartItem.id === id);

    return selectedCartItem?.quantity;
  };

  const handleIncrementCartItemQuantity = (product: TCartProducts) => {
    dispatch(addToCartProduct(product));
  };
  const handleDecrementCartItemQuantity = (product: number) => {
    dispatch(removeFromCartProduct(product));
  };
  const handleChangeQuantity = (
    e: React.ChangeEvent<HTMLInputElement>,
    productId: number,
    variation: TVarietiesProduct
  ) => {
    const value = parseInt(e.target.value);
    dispatch(changeQuantity({ id: productId, quantity: value, variation }));
  };

  const cartItemVariationAndQuantity = (
    productId: number
  ): TVarietiesProduct => {
    const cartItem = cartItems.find((cartItem) => cartItem.id === productId);

    if (cartItem) {
      const { quantity, variation } = cartItem;

      const variationObject = Object.fromEntries(
        Object.entries(variation || {})
          .map(([key, value]) => [key, String(value)])
          .filter(([_, value]) => value.length > 0)
      );

      return { quantity: String(quantity), ...variationObject };
    }

    return {};
  };

  return (
    <>
      {products?.map((product) => (
        <Product.Wrapper key={product.id}>
          <div className={classes["checkbox-container"]}>
            <input type="checkbox" id="checkbox" checked={true} />
            <label htmlFor="checkbox"></label>
            <img src={checkIcon} className={classes["check"]} />
          </div>
          <ProductImage
            src={product.thumbnail}
            alt={product.title}
            variant="variant-2"
          />
          <Product.BodyWrapper>
            <Link
              to={`/product/${transformProductIdForURL(
                product.title,
                product.id
              )}?${new URLSearchParams({
                ...cartItemVariationAndQuantity(product.id),
              })}`}
            >
              <Product.Title>{product.title}</Product.Title>

              <CartItemVariation
                variation={cartItemVariationAndQuantity(product.id)}
              />
            </Link>
            <div className={classes["cart-item-bottom"]}>
              <Product.Price price={product.price} />
              <QuantityButtons
                value={getCartItemQuantity(product.id)}
                onChange={(e) =>
                  handleChangeQuantity(
                    e,
                    product.id,
                    cartItemVariationAndQuantity(product.id)
                  )
                }
                onDecrement={() => handleDecrementCartItemQuantity(product.id)}
                onIncrement={() =>
                  handleIncrementCartItemQuantity({
                    id: product.id,
                    quantity: (getCartItemQuantity(product.id) as number) + 1,
                    variation: cartItemVariationAndQuantity(product.id),
                  })
                }
              />
            </div>
          </Product.BodyWrapper>
        </Product.Wrapper>
      ))}
    </>
  );
};

export default CartItem;
