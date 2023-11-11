import { Controller, Control, FieldPath } from "react-hook-form";

import Input from "./Input";
import { TDelivery as TCheckout } from "../../../types/TDelivery";

type TCheckoutControllerInput = {
  control: Control<TCheckout>;
  name: FieldPath<TCheckout>;
  errorMessage?: string;
};

const CheckoutControllerInput = ({
  name,
  control,
  errorMessage,
}: TCheckoutControllerInput) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          placeholder="First name"
          type="text"
          value={field.value as string | undefined}
          onChange={(value) => field.onChange(value)}
          errorMessage={errorMessage}
        />
      )}
    />
  );
};

export default CheckoutControllerInput;
