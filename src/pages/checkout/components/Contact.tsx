import { Link } from "react-router-dom";

import Input from "../../../components/ui/Input/Input";
import Checkbox from "../../../components/ui/Checkbox";
import classes from "../../../styles/pages/checkout/Contact.module.css";

type TContact = {
  isChecked: boolean;
  accountEmail: string;
  errorMessage: string;
  onChange: () => void;
  onAccountEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Contact = ({
  isChecked,
  accountEmail,
  errorMessage,
  onChange,
  onAccountEmail,
}: TContact) => {
  return (
    <div className={`container ${classes["contact"]}`}>
      <div className={classes["contact__header"]}>
        <h2 className={classes["contact__title"]}>Contact</h2>
        <p className={classes["login"]}>
          Have and account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
      <div className={classes["input"]}>
        <Input
          placeholder="Email"
          type="email"
          value={accountEmail}
          onChange={onAccountEmail}
          errorMessage={errorMessage}
        />
        <Checkbox
          label="Email me with news and offers"
          size="small"
          onChange={onChange}
          isChecked={isChecked}
        />
      </div>
    </div>
  );
};

export default Contact;
