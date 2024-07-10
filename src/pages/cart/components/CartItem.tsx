import { memo, Dispatch, SetStateAction } from "react";
import { useAppDispatch } from "../../../redux/hooks/useAppDispatch";

import {
  addToCartProduct,
  removeFromCartProduct,
  changeQuantity,
} from "../../../redux/cart/cart.slice";
import Product, { Price } from "../../../components/Products/Product";
import { ProductImage } from "../../../components/Products/Product";
import { TProduct } from "../../../types/TProducts";
import { Link, SetURLSearchParams } from "react-router-dom";
import QuantityButtons from "./QuantityButtons";
import { TCartProducts } from "../../../redux/cart/cart.types";
import { TVarietiesProduct } from "../../../types/TProducts";
import CartItemVariation from "./CartItemVariation";
import Checkbox from "../../../components/ui/Checkbox";
import { cartParams } from "../../../utils/productConstant";
import { TSelectedCart } from "../../../redux/cart/cart.types";
import classes from "../../../styles/pages/cart/CartItem.module.css";

type TCartItemProps = {
  products?: TProduct[];
  cartItems: TCartProducts[];
  selectedCartItem: string[];
  decodedData: TSelectedCart[];
  setDecodedData: Dispatch<SetStateAction<TSelectedCart[]>>;
  setSearchParams: SetURLSearchParams;
};

const MemoizedProductImage = memo(ProductImage);

