import { Link } from "react-router-dom";

import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import { useGetAllProductsQuery } from "../../redux/products/products.api";
import cartIcon from "../../assets/icons/shoppingbag2.svg";
import { TCartProducts } from "../../redux/cart/cart.types";
import Product from "../../components/Products/Product";
import mergeProductNameID from "../../utils/mergeProductNameID";
import { ProductImage } from "../../components/Products/Product";
import classes from "../../styles/pages/cart/Cart.module.css";
import {
  addToCartProduct,
  changeQuantity,
  removeFromCartProduct,
} from "../../redux/cart/cart.slice";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import Button from "../../components/ui/Button";
import QuantityButtons from "./components/QuantityButtons";
import CartItemVariation from "./components/CartItemVariation";
import { TVarietiesProduct } from "../../types/TProducts";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartState = useAppSelector((state) => state.cart.products);

  const cartItemsString = localStorage.getItem("cart") ?? "";
  const cartItems: TCartProducts[] =
    cartItemsString && JSON.parse(cartItemsString);
  const cartItemsIds = cartItems && cartItems.map((cartItem) => cartItem.id);
  const { data: products } = useGetAllProductsQuery({ ids: cartItemsIds });
  const isCartHaveItems =
    cartState &&
    cartState.length > 0 &&
    cartItemsIds &&
    cartItemsIds.length > 0;
  const totalCartItems = cartItems.reduce((prevValue, currentValue) => {
    return prevValue + currentValue.quantity;
  }, 0);
  const subtotal = products?.products.reduce((prevValue, currentValue) => {
    let subTotal = 0;
    const selectedCartItemQuantity = cartItems.find(
      (cartItem) => cartItem.id === currentValue.id
    );

    if (selectedCartItemQuantity && selectedCartItemQuantity.quantity) {
      const discounterPrice =
        currentValue.price -
        (currentValue.discountPercentage / 100) * currentValue.price;
      subTotal =
        prevValue + discounterPrice * selectedCartItemQuantity?.quantity;
    }

    return subTotal;
  }, 0);

  const totalDiscount = products?.products.reduce((prevValue, currentValue) => {
    let totalDiscount = 0;
    const selectedCartItemQuantity = cartItems.find(
      (cartItem) => cartItem.id === currentValue.id
    );

    if (selectedCartItemQuantity && selectedCartItemQuantity.quantity) {
      const discountedPrice =
        (currentValue.discountPercentage / 100) * currentValue.price;
      totalDiscount =
        prevValue + discountedPrice * selectedCartItemQuantity.quantity;
    }
    return totalDiscount;
  }, 0);
  const getCartItemQuantity = (id: number) => {
    const selectedCartItem = cartItems.find((cartItem) => cartItem.id === id);

    return selectedCartItem?.quantity;
  };

  const transformProductIdForURL = (title: string, id: number) => {
    const { newProductId } = mergeProductNameID({
      productName: title,
      productId: id,
    });
    return newProductId;
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
    console.log(cartItem);

    if (cartItem) {
      const { quantity, variation } = cartItem;
      console.log("quantity: ", quantity);
      console.log("variation: ", variation);

      const variationObject = Object.fromEntries(
        Object.entries(variation || {})
          .map(([key, value]) => [key, String(value)])
          .filter(([_, value]) => value.length > 0)
      );

      console.log("variationObject: ", variationObject);

      return { quantity: String(quantity), ...variationObject };
    }

    return {};
  };
  console.log(cartItems);

  return (
    <div className={classes["cart"]}>
      <h3 className={classes["title"]}>
        Cart <span>{`(${totalCartItems})`}</span>
      </h3>
      {isCartHaveItems ? (
        <Product isGridLayout={false}>
          {products?.products?.map((product) => {
            return (
              <Product.Wrapper key={product.id}>
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
                      handleDecrementCartItemQuantity(product.id)
                    }
                    onIncrement={() =>
                      handleIncrementCartItemQuantity({
                        id: product.id,
                        quantity:
                          (getCartItemQuantity(product.id) as number) + 1,
                        variation: cartItemVariationAndQuantity(product.id),
                      })
                    }
                  />

                  <Product.Price
                    price={product.price}
                    discountPercentage={product.discountPercentage}
                  />
                </Product.BodyWrapper>
              </Product.Wrapper>
            );
          })}
        </Product>
      ) : (
        <div className={classes["empty-cart"]}>
          <p>You have no items in your cart.</p>
        </div>
      )}
      <div className={classes["cart-bottom"]}>
        {isCartHaveItems && (
          <div className={classes["price-summary"]}>
            <div className={classes["subtotal"]}>
              <p className={classes["subtotal__title"]}>sub total:</p>
              <Product.Price price={subtotal as number} size="large" />
            </div>
            <div className={classes["saved"]}>
              <p className={classes["saved__title"]}>saved:</p>
              <Product.Price price={totalDiscount as number} size="small" />
            </div>
          </div>
        )}
        <div className={classes["cart-buttons-wrapper"]}>
          {isCartHaveItems ? (
            <Button size="large">
              <img src={cartIcon} />
              Checkout
            </Button>
          ) : (
            <Link to="/products">
              <Button size="large">
                <img src={cartIcon} />
                Continue shopping
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
