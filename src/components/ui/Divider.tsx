import React from "react";
import classes from "../../styles/components/ui/Divider.module.css";

type DividerProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  size?: "small" | "medium" | "large";
};
const Divider = ({ size = "small", className }: DividerProps) => {
  return (
    <div className={`${className ? className : ""}`}>
      <div
        className={`${classes["divider-container"]} ${
          className ? className : ""
        }`}
      >
        <div
          className={`${classes["divider-inner-container"]} ${classes[size]}`}
        >
          <div className={classes.diamond}></div>
          <div className={classes.line}></div>
        </div>
      </div>
    </div>
  );
};

export default Divider;
