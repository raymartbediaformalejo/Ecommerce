import { useState, useRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";

import classes from "../../../styles/components/ui/Modal/BillingAddressModal.module.css";
import { TDelivery as TBillingAddress } from "../../../types/TDelivery";
import { billingAddressSchema } from "../../../types/validateSchema/BillingAddress.schema";
import { REGION_CODE, COUNTY_CODE } from "../../../utils/productConstant";
import Input from "../Input/Input";
import Modal from "./Modal";
import Button from "../Button";

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
  const billingRef = useRef<HTMLFormElement>(null);
  const { handleSubmit, control, formState } = useForm<TBillingAddress>({
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
    resolver: zodResolver(billingAddressSchema),
  });
  const [canFocus, setCanFocus] = useState(false);

  const onSubmit = async (data: TBillingAddress) => {
    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    onClose();
  };

  const onErrors = () => {
    setCanFocus(true);
  };

  useEffect(() => {
    if (formState.errors && canFocus && billingRef.current) {
      const elements = Array.from(
        billingRef.current?.querySelectorAll(
          `input`
        ) as Iterable<HTMLInputElement>
      );

      const elementWithError = elements.filter((element) => {
        const id = element?.getAttribute("id");
        const errorKeys = Object.keys(formState.errors);
        if (id?.includes("select-7") && errorKeys.includes("country"))
          return true;
        if (id?.includes("select-9") && errorKeys.includes("region"))
          return true;

        return id && errorKeys.includes(id);
      });

      if (elementWithError.length > 0) {
        const erroElement = elementWithError[0];

        erroElement.scrollIntoView({ behavior: "smooth", block: "center" });
        erroElement.focus({ preventScroll: true });
        setCanFocus(false);
      }
    }
  }, [formState, canFocus]);

  return (
    <Modal
      className={classes["billing-modal"]}
      title={title}
      isOpened={isOpened}
      onClose={onClose}
      position="bottom"
    >
      <form
        onSubmit={handleSubmit(onSubmit, onErrors)}
        className={`container ${classes["billing"]}`}
        ref={billingRef}
      >
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
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Email"
                type="email"
                value={field.value}
                onChange={(value) => field.onChange(value)}
                errorMessage={formState.errors.email?.message}
              />
            )}
          />

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
        <div className={classes["buttons"]}>
          <Button type="submit">Save</Button>
          <Button variant="gray" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default BillingAddressModal;