import classes from "../../styles/components/ui/Checkbox.module.css";
import { CheckIcon } from "../icons/CheckIcon";

type TCheckBoxProps = React.HTMLAttributes<HTMLDivElement> & {
  onChange: () => void;
  label?: string;
  size?: "small" | "medium" | "large";
  isChecked: boolean;
  id?: string;
};

const Checkbox = ({
  onChange,
  label,
  isChecked,
  id,
  size = "medium",
  className,
}: TCheckBoxProps) => {
  const getId = () => {
    const newId = id
      ? id?.toLowerCase().split(" ").join("-")
      : label?.toLowerCase().split(" ").join("-");

    return newId;
  };

  const newId = getId();

  return (
    <>
      {label ? (
        <div
          className={`${className ? className : ""} ${classes[size]} ${
            classes["checkbox-container"]
          } ${classes["with-label"]}`}
          onChange={onChange}
        >
          <div onClick={onChange} className={classes["input-field"]}>
            <input
              type="checkbox"
              id={newId}
              readOnly
              checked={isChecked}
              className={classes["input"]}
            />
            <div className={classes["check-icon"]}>
              <CheckIcon className={classes["check"]} color="white" />
            </div>
          </div>

          <label htmlFor={newId} className={classes["label"]}>
            {label}
          </label>
        </div>
      ) : (
        <div
          className={`${className ? className : ""} ${
            classes["checkbox-container"]
          }`}
          onClick={onChange}
        >
          <div className={classes["input-field"]}>
            <input
              type="checkbox"
              readOnly
              id={newId}
              checked={isChecked}
              className={classes["input"]}
            />
            <div className={classes["check-icon"]}>
              <CheckIcon className={classes["check"]} color="white" />
            </div>
          </div>
          <label htmlFor={newId} className={classes["label"]}></label>
        </div>
      )}
    </>
  );
};

export default Checkbox;
