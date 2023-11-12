import React, { useRef } from "react";
import { Controller, Control } from "react-hook-form";

import { TDelivery as TCheckout } from "../../../types/TDelivery";
import classes from "../../../styles/pages/checkout/PaymentMethod.module.css";

type TPaymentMethodProps = {
  control: Control<TCheckout>;
  paymentMethodInfo: "cash-on-delivery" | "lbc";
  billingAddressInfo: "same-as-shipping-address" | "different-billing-address";
  setIsOpenBillingAddressModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const PaymentMethod = ({
  control,
  paymentMethodInfo,
  billingAddressInfo,
  setIsOpenBillingAddressModal,
}: TPaymentMethodProps) => {
  const codRef = useRef<HTMLDivElement>(null);
  const lbcRef = useRef<HTMLDivElement>(null);

  const isSelectedPaymentMethod = (name: string) => {
    return paymentMethodInfo === name;
  };

  const isBillingAddress = (name: string) => {
    return billingAddressInfo === name;
  };

  return (
    <div className={`${classes["payment"]}`}>
      <div className="container__small">
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
                          deliveries. Deliveries for Metro Manila will take 5-7
                          working days.
                          <br /> 3. Please prepare your payment on the day of
                          delivery and have someone ready to receive your orders
                          to avoid delivery conflicts.
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
                          5-7 working days. Deliveries for cities and provinces
                          outside Luzon may take up to 7-12 working days.
                          <br /> 3. Expect a text message from LBC once your
                          order is ready for pick-up. Please bring your I.D. and
                          payment before heading to your preferred LBC branch.
                          <br /> Our community managers will reach out to you in
                          case there are incomplete details on your order (e.g.
                          address). Please respond within 3 business days to
                          update your details or the order will be canceled.
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
          <h3 className={classes["billing-address__title"]}>Billing address</h3>
          <div className={classes["billing-address__wrapper"]}>
            <Controller
              name="billing-address"
              control={control}
              render={({ field: { onChange, name } }) => (
                <fieldset className={classes["billing-address__fieldset"]}>
                  <legend className={classes["legend"]}>
                    Choose a billing method
                  </legend>
                  <div>
                    <div
                      className={`${
                        isBillingAddress("same-as-shipping-address")
                          ? classes["selected-billing-address"]
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
                          ? classes["selected-billing-address"]
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
                              onClick={() =>
                                setIsOpenBillingAddressModal((prev) => !prev)
                              }
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
    </div>
  );
};

export default PaymentMethod;
