import React from "react";

import plusIcon from "../../../assets/icons/Plus.svg";
import minusIcon from "../../../assets/icons/Minus.svg";
import classes from "../../../styles/pages/cart/QuantityButtons.module.css";

type TQuantityButtons = {
  value?: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const QuantityButtons = ({
  value,
  onIncrement,
  onDecrement,
}: TQuantityButtons) => {
  return (
    <div className={classes["add-minus-wrapper"]}>
      <button onClick={onDecrement} type="button" className={classes["button"]}>
        <img src={minusIcon} />
      </button>
      <p className={classes["quantity"]}>{value}</p>
      <button onClick={onIncrement} type="button" className={classes["button"]}>
        <img src={plusIcon} />
      </button>
    </div>
  );
};

export default QuantityButtons;
