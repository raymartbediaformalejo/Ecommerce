import React from "react";
import classes from "../../../styles/components/ui/Input.module.css";

type TInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "solid" | "outlined" | "plain";
  sizes?: "small" | "medium" | "large";
};

const Input = ({
  variant = "outlined",
  sizes = "medium",
  placeholder,
  id,
}: TInputProps) => {
  const getId = () => {
    const newId = id ? id : placeholder?.toLowerCase().split(" ").join("-");

    return newId;
  };
  return (
    <div className={classes["input"]}>
      <label htmlFor={getId() as string} className={classes["label"]}>
        {placeholder}
      </label>
      <div className={classes["input-field-wrapper"]}>
        <input
          id={getId() as string}
          className={`${classes["input-field"]} ${classes[variant]} ${classes[sizes]}`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default Input;
