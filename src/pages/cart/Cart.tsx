import { Link } from "react-router-dom";

import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import { useGetAllProductsQuery } from "../../redux/products/products.api";
import cartIcon from "../../assets/icons/shoppingbag2.svg";
import { TCartProducts } from "../../redux/cart/cart.types";
import Product from "../../components/Products/Product";
import mergeProductNameID from "../../utils/mergeProductNameID";
import { ProductImage } from "../../components/Products/Product";
import plusIcon from "../../assets/icons/Plus.svg";
import minusIcon from "../../assets/icons/Minus.svg";
import classes from "../../styles/pages/cart/Cart.module.css";
import {
  addToCartProduct,
  removeFromCartProduct,
} from "../../redux/cart/cart.slice";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import Button from "../../components/ui/Button";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartState = useAppSelector((state) => state.cart.products);

  const cartItemsString = localStorage.getItem("cart") ?? "";
  const cartItems: TCartProducts[] =
    cartItemsString && JSON.parse(cartItemsString);
  const cartItemsIds = cartItems && cartItems.map((cartItem) => cartItem.id);
  const { data: products } = useGetAllProductsQuery({ ids: cartItemsIds });
  const isHaveCartItems = cartItemsIds && cartItemsIds.length > 0;
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

  return (
    <div className={classes["cart"]}>
      <h3 className={classes["title"]}>Cart</h3>
      {isHaveCartItems ? (
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
                    )}`}
                  >
                    <Product.Title>{product.title}</Product.Title>
                  </Link>

                  <div className={classes["add-minus-wrapper"]}>
                    <button
                      onClick={() =>
                        handleDecrementCartItemQuantity(product.id)
                      }
                      type="button"
                      className={classes["button"]}
                    >
                      <img src={minusIcon} />
                    </button>
                    <p className={classes["quantity"]}>
                      {getCartItemQuantity(product.id)}
                    </p>
                    <button
                      onClick={() =>
                        handleIncrementCartItemQuantity({
                          id: product.id,
                          quantity: 1,
                        })
                      }
                      type="button"
                      className={classes["button"]}
                    >
                      <img src={plusIcon} />
                    </button>
                  </div>

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
        {isHaveCartItems && (
          <div className={classes["price-summary"]}>
            <div className={classes["subtotal"]}>
              <p className={classes["subtotal__title"]}>sub total:</p>
              <Product.Price price={subtotal as number} size="large" />
            </div>
          </div>
        )}
        <div className={classes["cart-buttons-wrapper"]}>
          {isHaveCartItems ? (
            <Button size="large">
              <img src={cartIcon} />
              Buy now
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
