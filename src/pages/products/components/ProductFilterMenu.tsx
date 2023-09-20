import { Dispatch, SetStateAction } from "react";
import CloseIcon from "../../../assets/icons/Close.svg";
import classes from "../../../styles/pages/Products/ProductFilterMenu.module.css";

type ProductFilterMenuProps = {
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
};

const ProductFilterMenu = ({ setIsFilterOpen }: ProductFilterMenuProps) => {
  const toggleProductFilterButton = () => {
    setIsFilterOpen((prev) => !prev);
  };

  return (
    <>
      <div
        onClick={toggleProductFilterButton}
        className={classes.overflow}
      ></div>
      <aside className={classes["product-filter-menu-container"]}>
        <button onClick={toggleProductFilterButton}>
          <img src={CloseIcon} alt="X" />
        </button>
      </aside>
    </>
  );
};

export default ProductFilterMenu;
