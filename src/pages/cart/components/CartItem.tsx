import React from "react";
import { useAppDispatch } from "../../../redux/hooks/useAppDispatch";

import {
  addToCartProduct,
  removeFromCartProduct,
  changeQuantity,
} from "../../../redux/cart/cart.slice";
import Product from "../../../components/Products/Product";
import { ProductImage } from "../../../components/Products/Product";
import mergeProductNameID from "../../../utils/mergeProductNameID";
import { TProduct } from "../../../types/TProducts";
import { Link, SetURLSearchParams } from "react-router-dom";
import QuantityButtons from "./QuantityButtons";
import { TCartProducts } from "../../../redux/cart/cart.types";
import { TVarietiesProduct } from "../../../types/TProducts";
import CartItemVariation from "./CartItemVariation";
import classes from "../../../styles/pages/cart/CartItem.module.css";
import Checkbox from "../../../components/ui/Checkbox";
import { TO_CHECKOUT_PARAM } from "../../../utils/productConstant";

type TCartItemProps = {
  products?: TProduct[];
  cartItems: TCartProducts[];
  selectedCartItem: number[];
  selectedCartItemStringArray: string[];
  setSearchParams: SetURLSearchParams;
};

const CartItem = ({
  products,
  cartItems,
  selectedCartItem,
  selectedCartItemStringArray,
  setSearchParams,
}: TCartItemProps) => {
  const dispatch = useAppDispatch();
  const transformProductIdForURL = (title: string, id: number) => {
    const { newProductId } = mergeProductNameID({
      productName: title,
      productId: id,
    });
    return newProductId;
  };

  const handleCartItemCheckbox = (productId: number, productTitle: string) => {
    const isIdExisting = selectedCartItem.includes(productId);
    const { newProductId } = mergeProductNameID({
      productName: productTitle,
      productId,
    });
    let updatedSelectedCartItem;
    setSearchParams((prev) => {
      if (isIdExisting) {
        updatedSelectedCartItem = selectedCartItemStringArray.filter(
          (cartId) => cartId !== newProductId
        );
      } else {
        updatedSelectedCartItem = [
          ...selectedCartItemStringArray,
          newProductId,
        ];
      }
      prev.set(TO_CHECKOUT_PARAM, updatedSelectedCartItem.toString());
      return prev;
    });
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
  console.log(selectedCartItem);

  return (
    <>
      {products?.map((product) => (
        <Product.Wrapper key={product.id}>
          <Checkbox
            title={product.title}
            onChange={() => handleCartItemCheckbox(product.id, product.title)}
            isChecked={selectedCartItem.includes(product.id)}
          />
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
