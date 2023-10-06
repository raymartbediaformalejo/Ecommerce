import { useGetAllProductsQuery } from "../../redux/products/products.api";
import { TCartProducts } from "../../redux/cart/cart.types";
import Product from "../../components/Products/Product";
import classes from "../../styles/pages/cart/Cart.module.css";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import CartItem from "./components/CartItem";
import CartOrderTotal from "./components/CartOrderTotal";
import { useState } from "react";

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
      <h3 className={classes["title"]}>
        Cart <span>{`(${totalCartItems})`}</span>
      </h3>
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
      />
    </div>
  );
};

export default Cart;
