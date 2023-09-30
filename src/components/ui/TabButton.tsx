import { ReactNode } from "react";
import classes from "../../styles/components/ui/TabButton.module.css";
type TTabButtonProps = {
  variant?: "text-button" | "image-button";
  size?: "sm" | "md" | "lg";
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
};

const TabButton = ({
  variant = "text-button",
  size,
  isActive,
  onClick,
  children,
}: TTabButtonProps) => {
  const content =
    variant === "text-button" ? (
      <button
        className={`${
          size === "sm"
            ? classes.tab
            : size === "lg"
            ? classes["sidebar__nav-button"]
            : ""
        } ${
          isActive && size === "sm"
            ? classes["active-tab"]
            : isActive && size === "lg"
            ? classes["active-parent-category"]
            : ""
        }`}
        onClick={onClick}
      >
        {children}
      </button>
    ) : variant === "image-button" ? (
      <button
        className={`${classes[variant]} ${
          isActive ? classes["active-parent-category"] : ""
        }`}
        onClick={onClick}
      >
        {children}
      </button>
    ) : null;

  return content;
};

export default TabButton;
