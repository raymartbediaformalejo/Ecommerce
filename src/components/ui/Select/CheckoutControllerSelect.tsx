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
  placeholder?: string;
};

const CheckoutControllerSelect = ({
  name,
  placeholder,
  control,
  options,
  errors,
}: TCheckoutControllerSelect) => {
  // console.log(placeholder);
  // console.log(control);

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <Select
              name={field.name}
              isSearchable={true}
              placeholder={placeholder}
              options={options}
              className={`${classes["select"]} ${
                Object.keys(errors).includes(field.name) ? classes["error"] : ""
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
              value={field.value.value.length > 0 ? field.value : null}
              onChange={(value) => {
                console.log("FIELD VALUE: ", field.value);
                field.onChange(value);
              }}
            />
          );
        }}
      />
      {Object.keys(errors).includes(name) && (
        <p className={classes["select-error"]}>{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default CheckoutControllerSelect;
