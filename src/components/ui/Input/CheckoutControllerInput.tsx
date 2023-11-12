import { HTMLInputTypeAttribute } from "react";
import { Controller, Control, FieldPath } from "react-hook-form";

import Input from "./Input";
import { TDelivery as TCheckout } from "../../../types/TDelivery";

type TCheckoutControllerInput = {
  control: Control<TCheckout>;
  name: FieldPath<TCheckout>;
  errorMessage?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
};

const CheckoutControllerInput = ({
  name,
  placeholder,
  type,
  control,
  errorMessage,
}: TCheckoutControllerInput) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          placeholder={placeholder}
          type={type}
          value={field.value as string | undefined}
          onChange={(value) => field.onChange(value)}
          errorMessage={errorMessage}
        />
      )}
    />
  );
};

export default CheckoutControllerInput;
