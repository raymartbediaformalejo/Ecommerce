import React from "react";

import CheckIcon from "../../assets/icons/check2.svg";
import classes from "../../styles/components/ui/Button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "text" | "contained" | "outlined" | "gray";
  size?: "small" | "medium" | "large";
  isActive?: boolean;
  startIcon?: HTMLImageElement;
  endIcon?: HTMLImageElement;
  isLoading?: boolean;
  textTransform?: "uppercase" | "lowercase" | "capitalize";
};
const Button = ({
  variant = "contained",
  disabled,
  type = "button",
  size = "medium",
  isActive = false,
  startIcon,
  endIcon,
  isLoading,
  textTransform = "uppercase",
  onClick,
  children,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${classes.button} ${classes[size]} ${classes[variant]} ${
        classes[textTransform]
      } ${variant === "gray" && isActive ? classes["gray-active"] : ""}`}
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
