import React from "react";

import classes from "../../../styles/components/ui/Select.module.css";
import { ArrowIcon } from "../../icons/ArrowIcon";

type TSelect = React.HTMLAttributes<HTMLDivElement> &
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;
    options: Record<string, string>[];
    inputRef?: (ref: HTMLSelectElement | null) => void;
  };

const Select = ({
  label,
  options,
  defaultValue,
  inputRef,
  className,
}: TSelect) => {
  return (
    <div className={` ${className ? className : ""} ${classes["select"]}`}>
      <label htmlFor={label} className={classes["label"]}>
        {label}
      </label>
      <select
        ref={inputRef}
        defaultValue={defaultValue}
        // name={label.toLowerCase()}
        id={label.toLowerCase()}
        className={classes["select-field"]}
      >
        {options &&
          options.map(({ value }) => (
            <option key={value} value={value} className={classes["option"]}>
              {value}
            </option>
          ))}
      </select>
      <ArrowIcon className={classes["arrow"]} />
    </div>
  );
};

export default Select;
