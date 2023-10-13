import classes from "../../styles/components/ui/Checkbox.module.css";
import { CheckIcon } from "../icons/CheckIcon";

type TCheckBoxProps = {
  onChange: () => void;
  title: string;
  isChecked: boolean;
};

const Checkbox = ({ onChange, title, isChecked }: TCheckBoxProps) => {
  return (
    <div className={classes["checkbox-container"]}>
      <input
        onChange={onChange}
        type="checkbox"
        id={title}
        checked={isChecked}
      />
      <label htmlFor={title}></label>
      <CheckIcon className={classes["check"]} color="white" />
      {/* <img src={checkIcon} className={classes["check"]} /> */}
    </div>
  );
};

export default Checkbox;
