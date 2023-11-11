import { Controller, Control, FieldPath, FieldErrors } from "react-hook-form";
import Select from "react-select";

import { TDelivery as TCheckout, TOptions } from "../../../types/TDelivery";
import classes from "../../../styles/components/ui/Select/CheckoutControllerSelect.module.css";

type TCheckoutControllerSelect = {
  control: Control<TCheckout>;
  name: FieldPath<{ country: string; region: string }>;
  errors: FieldErrors<TCheckout>;
  errorMessage?: string;
  options: TOptions;
};

const CheckoutControllerSelect = ({
  name,
  control,
  options,
  errors,
}: TCheckoutControllerSelect) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue={{ value: "", label: "" }}
        render={({ field: { value, onChange, name } }) => (
          <Select
            name="country"
            isSearchable={true}
            placeholder="Country"
            options={options}
            className={`${classes["select"]} ${
              Object.keys(errors).includes(name) ? classes["error"] : ""
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
            value={options.find((country) => {
              country.value === value.value;
            })}
            onChange={(val) => onChange(val)}
          />
        )}
      />
      {Object.keys(errors).includes("country") && (
        <p className={classes["select-error"]}>{errors["country"]?.message}</p>
      )}
    </div>
  );
};

export default CheckoutControllerSelect;
