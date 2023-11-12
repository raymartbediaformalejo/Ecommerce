import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import classes from "../../styles/pages/checkout/Checkout.module.css";
import { cartParams } from "../../utils/productConstant";
import { TSelectedCart } from "../../redux/cart/cart.types";
import { extractIdFromURLParam } from "../../utils/extractId";
import { useGetAllProductsQuery } from "../../redux/products/products.api";
import { ArrowIcon } from "../../components/icons/ArrowIcon";
import Product from "../../components/Products/Product";
import OrderProductSummary from "./components/OrderProductSummary";
import Button from "../../components/ui/Button";
import { TDelivery as TCheckout } from "../../types/TDelivery";
import { deliverytSchema } from "../../types/validateSchema/Delivery.shema";
import { REGION_CODE, COUNTY_CODE } from "../../utils/productConstant";
import BillingAddressModal from "../../components/ui/Modal/BillingAddressModal";
import { useGetUserQuery } from "../../redux/auth/auth.api";
import useActions from "../../redux/hooks/useActions";
import { useCheckoutSelector } from "../../redux/checkout/checkout.slice";
import CheckoutContact from "./components/CheckoutContact";

import Delivery from "./components/Delivery";
import PaymentMethod from "./components/PaymentMethod";

const regionOptions = [...new Set(REGION_CODE)].map((region) => ({
  value: region.toLowerCase().split(" ").join("-"),
  label: region,
}));

const countryOptions = [...new Set(COUNTY_CODE)].map((country) => ({
  value: country.toLowerCase().split(" ").join("-"),
  label: country,
}));

