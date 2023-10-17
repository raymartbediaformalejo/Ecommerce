import React from "react";
import { FieldError } from "react-hook-form";

import classes from "../../../styles/components/ui/Input.module.css";

type TInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "solid" | "outlined" | "plain";
  sizes?: "small" | "medium" | "large";
  errorMessage?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
};

const Input = ({
  variant = "outlined",
  sizes = "medium",
  placeholder,
  id,
  onChange,
  value,
  type,
  required,
  errorMessage,
  inputRef,
}: TInputProps) => {
  const getId = () => {
    const newId = id ? id : placeholder?.toLowerCase().split(" ").join("-");

    return newId;
  };
  return (
    <div className={`${classes["input-container"]}`}>
      <div className={`${classes["input"]}`}>
        <label htmlFor={getId() as string} className={classes["label"]}>
          {placeholder}
        </label>
        <div
          className={`${classes["input-field-wrapper"]}  ${
            errorMessage ? classes["error"] : ""
          }`}
        >
          <input
            ref={inputRef}
            required={required}
            id={getId() as string}
            name={getId() as string}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            className={`${classes["input-field"]} ${classes[variant]} ${classes[sizes]}`}
            aria-describedby={`error-for-${getId() as string}`}
          />
        </div>
      </div>
      {errorMessage && (
        <p id={`error-for-${getId() as string}`}>{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
