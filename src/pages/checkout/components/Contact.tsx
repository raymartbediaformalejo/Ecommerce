import { Link } from "react-router-dom";
import { Controller, Control } from "react-hook-form";

import Input from "../../../components/ui/Input/Input";
import Checkbox from "../../../components/ui/Checkbox";
import classes from "../../../styles/pages/checkout/Contact.module.css";
import { TDelivery as TCheckout } from "../../../types/TDelivery";

type TContact = {
  control: Control<TCheckout>;
  isChecked: boolean;
  errorMessage?: string;
  onCheckbox: () => void;
};

const Contact = ({
  control,
  isChecked,
  errorMessage,
  onCheckbox,
}: TContact) => {
  return (
    <div className={`${classes["contact"]}`}>
      <div className="container__small">
        <div className={classes["contact__header"]}>
          <h2 className={classes["contact__title"]}>Contact</h2>
          <p className={classes["login"]}>
            Have and account? <Link to={"/login"}>Login</Link>
          </p>
        </div>
        <div className={classes["input"]}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Email"
                type="email"
                value={field.value}
                onChange={(value) => field.onChange(value)}
                errorMessage={errorMessage}
              />
            )}
          />

          <Checkbox
            label="Email me with news and offers"
            size="small"
            onChange={onCheckbox}
            isChecked={isChecked}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
