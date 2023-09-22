import { ReactNode } from "react";

import CheckIcon from "../../assets/icons/check2.svg";
import classes from "../../styles/components/ui/Button.module.css";

type ButtonProps<T = void> = {
  variant?: "text" | "contained" | "outlined" | "gray";
  disable?: boolean;
  type?: "button" | "submit" | "reset";
  size?: "small" | "medium" | "large";
  isActive?: boolean;
  startIcon?: HTMLImageElement;
  endIcon?: HTMLImageElement;
  isLoading?: boolean;
  children: ReactNode;
  textTransform?: "uppercase" | "lowercase" | "capitalize";
  onClick?: (params?: T) => void;
};
const Button = ({
  variant = "contained",
  disable = false,
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
      className={`${classes.button} ${classes[size]} ${classes[variant]} ${
        classes[textTransform]
      } ${variant === "gray" && isActive ? classes["gray-active"] : ""}`}
      onClick={() => {
        onClick?.();
      }}
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
