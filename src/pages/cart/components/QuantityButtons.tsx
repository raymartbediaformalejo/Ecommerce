import React from "react";

import classes from "../../../styles/pages/cart/QuantityButtons.module.css";

type TQuantityButtons = {
  value?: number;
  isDisabled?: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const QuantityButtons = ({
  value = 0,
  isDisabled = false,
  onIncrement,
  onDecrement,
  onChange,
}: TQuantityButtons) => {
  return (
    <div
      className={`${classes["add-minus-wrapper"]} ${
        (value as number) < 0 ? classes["disable"] : ""
      }`}
    >
      <button
        onClick={onDecrement}
        disabled={isDisabled || value === 0}
        className={`${classes["button"]} ${classes["minus"]}`}
      ></button>
      <input
        disabled={isDisabled}
        onChange={onChange}
        className={classes["quantity"]}
        type="number"
        value={value}
        min="1"
      />
      <button
        onClick={onIncrement}
        disabled={isDisabled}
        className={`${classes["button"]} ${classes["plus"]}`}
      ></button>
    </div>
  );
};

export default QuantityButtons;
