import classes from "../../../styles/pages/checkout/ShippingMethod.module.css";
import { Price } from "../../../components/Products/Product";
import { TShippingMethod } from "../../../types/TDelivery";

const ShippingMethod = ({
  isFreeShipping,
  isShippingAddressFilled,
}: TShippingMethod) => {
  const shippingMethodContent = () => {
    if (isFreeShipping) {
      return (
        <div>
          <p>Free delivery</p>
          <p>Free</p>
        </div>
      );
    } else if (!isShippingAddressFilled) {
      return (
        <p className={classes["shipping-method__content"]}>
          Enter your shipping address to view available shipping methods.
        </p>
      );
    } else {
      return (
        <div>
          <p>
            Home or Office Delivery / Cash on Delivery (COD) / LBC Branch Cash
            on Pick Up (COP) - Automatically based on your payment method
          </p>
          <Price price={149} size="medium" />
        </div>
      );
    }
  };
  return (
    <div className={classes["shipping-method-card"]}>
      <h3 className={classes["shipping-method__title"]}>Shipping method</h3>
      <div
        className={`${classes["shipping-method"]} ${
          !isShippingAddressFilled && !isFreeShipping
            ? classes["no-shipping-address"]
            : ""
        }`}
      >
        {shippingMethodContent()}
      </div>
    </div>
  );
};

export default ShippingMethod;
