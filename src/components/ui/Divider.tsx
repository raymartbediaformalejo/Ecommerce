import classes from "../../styles/components/ui/Divider.module.css";

type DividerProps = {
  size?: "sm" | "md" | "lg";
};
const Divider = ({ size = "sm" }: DividerProps) => {
  return (
    <div className={classes["divider-container"]}>
      <div
        style={size === "lg" ? { width: "70%" } : { width: "40%" }}
        className={classes["divider-inner-container"]}
      >
        <div className={classes.diamond}></div>
        <div className={classes.line}></div>
      </div>
    </div>
  );
};

export default Divider;
