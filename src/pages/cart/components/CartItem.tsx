import { memo, Dispatch, SetStateAction } from "react";
import { useAppDispatch } from "../../../redux/hooks/useAppDispatch";

import {
  addToCartProduct,
  removeFromCartProduct,
  changeQuantity,
} from "../../../redux/cart/cart.slice";
import Product, {Price} from "../../../components/Products/Product";
import { ProductImage } from "../../../components/Products/Product";
import mergeProductNameID from "../../../utils/mergeProductNameID";
import { TProduct } from "../../../types/TProducts";
import { Link, SetURLSearchParams } from "react-router-dom";
import QuantityButtons from "./QuantityButtons";
import { TCartProducts } from "../../../redux/cart/cart.types";
import { TVarietiesProduct } from "../../../types/TProducts";
import CartItemVariation from "./CartItemVariation";
import Checkbox from "../../../components/ui/Checkbox";
import { cartParams } from "../../../utils/productConstant";
import { TSelectedCart } from "../../../redux/cart/cart.types";
import { extractIdFromText } from "../../../utils/extractId";
import classes from "../../../styles/pages/cart/CartItem.module.css";

type TCartItemProps = {
  products?: TProduct[];
  cartItems: TCartProducts[];
  selectedCartItem: number[];
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
  const transformProductIdForURL = (title: string, id: number) => {
    const { newProductId } = mergeProductNameID({
      productName: title,
      productId: id,
    });
    return newProductId;
  };

  const handleCartItemCheckbox = (productId: number, name: string) => {
    let updatedSelectedCartItem: TSelectedCart[];
    const isIdExisting = selectedCartItem.includes(productId);
    const { newProductId } = mergeProductNameID({
      productName: name,
      productId,
    });
    const cartItem = cartItems.find((item) => item.id === productId)!;
    const selectedProduct = { ...cartItem, id: newProductId };

    if (Array.isArray(decodedData)) {
      if (isIdExisting) {
        updatedSelectedCartItem = decodedData.filter(
          (product) => product.id !== newProductId
        );
      } else {
        updatedSelectedCartItem = [
          ...decodedData,
          selectedProduct,
        ] as TSelectedCart[];
      }

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

  const getCartItemQuantity = (id: number) => {
    const item = cartItems.find((cartItem) => cartItem.id === id);
    return item?.quantity;
  };

  const handleIncrementCartItemQuantity = (item: TCartProducts) => {
    if (selectedCartItem.includes(item.id)) {
      const updatedData = decodedData.map((product) => {
        const extractedId = extractIdFromText(product.id);
        if (extractedId === item.id) {
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
    id: number;
    quantity: number;
  }) => {
    if (selectedCartItem.includes(item.id)) {
      const updatedData = decodedData.map((product) => {
        const extractedId = extractIdFromText(product.id);
        if (extractedId === item.id) {
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
    productId: number,
    variation: TVarietiesProduct
  ) => {
    const value = parseInt(e.target.value);
    if (selectedCartItem.includes(productId)) {
      const updatedData = decodedData.map((product) => {
        const extractedId = parseInt(product.id.split("-").slice(-1)[0]);
        if (extractedId === productId) {
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
      {products?.map((product) => {
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
              onChange={() => handleCartItemCheckbox(product.id, product.title)}
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
                      cartItemVariationAndQuantity(product.id)
                    )
                  }
                  onDecrement={() =>
                    handleDecrementCartItemQuantity({
                      id: product.id,
                      quantity: (getCartItemQuantity(product.id) as number) - 1,
                    })
                  }
                  onIncrement={() =>
                    handleIncrementCartItemQuantity({
                      id: product.id,
                      imageId: imageId,
                      quantity: (getCartItemQuantity(product.id) as number) + 1,
                      variation: cartItemVariationAndQuantity(product.id),
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