const CartItem = ({
  products,
  cartItems,
  selectedCartItem,
  decodedData,
  setDecodedData,
  setSearchParams,
}: TCartItemProps) => {
  const dispatch = useAppDispatch();
  console.log("selectedCartItem: ", selectedCartItem);

  const handleCartItemCheckbox = (productId: string) => {
    console.log("productId: ", productId);

    let updatedSelectedCartItem: TSelectedCart[];
    const isIdExisting = selectedCartItem.includes(productId);

    const cartItem = cartItems.find((item) => item.id === productId)!;
    const selectedProduct = { ...cartItem, id: productId };

    if (Array.isArray(decodedData)) {
      if (isIdExisting) {
        updatedSelectedCartItem = decodedData.filter(
          (product) => product.id !== productId
        );
      } else {
        updatedSelectedCartItem = [
          ...decodedData,
          selectedProduct,
        ] as TSelectedCart[];
      }
      console.log("updatedSelectedCartItem: ", updatedSelectedCartItem);

      setDecodedData(updatedSelectedCartItem as TSelectedCart[]);

      setSearchParams((prev) => {
        if (updatedSelectedCartItem.length > 0) {
          prev.set(
            cartParams.product,
            encodeURIComponent(JSON.stringify(updatedSelectedCartItem))
          );
        } else {
          prev.delete(cartParams.product);
        }
        return prev;
      });
    }
  };

  const getCartItemQuantity = (id: string) => {
    const item = cartItems.find((cartItem) => cartItem.id === id);
    return item?.quantity;
  };

  const handleIncrementCartItemQuantity = (item: TCartProducts) => {
    if (selectedCartItem.includes(item.id)) {
      const updatedData = decodedData.map((product) => {
        if (item.id) {
          return { ...product, quantity: item.quantity };
        }
        return product;
      });

      setDecodedData(updatedData);

      setSearchParams((prev) => {
        prev.set(
          cartParams.product,
          encodeURIComponent(JSON.stringify(updatedData))
        );
        return prev;
      });
    }

    dispatch(addToCartProduct(item));
  };

  const handleDecrementCartItemQuantity = (item: {
    id: string;
    quantity: number;
  }) => {
    if (selectedCartItem.includes(item.id)) {
      const updatedData = decodedData.map((product) => {
        if (item.id) {
          return { ...product, quantity: item.quantity };
        }
        return product;
      });

      setDecodedData(updatedData);

      setSearchParams((prev) => {
        prev.set(
          cartParams.product,
          encodeURIComponent(JSON.stringify(updatedData))
        );
        return prev;
      });
    }
    dispatch(removeFromCartProduct(item.id));
  };

  const handleChangeQuantity = (
    e: React.ChangeEvent<HTMLInputElement>,
    productId: string,
    variation: TVarietiesProduct
  ) => {
    const value = parseInt(e.target.value);
    if (selectedCartItem.includes(productId)) {
      const updatedData = decodedData.map((product) => {
        if (productId) {
          return { ...product, quantity: value };
        }
        return product;
      });

      setDecodedData(updatedData);

      setSearchParams((prev) => {
        prev.set(
          cartParams.product,
          encodeURIComponent(JSON.stringify(updatedData))
        );
        return prev;
      });
    }
    dispatch(changeQuantity({ id: productId, quantity: value, variation }));
  };

  const cartItemVariationAndQuantity = ({
    productId,
    hasImageId = false,
  }: {
    productId: string;
    hasImageId?: boolean;
  }): TVarietiesProduct => {
    const cartItem = cartItems.find((cartItem) => cartItem.id === productId);
    console.log(cartItem);

    if (cartItem) {
      const { quantity, variation, imageId } = cartItem;

      const variationObject = Object.fromEntries(
        Object.entries(variation || {})
          .map(([key, value]) => [key, String(value)])
          .filter(([_, value]) => value.length > 0)
      );

      if (hasImageId) {
        return {
          quantity: String(quantity),
          ...variationObject,
          imageId: imageId,
        };
      } else {
        return {
          quantity: String(quantity),
          ...variationObject,
        };
      }
    }

    return {};
  };

  return (
    <>
      {products
        ?.filter((product) =>
          cartItems.some((cartItem) => cartItem.id === product.id)
        )
        .map((product) => {
          const imageId = cartItems.find(
            (cartItem) => cartItem.id === product.id
          )?.imageId;

          return (
            <Product.Wrapper
              key={product.id}
              className={classes["cart-item-inner-wrapper"]}
            >
              <Checkbox
                id={product.title}
                onChange={() => handleCartItemCheckbox(product.id)}
                isChecked={selectedCartItem.includes(product.id)}
              />
              <MemoizedProductImage
                src={product.images[imageId as number]}
                alt={product.title}
                variant="variant-2"
                className={classes["cart-item__image"]}
              />
              <Product.BodyWrapper>
                <Link
                  to={`/product/${product.id}?${new URLSearchParams({
                    ...cartItemVariationAndQuantity({
                      productId: product.id,
                      hasImageId: true,
                    }),
                  })}`}
                >
                  <Product.Title>{product.title}</Product.Title>

                  <CartItemVariation
                    variation={cartItemVariationAndQuantity({
                      productId: product.id,
                    })}
                  />
                </Link>
                <div className={classes["cart-item-bottom"]}>
                  <Price
                    price={product.price}
                    discountPercentage={product.discountPercentage}
                  />
                  <QuantityButtons
                    value={getCartItemQuantity(product.id)}
                    onChange={(e) =>
                      handleChangeQuantity(
                        e,
                        product.id,
                        cartItemVariationAndQuantity({ productId: product.id })
                      )
                    }
                    onDecrement={() =>
                      handleDecrementCartItemQuantity({
                        id: product.id,
                        quantity:
                          (getCartItemQuantity(product.id) as number) - 1,
                      })
                    }
                    onIncrement={() =>
                      handleIncrementCartItemQuantity({
                        id: product.id,
                        imageId: imageId,
                        quantity:
                          (getCartItemQuantity(product.id) as number) + 1,
                        variation: cartItemVariationAndQuantity({
                          productId: product.id,
                        }),
                      })
                    }
                  />
                </div>
              </Product.BodyWrapper>
            </Product.Wrapper>
          );
        })}
    </>
  );
};

export default CartItem;
