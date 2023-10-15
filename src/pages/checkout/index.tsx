import { useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";

import classes from "../../styles/pages/checkout/Checkout.module.css";
import { cartParams } from "../../utils/productConstant";
import { TSelectedCart } from "../../redux/cart/cart.types";
import { extractIdFromURLParam } from "../../utils/extractId";
import { useGetAllProductsQuery } from "../../redux/products/products.api";
import { useState } from "react";
import { ArrowIcon } from "../../components/icons/ArrowIcon";
import Product from "../../components/Products/Product";
import Input from "../../components/ui/Input/Input";
import Checkbox from "../../components/ui/Checkbox";
import OrderProductSummary from "./components/OrderProductSummary";
import Contact from "./components/Contact";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const productParamString = searchParams.get(cartParams.product) || "[]";
  const productParamObjects: TSelectedCart[] = JSON.parse(
    decodeURIComponent(productParamString as string)
  );
  const { data: products } = useGetAllProductsQuery({
    ids: extractIdFromURLParam(productParamObjects),
  });

  const subtotalParam = searchParams.get(cartParams.subtotal) || "0";
  const subtotal = parseFloat(decodeURIComponent(subtotalParam));

  const [isShowOrderSummary, setIsShowOrderSummary] = useState(false);
  const orderSummaryRef = useRef<HTMLDivElement>(null);
  const [emailUserNews, setEmailUserNews] = useState(false);
  const [accountEmail, setAccountEmail] = useState("");
  const [shippingFee, setShippingFee] = useState(0);

  const handleToggleEmailUser = () => {
    setEmailUserNews((prev) => !prev);
  };

  const handleToggleOrderSummary = () => {
    setIsShowOrderSummary((prev) => !prev);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountEmail(e.target.value);
  };

  console.log(accountEmail);

  return (
    <>
      <aside>
        <button
          onClick={handleToggleOrderSummary}
          className={classes["order-summary-button"]}
        >
          <p className={classes["order-summary-button__title"]}>
            Show order summary <ArrowIcon />
          </p>
          <Product.Price
            className={classes["subtotal"]}
            price={subtotal}
            isEmphasize={true}
          />
        </button>
        <div
          ref={orderSummaryRef}
          className={`${classes["checkout"]} ${
            isShowOrderSummary ? classes["active"] : ""
          }`}
          style={
            orderSummaryRef && isShowOrderSummary
              ? { maxHeight: orderSummaryRef.current?.scrollHeight }
              : { maxHeight: "0px" }
          }
        >
          <OrderProductSummary
            products={products?.products}
            productParamObjects={productParamObjects}
            subtotal={subtotal}
            shippingFee={shippingFee}
            showOrderTotal
          />
        </div>
      </aside>
      {/* <input type="text" onChange={(e) => handleChangeEmail()} /> */}

      <Contact
        onChange={handleToggleEmailUser}
        isChecked={emailUserNews}
        onAccountEmail={handleChangeEmail}
        accountEmail={accountEmail}
      />
    </>
  );
};

export default Checkout;
