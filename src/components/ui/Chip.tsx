import DeleteIcon from "../../assets/icons/Close.svg";

import classes from "../../styles/components/ui/Chip.module.css";

type ChipProps = {
  label: string;
  variant?: "outlined" | "filled";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  onDelete?: () => void;
};
const Chip = ({
  label,
  variant = "filled",
  size = "medium",
  onClick,
  onDelete,
}: ChipProps) => {
  // const handle;

  return (
    <button
      onClick={onDelete}
      className={`${classes.chip} ${classes.filled} ${classes.medium}`}
    >
      {label}
      <div>
        <img src={DeleteIcon} alt="Delete icon" />
      </div>
    </button>
  );
};

export default Chip;
