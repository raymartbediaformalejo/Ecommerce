import { Link } from "react-router-dom";

import cartIcon from "../../../assets/icons/shoppingbag2.svg";
import Product from "../../../components/Products/Product";
import Button from "../../../components/ui/Button";
import classes from "../../../styles/pages/cart/CartOrderTotal.module.css";
import { TProduct } from "../../../types/TProducts";
import { TCartProducts } from "../../../redux/cart/cart.types";

type TCartOrderTotalProps = {
  products?: TProduct[];
  isCartEmpty: boolean;
  cartItems: TCartProducts[];
  selectedCartItem: number[];
};

const CartOrderTotal = ({
  products,
  cartItems,
  isCartEmpty = false,
  selectedCartItem,
}: TCartOrderTotalProps) => {
  const subtotal = products?.reduce((prevValue, currentValue) => {
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
  const totalDiscount = products?.reduce((prevValue, currentValue) => {
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

  return (
    <div className={classes["cart-bottom"]}>
      {isCartEmpty && (
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
        {isCartEmpty ? (
          <Button size="large">
            <img src={cartIcon} />
            Checkout
            <span>{`(${totalItemSelected})`}</span>
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
  );
};

export default CartOrderTotal;
