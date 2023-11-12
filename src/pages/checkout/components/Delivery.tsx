import { Control, FieldErrors } from "react-hook-form";

import classes from "../../../styles/pages/checkout/Delivery.module.css";
import CheckoutControllerInput from "../../../components/ui/Input/CheckoutControllerInput";
import CheckoutControllerSelect from "../../../components/ui/Select/CheckoutControllerSelect";
import Checkbox from "../../../components/ui/Checkbox";
import {
  TDelivery as TCheckout,
  TOptions,
  TShippingMethod,
} from "../../../types/TDelivery";
import ShippingMethod from "./ShippingMethod";
import AddressFields from "./AddressFields";

type TDeliveryProps = TShippingMethod & {
  control: Control<TCheckout>;
  countryOptions: TOptions;
  regionOptions: TOptions;
  errors: FieldErrors<TCheckout>;
  isSaveAddress: boolean;
  onSaveAddress: () => void;
};

const Delivery = ({
  control,
  countryOptions,
  regionOptions,
  errors,
  isFreeShipping,
  isShippingAddressFilled,
  isSaveAddress,
  onSaveAddress,
}: TDeliveryProps) => {
  return (
    <div className={`${classes["delivery"]}`}>
      <div className="container__small">
        <h2 className={classes["delivery__title"]}>Delivery</h2>
        <AddressFields
          control={control}
          errors={errors}
          countryOptions={countryOptions}
          regionOptions={regionOptions}
        />
        {/* <div className={classes["input-fields"]}>
          <CheckoutControllerSelect
            name="country"
            placeholder="Country"
            control={control}
            options={countryOptions}
            errors={errors}
          />

          <CheckoutControllerInput
            name="first-name"
            placeholder="First name"
            type="text"
            control={control}
            errorMessage={errors["first-name"]?.message}
          />
          <CheckoutControllerInput
            name="last-name"
            placeholder="Last name"
            type="text"
            control={control}
            errorMessage={errors["last-name"]?.message}
          />
          <CheckoutControllerInput
            name="lbc-branch-and-address"
            placeholder="LBC Branch & Address (Only fill this up if Cash On Pick Up is your payment method)"
            type="text"
            control={control}
            errorMessage={errors["lbc-branch-and-address"]?.message}
          />
          <CheckoutControllerInput
            name="address"
            placeholder="Address"
            type="text"
            control={control}
            errorMessage={errors["address"]?.message}
          />
          <CheckoutControllerInput
            name="postal-code"
            placeholder="Postal code"
            type="number"
            control={control}
            errorMessage={errors["postal-code"]?.message}
          />
          <CheckoutControllerInput
            name="city"
            placeholder="City"
            type="text"
            control={control}
            errorMessage={errors["city"]?.message}
          />
          <CheckoutControllerSelect
            name="region"
            placeholder="Region"
            control={control}
            options={regionOptions}
            errors={errors}
          />
          <CheckoutControllerInput
            name="phone"
            control={control}
            placeholder="Phone"
            type="tel"
            errorMessage={errors["phone"]?.message}
          />
        </div> */}

        <Checkbox
          className={classes["save-delivery-info__checkbox"]}
          label="Save this information for next time"
          size="small"
          onChange={onSaveAddress}
          isChecked={isSaveAddress}
        />
        <ShippingMethod
          isFreeShipping={isFreeShipping}
          isShippingAddressFilled={isShippingAddressFilled}
        />
      </div>
    </div>
  );
};

export default Delivery;
