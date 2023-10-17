import { FormEvent, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ZodIssue } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import useActions from "../../redux/hooks/useActions";
import classes from "../../styles/pages/checkout/Checkout.module.css";
import { cartParams } from "../../utils/productConstant";
import { TSelectedCart } from "../../redux/cart/cart.types";
import { extractIdFromURLParam } from "../../utils/extractId";
import { useGetAllProductsQuery } from "../../redux/products/products.api";
import { useState } from "react";
import { ArrowIcon } from "../../components/icons/ArrowIcon";
import Product from "../../components/Products/Product";
import OrderProductSummary from "./components/OrderProductSummary";
import Contact from "./components/Contact";
import Delivery from "./components/Delivery";
import Button from "../../components/ui/Button";
import { TDelivery as TCheckout } from "../../types/TDelivery";
import { deliverytSchema } from "../../types/validateSchema/Delivery.shema";
import Input from "../../components/ui/Input/Input";
import Select from "react-select";
// import Select from "../../components/ui/Select/Select";
import { REGION_CODE, COUNTY_CODE } from "../../utils/productConstant";
import Checkbox from "../../components/ui/Checkbox";
import { Controller, useForm } from "react-hook-form";
// type TCheckoutFormErrors = { code: string; message: string; path: string[] }[];
const options = [{ value: "philippines", label: "Philippines" }];
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
    value: country,
  }));
  const subtotalParam = searchParams.get(cartParams.subtotal) || "0";
  const subtotal = parseFloat(decodeURIComponent(subtotalParam));
  const [isShowOrderSummary, setIsShowOrderSummary] = useState(false);
  const orderSummaryRef = useRef<HTMLDivElement>(null);
  const [emailUserNews, setEmailUserNews] = useState(false);

  // FORM STATE ================================================================================
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TCheckout>({
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

  // useEffect(() => {
  //   const firstError = (
  //     Object.keys(errors) as Array<keyof typeof errors>
  //   ).reduce<keyof typeof errors | null>((field, a) => {
  //     const fieldKey = field as keyof typeof errors;
  //     return !errors[fieldKey] ? fieldKey : a;
  //   }, null);

  //   if (firstError) {
  //     setFocus(firstError);
  //   }
  // }, [errors, setFocus]);

  const onSubmit = async (data: TCheckout) => {
    console.log("Form data submitted:");
    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    reset();
  };

  const onErrors = () => {
    console.log("wrong");
  };

  const handleToggleEmailUser = () => {
    setEmailUserNews((prev) => !prev);
  };

  const handleToggleOrderSummary = () => {
    setIsShowOrderSummary((prev) => !prev);
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit, onErrors)}>
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
                errorMessage={errors.email?.message}
                // errorMessage={checkoutFormErrors["email"]}
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
            render={({ field: { onChange, value, name, ref } }) => (
              <Select
                ref={ref}
                // classNamePrefix="addl-class"
                options={options}
                value={options.find((country) => country.value === value.value)}
                onChange={(val) => onChange(val)}
              />
            )}
          />
          {/* <Select label="Country" options={countryOptions} /> */}
          <Controller
            name="first-name"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="First name"
                type="text"
                value={field.value}
                onChange={(value) => field.onChange(value)}
                errorMessage={errors["first-name"]?.message}
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
                errorMessage={errors["last-name"]?.message}
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
                errorMessage={errors.address?.message}
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
                errorMessage={errors["postal-code"]?.message}
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
                errorMessage={errors.city?.message}
              />
            )}
          />

          <Controller
            name="region"
            control={control}
            defaultValue={{ value: "", label: "" }}
            render={({ field: { onChange, value, ref } }) => (
              <Select
                ref={ref}
                // classNamePrefix="addl-class"
                options={regionOptions}
                value={regionOptions.find(
                  (region) => region.value === value.value
                )}
                onChange={(val) => onChange(val)}
              />
            )}
          />

          {/* <Controller
            name="region"
            control={control}
            render={({ field }) => (
              <Select
                label="Region"
                options={regionOptions}
                value={field.value}
                onChange={(value) => field.onChange(value)}
              />
            )}
          /> */}

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Phone"
                type="tel"
                value={field.value}
                onChange={(value) => field.onChange(value)}
                errorMessage={errors.phone?.message}
              />
            )}
          />
        </div>
      </div>
      {/*===============================ENDT DELIVERY */}

      <button type="submit">Complete Order</button>
    </form>
  );
};

export default Checkout;