const Checkout = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const productParamString = searchParams.get(cartParams.product) || "[]";
  const productParamObjects: TSelectedCart[] = JSON.parse(
    decodeURIComponent(productParamString as string)
  );
  const { data: products } = useGetAllProductsQuery({
    ids: extractIdFromURLParam(productParamObjects),
  });
  const userId = localStorage.getItem("userId") || "";
  const { data: userApi } = useGetUserQuery(userId);
  const { saveAddress } = useActions();
  const addressSaveFromLocalStorage = useCheckoutSelector();

  const subtotalParam = searchParams.get(cartParams.subtotal) || "0";
  const subtotal = parseFloat(decodeURIComponent(subtotalParam));
  const [isShowOrderSummary, setIsShowOrderSummary] = useState(false);
  const orderSummaryRef = useRef<HTMLDivElement>(null);
  const [emailUserNews, setEmailUserNews] = useState(false);

  // FORM STATE ================================================================================
  const codRef = useRef<HTMLDivElement>(null);
  const lbcRef = useRef<HTMLDivElement>(null);
  const { handleSubmit, setValue, reset, control, watch, formState } =
    useForm<TCheckout>({
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
    });
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
  const [isOpenBillingAddressModal, setIsOpenBillingAddressModal] =
    useState(false);

  const isSelectedPaymentMethod = (name: string) => {
    return watch("payment-method") === name;
  };

  const isBillingAddress = (name: string) => {
    return watch("billing-address") === name;
  };

  const onSubmit = async (data: TCheckout) => {
    // console.log(data);

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

  const handleBillingAddressModal = () => {
    setIsOpenBillingAddressModal((prev) => !prev);
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

  console.log("codRef: ", codRef);
  console.log("lbcRef: ", lbcRef);

  useEffect(() => {
    if (userApi) {
      setValue("email", userApi.email);
    }
  }, [setValue, userApi]);

  console.log(
    watch([
      "first-name",
      "last-name",
      "lbc-branch-and-address",
      "country",
      "address",
      "postal-code",
      "city",
      "region",
      "phone",
    ])
  );

  // const addressInfo = watch([
  //   "first-name",
  //   "last-name",
  //   "lbc-branch-and-address",
  //   "country",
  //   "address",
  //   "postal-code",
  //   "city",
  //   "region",
  //   "phone",
  // ]);
  const paymentMethodInfo = watch("payment-method");
  const billingAddressInfo = watch("billing-address");
  console.log(paymentMethodInfo);

  // useEffect(() => {
  //   if (addressSaveFromLocalStorage) {
  //     dispatch(
  //       saveAddress({
  //         "first-name": addressInfo[0],
  //         "last-name": addressInfo[1],
  //         "lbc-branch-and-address": addressInfo[2],
  //         country: addressInfo[3],
  //         address: addressInfo[4],
  //         "postal-code": addressInfo[5],
  //         city: addressInfo[6],
  //         region: addressInfo[7],
  //         phone: addressInfo[8],
  //       })
  //     );
  //   }
  // }, [addressInfo]);
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

  return (
    <div className={classes["checkout"]}>
      <BillingAddressModal
        title="Billing address"
        isOpened={isOpenBillingAddressModal}
        onClose={handleBillingAddressModal}
      />
      <aside className={classes["order-summary__asside"]}>
        <button
          onClick={handleToggleOrderSummary}
          className={`${classes["order-summary-button"]}`}
        >
          <div
            className={`container__small ${classes["order-summary-button-inner-wrapper"]}`}
          >
            <p className={classes["order-summary-button__title"]}>
              {`${
                isShowOrderSummary ? "Hide order summary" : "Show order summary"
              }`}{" "}
              <ArrowIcon />
            </p>
            <Product.Price
              className={classes["subtotal"]}
              price={subtotal}
              isEmphasize={true}
            />
          </div>
        </button>
        <div
          ref={orderSummaryRef}
          className={`${classes["order-product-summary"]} ${
            isShowOrderSummary ? classes["active"] : ""
          }`}
          style={
            orderSummaryRef && isShowOrderSummary
              ? { maxHeight: orderSummaryRef.current?.scrollHeight }
              : { maxHeight: "0px" }
          }
        >
          <div className="container__small">
            <OrderProductSummary
              products={products?.products}
              productParamObjects={productParamObjects}
              subtotal={subtotal}
              shippingFee={0}
              showOrderTotal
            />
          </div>
        </div>
      </aside>
      <div className={`${classes["checkout-inner-wrapper"]}`}>
        <form
          onSubmit={handleSubmit(onSubmit, onErrors)}
          className={`${classes["checkout__form"]}`}
        >
          <CheckoutContact
            isChecked={emailUserNews}
            control={control}
            errorMessage={formState.errors.email?.message}
            onCheckbox={handleToggleEmailUser}
          />
          {/*===============================ENDT CONTACT */}
          {/*===============================START DELIVERY */}
          <Delivery
            control={control}
            countryOptions={countryOptions}
            regionOptions={regionOptions}
            errors={formState.errors}
            isSaveAddress={isSaveAddress}
            isFreeShipping={isFreeShipping}
            isShippingAddressFilled={isShippingAddressFilled}
            onSaveAddress={handleSaveAddress}
          />
          {/*===============================ENDT DELIVERY */}
          {/*===============================START PAYMENT */}
          <PaymentMethod
            control={control}
            paymentMethodInfo={paymentMethodInfo}
            billingAddressInfo={billingAddressInfo}
            setIsOpenBillingAddressModal={setIsOpenBillingAddressModal}
          />

          {/* ===============================ENDT PAYMENT */}
          <div className={classes["order-summary"]}>
            <div className="container__small">
              <h2 className={classes["order-summary__title"]}>Order summary</h2>
              <OrderProductSummary
                products={products?.products}
                productParamObjects={productParamObjects}
                subtotal={subtotal}
                shippingFee={0}
                showOrderTotal
              />
            </div>
          </div>
          <div className={`${classes["checkout-button"]}`}>
            <div className="container__small">
              <Button type="submit" size="large">
                Complete Order
              </Button>
            </div>
          </div>
        </form>

        {/* ===== ORDER SUMMARY LARGE SCREEN */}
        <aside className={classes["order-summary__large-screen"]}>
          <div className={classes["order-summary-wrapper"]}>
            <div className={classes["order-summary-inner-wrapper"]}>
              <OrderProductSummary
                products={products?.products}
                productParamObjects={productParamObjects}
                subtotal={subtotal}
                shippingFee={0}
                showOrderTotal
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
