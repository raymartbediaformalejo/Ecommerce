import { Link, SetURLSearchParams } from "react-router-dom";

import cartIcon from "../../../assets/icons/shoppingbag2.svg";
import Product from "../../../components/Products/Product";
import Button from "../../../components/ui/Button";
import classes from "../../../styles/pages/cart/CartOrderTotal.module.css";
import Checkbox from "../../../components/ui/Checkbox";
import { TCartProducts } from "../../../redux/cart/cart.types";
import { TProduct } from "../../../types/TProducts";
import mergeProductNameID from "../../../utils/mergeProductNameID";
import { TO_CHECKOUT_PARAM } from "../../../utils/productConstant";

type TCartOrderTotalProps = {
  cartItems: TCartProducts[];
  products?: TProduct[];
  isCartEmpty: boolean;
  totalItemSelected: number;
  setSearchParams: SetURLSearchParams;
  selectedCartItem: number[];
};

const CartOrderTotal = ({
  cartItems,
  products,
  isCartEmpty = false,
  totalItemSelected,
  selectedCartItem,
  setSearchParams,
}: TCartOrderTotalProps) => {
  const isSelectedAllCartItem =
    cartItems.length !== 0 &&
    selectedCartItem.length !== 0 &&
    cartItems.length === selectedCartItem.length;
  const subtotal = selectedCartItem.reduce((prevValue, currentValue) => {
    let subTotal = 0;
    const selectedCart = cartItems.find(
      (cartItem) => cartItem.id === currentValue
    );

    const selectedProduct = products?.find(
      (product) => product.id === currentValue
    );

    if (selectedCart && selectedCart.quantity && selectedProduct) {
      const discounterPrice =
        selectedProduct.price -
        (selectedProduct.discountPercentage / 100) * selectedProduct.price;
      subTotal = prevValue + discounterPrice * selectedCart?.quantity;
    }

    return subTotal;
  }, 0);

  const totalDiscount = selectedCartItem.reduce((prevValue, currentValue) => {
    let totalDiscount = 0;
    const selectedCart = cartItems.find(
      (cartItem) => cartItem.id === currentValue
    );

    const selectedProduct = products?.find(
      (product) => product.id === currentValue
    );

    if (selectedCart && selectedCart.quantity && selectedProduct) {
      const discountedPrice =
        (selectedProduct.discountPercentage / 100) * selectedProduct.price;
      totalDiscount = prevValue + discountedPrice * selectedCart.quantity;
    }
    return totalDiscount;
  }, 0);

  const handleSelectAll = () => {
    const allCartItemArrayString = cartItems.map((cartItem) => {
      const product = products?.find((product) => product.id === cartItem.id);

      const { newProductId } = mergeProductNameID({
        productName: product?.title,
        productId: product?.id,
      });

      return newProductId;
    });

    setSearchParams((prev) => {
      if (isSelectedAllCartItem) {
        prev.delete(TO_CHECKOUT_PARAM);
      } else {
        prev.set(TO_CHECKOUT_PARAM, allCartItemArrayString.toString());
      }
      return prev;
    });
  };

  console.log(cartItems);

  return (
    <div
      className={`${classes["cart-bottom"]} ${
        cartItems.length === 0 ? classes["empty-cart"] : ""
      } `}
    >
      {cartItems.length > 0 && (
        <div className={classes["checkbox-select-all"]}>
          <Checkbox
            onChange={handleSelectAll}
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
            <Product.Price
              price={subtotal as number}
              size="medium"
              isEmphasize={true}
            />
          </div>
          <div className={classes["saved"]}>
            <p className={classes["saved__title"]}>saved:</p>
            <Product.Price price={totalDiscount as number} size="small" />
          </div>
        </div>
      )}
      <div className={classes["cart-buttons-wrapper"]}>
        {isCartEmpty ? (
          <Button
            size="medium"
            textTransform="capitalize"
            disabled={!totalItemSelected}
          >
            Check out
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
