import checkIcon from "../../assets/icons/check2.svg";
import classes from "../../styles/components/ui/Checkbox.module.css";

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
      <img src={checkIcon} className={classes["check"]} />
    </div>
  );
};

export default Checkbox;
