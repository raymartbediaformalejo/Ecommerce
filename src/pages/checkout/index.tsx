import { useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, FieldError } from "react-hook-form";

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
  const codRef = useRef<HTMLDivElement>(null);
  const lbcRef = useRef<HTMLDivElement>(null);
  const differentBillingAddressRed = useRef<HTMLDivElement>(null);
  const { handleSubmit, reset, control, watch, formState } = useForm<TCheckout>(
    {
      shouldFocusError: false,
      defaultValues: {
        email: "",
        "first-name": "",
        "last-name": "",
        "lbc-branch-and-address": "",
        phone: "",
        country: { value: "", label: "" },
        address: "",
        "postal-code": "",
        region: { value: "", label: "" },
        city: "",
        "payment-method": "cash-on-delivery",
        "billing-address": "same-as-shipping-address",
      },
      resolver: zodResolver(deliverytSchema),
    }
  );
  const isFreeShipping = subtotal >= 3000;
  const isShippingAddressFilled = watch([
    "country",
    "address",
    "city",
    "postal-code",
    "region",
  ]).every((value) => {
    if (typeof value === "string") {
      return value.length > 0;
    }
    if (typeof value === "object") {
      return value.value.length > 0 && value.label.length > 0;
    }
  });

  const [canFocus, setCanFocus] = useState(false);
  const [isSaveAddress, setIsSaveAddress] = useState(false);

  const isSelectedPaymentMethod = (name: string) => {
    return watch("payment-method") === name;
  };

  const isBillingAddress = (name: string) => {
    return watch("billing-address") === name;
  };

  // console.log("watch payment-method", watch("payment-method"));
  // console.log("watch billing-address", watch("billing-address"));
  console.log(watch());

  const onSubmit = async (data: TCheckout) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    reset();
  };

  const onErrors = () => {
    setCanFocus(true);
  };

  const handleToggleEmailUser = () => {
    setEmailUserNews((prev) => !prev);
  };

  const handleSaveAddress = () => {
    setIsSaveAddress((prev) => !prev);
  };

  const handleToggleOrderSummary = () => {
    setIsShowOrderSummary((prev) => !prev);
  };

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
          <Product.Price price={149} size="medium" />
        </div>
      );
    }
  };

  useEffect(() => {
    if (formState.errors && canFocus) {
      const elements = Object.keys(formState.errors)
        .map((name) => {
          let element: HTMLElement | undefined;
          if (name === "country" || name === "region") {
            const countryElement = document.getElementsByName(name)[0];
            if (countryElement) {
              const parentElement =
                countryElement.parentElement?.children[2].children[0];
              if (parentElement instanceof HTMLElement) {
                element = parentElement.children[1].children[0] as HTMLElement;
              } else {
                element = countryElement as HTMLElement;
              }
            }
          } else {
            element = document.getElementsByName(name)[0] as HTMLElement;
          }
          return element;
        })
        .filter((el) => !!el) as HTMLElement[];

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

  console.log(formState.errors);
  console.log(
    // @ts-expect-error: Let's ignore a compile error like this unreachable code
    formState.errors["billing-address"]?.address?.message
  );

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
          <h2 className={classes["delivery__title"]}>Delivery</h2>
          <div className={classes["input-fields"]}>
            <div className={classes["select-wrapper"]}>
              <Controller
                name="country"
                control={control}
                defaultValue={{ value: "", label: "" }}
                render={({ field: { value, onChange, name, ref } }) => (
                  <Select
                    name="country"
                    ref={ref}
                    isSearchable={true}
                    placeholder="Country"
                    options={countryOptions}
                    className={`${classes["select"]} ${
                      Object.keys(formState.errors).includes(name)
                        ? classes["error"]
                        : ""
                    }`}
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
              {Object.keys(formState.errors).includes("country") && (
                <p className={classes["select-error"]}>
                  {formState.errors["country"]?.message}
                </p>
              )}
            </div>
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
              name="lbc-branch-and-address"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="LBC Branch & Address (Only fill this up if Cash On Pick Up is your payment method)"
                  type="text"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  errorMessage={
                    formState.errors["lbc-branch-and-address"]?.message
                  }
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
                  placeholder="Postalcode"
                  type="number"
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
            <div>
              <Controller
                name="region"
                control={control}
                defaultValue={{ value: "", label: "" }}
                render={({ field: { onChange, value, name, ref } }) => (
                  <Select
                    ref={ref}
                    name="region"
                    isSearchable={true}
                    placeholder="Region"
                    className={`${classes["select"]} ${
                      Object.keys(formState.errors).includes(name)
                        ? classes["error"]
                        : ""
                    }`}
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
              {Object.keys(formState.errors).includes("region") && (
                <p className={classes["select-error"]}>
                  {formState.errors["region"]?.message}
                </p>
              )}
            </div>

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
          <Checkbox
            label="Save this information for next time"
            size="small"
            onChange={handleSaveAddress}
            isChecked={isSaveAddress}
          />

          <div className={classes["shipping-method-card"]}>
            <h3 className={classes["shipping-method__title"]}>
              Shipping method
            </h3>
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
        </div>
        {/*===============================ENDT DELIVERY */}

        {/*===============================START PAYMENT */}
        <div className={`container ${classes["payment"]}`}>
          <h2 className={classes["payment__title"]}>Payment</h2>
          <div className={classes["payment__wrapper"]}>
            <Controller
              name="payment-method"
              control={control}
              render={({ field: { onChange, name } }) => (
                <fieldset className={classes["payment__fieldset"]}>
                  <legend className={classes["legend"]}>
                    Choose a payment method
                  </legend>
                  <div>
                    <div
                      className={`${
                        isSelectedPaymentMethod("cash-on-delivery")
                          ? classes["selected-payment-method"]
                          : ""
                      }`}
                    >
                      <label
                        htmlFor="cash-on-delivery"
                        className={classes["label"]}
                      >
                        <div className={classes["label__content"]}>
                          <div>
                            <input
                              type="radio"
                              id="cash-on-delivery"
                              checked={isSelectedPaymentMethod(
                                "cash-on-delivery"
                              )}
                              name={name}
                              className={classes["radio"]}
                              value="cash-on-delivery"
                              onChange={(e) => {
                                onChange(e.target.value as string);
                              }}
                            />
                          </div>
                          <div>
                            <span className={classes["label__text"]}>
                              Cash on Delivery (For Home and Office Address)
                            </span>
                          </div>
                        </div>
                      </label>
                      <div
                        ref={codRef}
                        id="cash-on-delivery-desc"
                        style={
                          isSelectedPaymentMethod("cash-on-delivery")
                            ? { maxHeight: codRef.current?.scrollHeight }
                            : { maxHeight: "0px" }
                        }
                        className={classes["payment-item__description"]}
                      >
                        <div
                          className={
                            classes["payment-item__description-inner-wrapper"]
                          }
                        >
                          <p>
                            Please take note of the following for the Cash On
                            Delivery (COD) option: <br />
                            1. Only orders within Metro Manila are eligible for
                            Cash On Delivery. Visayas and Mindanao customers are
                            advised to pay in advance or opt for Cash On Pickup
                            (COP) in your nearest LBC branch instead. <br />
                            2. Allow 3-5 days to prepare your orders. This
                            includes quality control, packing, and scheduling of
                            deliveries. Deliveries for Metro Manila will take
                            5-7 working days.
                            <br /> 3. Please prepare your payment on the day of
                            delivery and have someone ready to receive your
                            orders to avoid delivery conflicts.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`${
                        isSelectedPaymentMethod("lbc")
                          ? classes["selected-payment-method"]
                          : ""
                      }`}
                    >
                      <label htmlFor="lbc" className={classes["label"]}>
                        <div className={classes["label__content"]}>
                          <div>
                            <input
                              type="radio"
                              id="lbc"
                              name={name}
                              checked={isSelectedPaymentMethod("lbc")}
                              className={classes["radio"]}
                              value="lbc"
                              onChange={(e) => {
                                onChange(e.target.value as string);
                              }}
                            />
                          </div>
                          <div>
                            <span>Cash on Pick Up (For LBC Branches)</span>
                          </div>
                        </div>
                      </label>
                      <div
                        ref={lbcRef}
                        id="lbc-desc"
                        style={
                          isSelectedPaymentMethod("lbc")
                            ? { maxHeight: lbcRef.current?.scrollHeight }
                            : { maxHeight: "0px" }
                        }
                        className={classes["payment-item__description"]}
                      >
                        <div
                          className={
                            classes["payment-item__description-inner-wrapper"]
                          }
                        >
                          <p>
                            Please take note of the following for the Cash On
                            Pick-up (COP) option:
                            <br />
                            1. Allow 3-5 days to prepare your orders. This
                            includes quality control, packing, and scheduling of
                            deliveries.
                            <br />
                            2. Deliveries within Metro Manila and Luzon may take
                            5-7 working days. Deliveries for cities and
                            provinces outside Luzon may take up to 7-12 working
                            days.
                            <br /> 3. Expect a text message from LBC once your
                            order is ready for pick-up. Please bring your I.D.
                            and payment before heading to your preferred LBC
                            branch.
                            <br /> Our community managers will reach out to you
                            in case there are incomplete details on your order
                            (e.g. address). Please respond within 3 business
                            days to update your details or the order will be
                            canceled.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
              )}
            />
          </div>

          <div className={classes["billing-address"]}>
            <h3 className={classes["billing-address__title"]}>
              Billing address
            </h3>
            <div className={classes["payment__wrapper"]}>
              <Controller
                name="billing-address"
                control={control}
                render={({ field: { onChange, name, value } }) => (
                  <fieldset className={classes["payment__fieldset"]}>
                    <legend className={classes["legend"]}>
                      Choose a billing method
                    </legend>
                    <div>
                      <div
                        className={`${
                          isBillingAddress("same-as-shipping-address")
                            ? classes["selected-payment-method"]
                            : ""
                        }`}
                      >
                        <label
                          htmlFor="same-as-shipping-address"
                          className={classes["label"]}
                        >
                          <div className={classes["label__content"]}>
                            <div>
                              <input
                                type="radio"
                                checked={isBillingAddress(
                                  "same-as-shipping-address"
                                )}
                                id="same-as-shipping-address"
                                name={name}
                                className={classes["radio"]}
                                value="same-as-shipping-address"
                                onChange={(e) => {
                                  onChange(e.target.value as string);
                                }}
                              />
                            </div>
                            <div>
                              <span className={classes["label__text"]}>
                                Same as shipping address
                              </span>
                            </div>
                          </div>
                        </label>
                      </div>
                      <div
                        className={`${
                          isBillingAddress("different-billing-address")
                            ? classes["selected-payment-method"]
                            : ""
                        }`}
                      >
                        <label
                          htmlFor="different-billing-address"
                          className={classes["label"]}
                        >
                          <div className={classes["label__content"]}>
                            <div>
                              <input
                                type="radio"
                                id="different-billing-address"
                                checked={isBillingAddress(
                                  "different-billing-address"
                                )}
                                name={name}
                                className={classes["radio"]}
                                value="different-billing-address"
                                onChange={(e) => {
                                  onChange(e.target.value as string);
                                }}
                              />
                            </div>
                            <div>
                              <span>Use a different billing address</span>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </fieldset>
                )}
              />
            </div>
          </div>
        </div>
        {/*===============================ENDT PAYMENT */}

        <Button type="submit" size="large">
          Complete Order
        </Button>
      </form>
    </>
  );
};

export default Checkout;
