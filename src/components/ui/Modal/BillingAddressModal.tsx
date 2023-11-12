import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import classes from "../../../styles/components/ui/Modal/BillingAddressModal.module.css";
import {
  TDelivery as TBillingAddress,
  TOptions,
} from "../../../types/TDelivery";
import { billingAddressSchema } from "../../../types/validateSchema/BillingAddress.schema";
import Modal from "./Modal";
import Button from "../Button";
import AddressFields from "../../../pages/checkout/components/AddressFields";

type TBillingAddressModal = {
  title?: string;
  isOpened: boolean;
  countryOptions: TOptions;
  regionOptions: TOptions;

  onClose: () => void;
};

const BillingAddressModal = ({
  title,
  isOpened,
  countryOptions,
  regionOptions,
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
        className={`container__small ${classes["billing"]}`}
        ref={billingRef}
      >
        <AddressFields
          control={control}
          errors={formState.errors}
          countryOptions={countryOptions}
          regionOptions={regionOptions}
        />

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
