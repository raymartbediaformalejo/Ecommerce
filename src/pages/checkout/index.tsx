import { PlusIcon } from "../../components/icons/PlusIcon";
import classes from "../../styles/pages/checkout/Checkout.module.css";

const Checkout = () => {
  return (
    <div className={`container ${classes["checkout"]}`}>
      <h2 className={classes["title"]}>Checkout</h2>
      <button className={classes["add-address"]}>
        <p>
          <PlusIcon />
          Add address
        </p>
      </button>
    </div>
  );
};

export default Checkout;
