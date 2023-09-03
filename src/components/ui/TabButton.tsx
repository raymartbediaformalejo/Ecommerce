import { ReactNode } from "react";
import classes from "../../styles/components/ui/TabButton.module.css";
type TTabButtonProps = {
  size?: "sm" | "md" | "lg";
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
};

const TabButton = ({ size, isActive, onClick, children }: TTabButtonProps) => {
  return (
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
  );
};

export default TabButton;
