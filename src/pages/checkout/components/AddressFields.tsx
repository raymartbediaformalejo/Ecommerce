import { Control, FieldErrors } from "react-hook-form";

import CheckoutControllerInput from "../../../components/ui/Input/CheckoutControllerInput";
import CheckoutControllerSelect from "../../../components/ui/Select/CheckoutControllerSelect";
import { TDelivery as TCheckout, TOptions } from "../../../types/TDelivery";
import classes from "../../../styles/pages/checkout/AddressFields.module.css";

type TAddressFieldsProps = {
  control: Control<TCheckout>;
  countryOptions: TOptions;
  regionOptions: TOptions;
  errors: FieldErrors<TCheckout>;
};

const AddressFields = ({
  control,
  errors,
  countryOptions,
  regionOptions,
}: TAddressFieldsProps) => {
  return (
    <div className={classes["input-fields"]}>
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
    </div>
  );
};

export default AddressFields;
