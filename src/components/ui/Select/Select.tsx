import React from "react";

import classes from "../../../styles/components/ui/Select.module.css";
import { ArrowIcon } from "../../icons/ArrowIcon";

type TSelect = {
  label: string;
  options: Record<string, string>[];
};

const Select = ({ label, options }: TSelect) => {
  return (
    <div className={classes["select"]}>
      <label htmlFor={label} className={classes["label"]}>
        {label}
      </label>
      <select name={label} id={label} className={classes["select-field"]}>
        {options &&
          options.map(({ value }) => (
            <option value={value} className={classes["option"]}>
              {value}
            </option>
          ))}
      </select>
      <ArrowIcon className={classes["arrow"]} />
    </div>
  );
};

export default Select;
