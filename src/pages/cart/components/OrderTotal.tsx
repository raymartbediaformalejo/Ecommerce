import { useEffect } from "react";
import { Link, SetURLSearchParams } from "react-router-dom";

import cartIcon from "../../../assets/icons/shoppingbag2.svg";
import Product from "../../../components/Products/Product";
import Button from "../../../components/ui/Button";
import classes from "../../../styles/pages/cart/CartOrderTotal.module.css";
import Checkbox from "../../../components/ui/Checkbox";
import { TCartProducts, TSelectedCart } from "../../../redux/cart/cart.types";
import { cartParams } from "../../../utils/productConstant";

type TCartOrderTotalProps = {
  cartItems: TCartProducts[];
  isCartEmpty: boolean;
  isSelectedAllCartItem: boolean;
  totalItemSelected: number;
  setSearchParams: SetURLSearchParams;
  selectedCartItem: number[];
  subtotal: number;
  totalDiscount: number;
  decodedData: TSelectedCart[];
  onSelectAll: () => void;
};

const CartOrderTotal = ({
  cartItems,
  isCartEmpty = false,
  isSelectedAllCartItem = false,
  totalItemSelected,
  subtotal,
  totalDiscount,
  setSearchParams,
  decodedData,
  onSelectAll,
}: TCartOrderTotalProps) => {
  useEffect(() => {
    setSearchParams((prev) => {
      if (subtotal !== 0 && totalDiscount !== 0) {
        prev.set(
          cartParams.subtotal,
          encodeURIComponent(subtotal.toFixed(2).toString())
        );
        prev.set(
          cartParams.totalDiscount,
          encodeURIComponent(totalDiscount.toFixed(2).toString())
        );
      } else {
        prev.delete(cartParams.subtotal);
        prev.delete(cartParams.totalDiscount);
      }

      return prev;
    });
  }, [subtotal, totalDiscount, setSearchParams]);
  console.log(decodedData);

  return (
    <div
      className={`${classes["cart-bottom"]} ${
        cartItems.length === 0 ? classes["empty-cart"] : ""
      } `}
    >
      {cartItems.length > 0 && (
        <div className={classes["checkbox-select-all"]}>
          <Checkbox
            onChange={onSelectAll}
            isChecked={isSelectedAllCartItem}
            title="select-all"
          />
          <p>All</p>
        </div>
      )}
      {isCartEmpty && (
        <div className={classes["price-summary"]}>
          <div className={classes["subtotal"]}>
            <p className={classes["subtotal__title"]}>subtotal:</p>
            <Product.Price price={subtotal} size="medium" isEmphasize={true} />
          </div>
          <div className={classes["saved"]}>
            <p className={classes["saved__title"]}>saved:</p>
            <Product.Price price={totalDiscount} size="small" />
          </div>
        </div>
      )}
      <div className={classes["cart-buttons-wrapper"]}>
        {isCartEmpty ? (
          <Link
            to={`/checkout?${new URLSearchParams({
              product: encodeURIComponent(JSON.stringify(decodedData)),
              subtotal: encodeURIComponent(subtotal),
              totalDiscount: encodeURIComponent(totalDiscount),
            })}`}
          >
            <Button
              size="medium"
              textTransform="capitalize"
              disabled={!totalItemSelected}
            >
              Check out
              <span>{`(${totalItemSelected})`}</span>
            </Button>
          </Link>
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
