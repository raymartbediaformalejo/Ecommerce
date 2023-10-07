import { useGetAllProductsQuery } from "../../redux/products/products.api";
import { TCartProducts } from "../../redux/cart/cart.types";
import Product from "../../components/Products/Product";
import classes from "../../styles/pages/cart/Cart.module.css";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import CartItem from "./components/CartItem";
import CartOrderTotal from "./components/CartOrderTotal";
import deleteIcon from "../../assets/icons/delete2.svg";
import { useState } from "react";
import CartHeader from "./components/CartHeader";

const Cart = () => {
  const cartState = useAppSelector((state) => state.cart.products);

  const cartItemsString = localStorage.getItem("cart") ?? "";
  const cartItems: TCartProducts[] =
    cartItemsString && JSON.parse(cartItemsString);
  const cartItemsIds = cartItems && cartItems.map((cartItem) => cartItem.id);
  const { data: products } = useGetAllProductsQuery({ ids: cartItemsIds });
  const [selectedCartItem, setSelectedCartItem] = useState<number[]>([]);

  const isCartEmpty =
    cartState &&
    cartState.length > 0 &&
    cartItemsIds &&
    cartItemsIds.length > 0;

  const totalCartItems = cartItems.reduce((prevValue, currentValue) => {
    return prevValue + currentValue.quantity;
  }, 0);

  return (
    <div className={classes["cart"]}>
      <CartHeader
        totalCartItems={totalCartItems}
        selectedCartItem={selectedCartItem}
      />
      {isCartEmpty ? (
        <Product isGridLayout={false} page="cart">
          <CartItem
            products={products?.products}
            cartItems={cartItems}
            selectedCartItem={selectedCartItem}
            setSelectedCartItem={setSelectedCartItem}
          />
        </Product>
      ) : (
        <div className={classes["empty-cart"]}>
          <p>You have no items in your cart.</p>
        </div>
      )}
      <CartOrderTotal
        products={products?.products}
        cartItems={cartItems}
        isCartEmpty={isCartEmpty}
        selectedCartItem={selectedCartItem}
      />
    </div>
  );
};

export default Cart;
