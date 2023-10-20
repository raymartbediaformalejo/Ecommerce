import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";

import classes from "../../../styles/components/ui/Modal/BillingAddressModal.module.css";
import { TDelivery as TBillingAddress } from "../../../types/TDelivery";
import { deliverytSchema } from "../../../types/validateSchema/Delivery.shema";
import { REGION_CODE, COUNTY_CODE } from "../../../utils/productConstant";
import Input from "../Input/Input";
import Modal from "./Modal";

type TBillingAddressModal = {
  title?: string;
  isOpened: boolean;
  onClose: () => void;
};

const regionOptions = [...new Set(REGION_CODE)].map((region) => ({
  value: region.toLowerCase().split(" ").join("-"),
  label: region,
}));
const countryOptions = [...new Set(COUNTY_CODE)].map((country) => ({
  value: country.toLowerCase().split(" ").join("-"),
  label: country,
}));

const BillingAddressModal = ({
  title,
  isOpened,
  onClose,
}: TBillingAddressModal) => {
  const { handleSubmit, reset, control, watch, formState } =
    useForm<TBillingAddress>({
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
      },
      resolver: zodResolver(deliverytSchema),
    });
  const [canFocus, setCanFocus] = useState(false);
  console.log(watch());

  const onSubmit = async (data: TBillingAddress) => {
    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    reset();
  };

  console.log(canFocus);

  const onErrors = () => {
    setCanFocus(true);
  };

  return (
    <Modal title={title} isOpened={isOpened} onClose={onClose}>
      <form
        onSubmit={handleSubmit(onSubmit, onErrors)}
        className={`container ${classes["delivery"]}`}
      >
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
                placeholder="Postal code"
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
      </form>
    </Modal>
  );
};

export default BillingAddressModal;
