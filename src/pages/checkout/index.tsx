import { useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import classes from "../../styles/pages/checkout/Checkout.module.css";
import { cartParams } from "../../utils/productConstant";
import { TSelectedCart } from "../../redux/cart/cart.types";
import { extractIdFromURLParam } from "../../utils/extractId";
import { useGetAllProductsQuery } from "../../redux/products/products.api";
import { useState } from "react";
import { ArrowIcon } from "../../components/icons/ArrowIcon";
import Product from "../../components/Products/Product";
import OrderProductSummary from "./components/OrderProductSummary";
import Button from "../../components/ui/Button";
import { TDelivery as TCheckout } from "../../types/TDelivery";
import { deliverytSchema } from "../../types/validateSchema/Delivery.shema";
import Input from "../../components/ui/Input/Input";
import Select from "react-select";
import { REGION_CODE, COUNTY_CODE } from "../../utils/productConstant";
import Checkbox from "../../components/ui/Checkbox";
import { Controller, useForm } from "react-hook-form";
const Checkout = () => {
  const [searchParams] = useSearchParams();
  const productParamString = searchParams.get(cartParams.product) || "[]";
  const productParamObjects: TSelectedCart[] = JSON.parse(
    decodeURIComponent(productParamString as string)
  );
  const { data: products } = useGetAllProductsQuery({
    ids: extractIdFromURLParam(productParamObjects),
  });
  const regionOptions = [...new Set(REGION_CODE)].map((region) => ({
    value: region.toLowerCase().split(" ").join("-"),
    label: region,
  }));
  const countryOptions = [...new Set(COUNTY_CODE)].map((country) => ({
    value: country.toLowerCase().split(" ").join("-"),
    label: country,
  }));
  const subtotalParam = searchParams.get(cartParams.subtotal) || "0";
  const subtotal = parseFloat(decodeURIComponent(subtotalParam));
  const [isShowOrderSummary, setIsShowOrderSummary] = useState(false);
  const orderSummaryRef = useRef<HTMLDivElement>(null);
  const [emailUserNews, setEmailUserNews] = useState(false);

  // FORM STATE ================================================================================
  const { handleSubmit, reset, control, formState } = useForm<TCheckout>({
    shouldFocusError: false,
    defaultValues: {
      email: "",
      "first-name": "",
      "last-name": "",
      phone: "",
      country: { value: "", label: "" },
      address: "",
      "postal-code": 0,
      region: { value: "", label: "" },
      city: "",
    },
    resolver: zodResolver(deliverytSchema),
  });
  const [canFocus, setCanFocus] = useState(false);

  console.log("Errors: ", formState.errors);

  const onSubmit = async (data: TCheckout) => {
    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    reset();
  };

  const onErrors = () => {
    setCanFocus(true);
  };

  const handleToggleEmailUser = () => {
    setEmailUserNews((prev) => !prev);
  };

  const handleToggleOrderSummary = () => {
    setIsShowOrderSummary((prev) => !prev);
  };

  useEffect(() => {
    if (formState.errors && canFocus) {
      const elements = Object.keys(formState.errors)
        .map((name) => document.getElementsByName(name)[0])
        .filter((el) => !!el);

      elements.sort(
        (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top
      );

      if (elements.length > 0) {
        const erroElement = elements[0];
        erroElement.scrollIntoView({ behavior: "smooth", block: "center" });
        erroElement.focus({ preventScroll: true });
        setCanFocus(false);
      }
    }
  }, [formState, canFocus]);

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
            shippingFee={0}
            showOrderTotal
          />
        </div>
      </aside>
      <form onSubmit={handleSubmit(onSubmit, onErrors)}>
        {/*===============================START CONTACT */}

        <div className={`container ${classes["contact"]}`}>
          <div className={classes["contact__header"]}>
            <h2 className={classes["contact__title"]}>Contact</h2>
            <p className={classes["login"]}>
              Have and account? <Link to={"/login"}>Login</Link>
            </p>
          </div>
          <div className={classes["input"]}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Email"
                  type="email"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  errorMessage={formState.errors.email?.message}
                />
              )}
            />

            <Checkbox
              label="Email me with news and offers"
              size="small"
              onChange={handleToggleEmailUser}
              isChecked={emailUserNews}
            />
          </div>
        </div>

        {/*===============================ENDT CONTACT */}

        {/*===============================START DELIVERY */}

        <div className={`container ${classes["delivery"]}`}>
          <h2>Delivery</h2>
          <div className={classes["input-fields"]}>
            <Controller
              name="country"
              control={control}
              defaultValue={{ value: "", label: "" }}
              render={({ field: { value, onChange } }) => (
                <Select
                  placeholder="Country"
                  options={countryOptions}
                  className={classes["select"]}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary50: "hsl(18 31% 51% / 0.4)",
                      primary25: "hsl(18 31% 51% / 0.2)",
                      primary: "hsl(18 31% 51%)",
                    },
                  })}
                  value={countryOptions.find(
                    (country) => country.value === value.value
                  )}
                  onChange={(val) => onChange(val)}
                />
              )}
            />
            <Controller
              name="first-name"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="First name"
                  type="text"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  errorMessage={formState.errors["first-name"]?.message}
                />
              )}
            />
            <Controller
              name="last-name"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Last name"
                  type="text"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  errorMessage={formState.errors["last-name"]?.message}
                />
              )}
            />
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Address"
                  type="text"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  errorMessage={formState.errors.address?.message}
                />
              )}
            />
            <Controller
              name="postal-code"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Postal code"
                  type="text"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  errorMessage={formState.errors["postal-code"]?.message}
                />
              )}
            />
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="City"
                  type="text"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  errorMessage={formState.errors.city?.message}
                />
              )}
            />

            <Controller
              name="region"
              control={control}
              defaultValue={{ value: "", label: "" }}
              render={({ field: { onChange, value } }) => (
                <Select
                  placeholder="Region"
                  className={classes["select"]}
                  options={regionOptions}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary50: "hsl(18 31% 51% / 0.4)",
                      primary25: "hsl(18 31% 51% / 0.2)",
                      primary: "hsl(18 31% 51%)",
                    },
                  })}
                  value={regionOptions.find(
                    (region) => region.value === value.value
                  )}
                  onChange={(val) => onChange(val)}
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Phone"
                  type="tel"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  errorMessage={formState.errors.phone?.message}
                />
              )}
            />
          </div>
        </div>
        {/*===============================ENDT DELIVERY */}

        <Button type="submit" size="large">
          Complete Order
        </Button>
      </form>
    </>
  );
};

export default Checkout;
