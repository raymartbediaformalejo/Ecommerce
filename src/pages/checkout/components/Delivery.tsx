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
  // const handleRegion = (value: string) => {
  //   setRegion(value);
  // };
  return (
    <div className={`${classes["delivery"]}`}>
      <div className="container__small">
        <h2 className={classes["delivery__title"]}>Delivery</h2>
        <div className={classes["input-fields"]}>
          <CheckoutControllerSelect
            name="country"
            control={control}
            options={countryOptions}
            errors={errors}
          />

          <CheckoutControllerInput name="first-name" control={control} />
          <CheckoutControllerInput name="last-name" control={control} />
          <CheckoutControllerInput
            name="lbc-branch-and-address"
            control={control}
          />
          <CheckoutControllerInput name="address" control={control} />
          <CheckoutControllerInput name="postal-code" control={control} />
          <CheckoutControllerInput name="city" control={control} />
          <CheckoutControllerInput name="city" control={control} />
          <CheckoutControllerSelect
            name="region"
            control={control}
            options={regionOptions}
            errors={errors}
          />
          <CheckoutControllerInput name="phone" control={control} />
        </div>

        <Checkbox
          className={classes["save-delivery-info__checkbox"]}
          label="Save this information for next time"
          size="small"
          onChange={onSaveAddress}
          isChecked={isSaveAddress}
        />
      </div>

      <ShippingMethod
        isFreeShipping={isFreeShipping}
        isShippingAddressFilled={isShippingAddressFilled}
      />
    </div>
  );
};

export default Delivery;
