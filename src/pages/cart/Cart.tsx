import { useSearchParams } from "react-router-dom";

import { useGetAllProductsQuery } from "../../redux/products/products.api";
import { TCartProducts } from "../../redux/cart/cart.types";
import Product from "../../components/Products/Product";
import classes from "../../styles/pages/cart/Cart.module.css";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import CartItem from "./components/CartItem";
import CartOrderTotal from "./components/CartOrderTotal";
import CartHeader from "./components/CartHeader";
import { TO_CHECKOUT_PARAM } from "../../utils/productConstant";
import { useConvertToArray } from "../../hooks/useConvertToArray";

const extractIdFromURL = (textArray: string[]) => {
  return textArray.map((text) => parseInt(text.split("-").slice(-1)[0]));
};

const Cart = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const cartState = useAppSelector((state) => state.cart.products);
  const cartItemsString = localStorage.getItem("cart") ?? "";
  const cartItems: TCartProducts[] =
    cartItemsString && JSON.parse(cartItemsString);
  const cartItemsIds = cartItems && cartItems.map((cartItem) => cartItem.id);
  const { data: products } = useGetAllProductsQuery({ ids: cartItemsIds });

  const selectedCartItemParam = searchParams.get(TO_CHECKOUT_PARAM) || "";

  const { newArray: selectedCartItemStringArray = [] } = useConvertToArray(
    selectedCartItemParam
  );

  const selectedCartItem = extractIdFromURL(selectedCartItemStringArray);

  const isCartEmpty =
    cartState &&
    cartState.length > 0 &&
    cartItemsIds &&
    cartItemsIds.length > 0;

  const totalCartItems = cartItems.reduce((prevValue, currentValue) => {
    return prevValue + currentValue.quantity;
  }, 0);

  const totalItemSelected = selectedCartItem.reduce((acc, prevValue) => {
    const selectedCartItem = cartItems?.find(
      (product) => product.id === prevValue
    );
    if (selectedCartItem) {
      return acc + selectedCartItem?.quantity;
    } else {
      return 0;
    }
  }, 0);

  return (
    <div className={classes["cart"]}>
      <CartHeader
        totalCartItems={totalCartItems}
        selectedCartItem={selectedCartItem}
        totalItemSelected={totalItemSelected}
        setSearchParams={setSearchParams}
      />
      {isCartEmpty ? (
        <Product isGridLayout={false} page="cart">
          <CartItem
            products={products?.products}
            cartItems={cartItems}
            selectedCartItem={selectedCartItem}
            selectedCartItemStringArray={selectedCartItemStringArray}
            setSearchParams={setSearchParams}
          />
        </Product>
      ) : (
        <div className={classes["empty-cart"]}>
          <p>You have no items in your cart.</p>
        </div>
      )}
      <CartOrderTotal
        cartItems={cartItems}
        products={products?.products}
        isCartEmpty={isCartEmpty}
        totalItemSelected={totalItemSelected}
        selectedCartItem={selectedCartItem}
        setSearchParams={setSearchParams}
      />
    </div>
  );
};

export default Cart;
