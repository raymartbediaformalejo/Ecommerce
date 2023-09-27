import React from "react";

import CheckIcon from "../../assets/icons/check2.svg";
import classes from "../../styles/components/ui/Button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "text" | "contained" | "outlined" | "gray" | "icon" | "chip";
  size?: "small" | "medium" | "large";
  isActive?: boolean;
  isLoading?: boolean;
  textTransform?: "uppercase" | "lowercase" | "capitalize";
};
const Button = ({
  variant = "contained",
  type = "button",
  size = "medium",
  isActive = false,
  textTransform = "uppercase",
  onClick,
  disabled,
  children,
  style,
  className,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      style={style}
      className={`${classes.button} ${classes[size]} ${classes[variant]} ${
        classes[textTransform]
      } ${variant === "gray" && isActive ? classes["gray-active"] : ""} ${
        className ? className : ""
      }`}
      onClick={onClick}
    >
      {variant === "gray" && isActive && (
        <div className={classes.check}>
          <img src={CheckIcon} alt="selected filter item" />
        </div>
      )}
      {children}
    </button>
  );
};

export default Button;
