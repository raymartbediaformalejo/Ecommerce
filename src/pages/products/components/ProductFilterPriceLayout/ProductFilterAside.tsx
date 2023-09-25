import { Dispatch, SetStateAction } from "react";
import CloseIcon from "../../../../assets/icons/Close.svg";
import classes from "../../../../styles/pages/Products/ProductFilterMenu.module.css";
import ProductFilterContent from "./ProductFilterContent";
import { TBrand, TCategory } from "../../../../types/TProducts";
import { SetURLSearchParams } from "react-router-dom";

type ProductFilterMenuProps = {
  isFilterOpen: boolean;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
  setSearchParams: SetURLSearchParams;
  brands: TBrand[];
  categories: TCategory[];
};

const ProductFilterMenu = ({
  isFilterOpen,
  setIsFilterOpen,
  setSearchParams,
  categories,
  brands,
}: ProductFilterMenuProps) => {
  const toggleProductFilterButton = () => {
    setIsFilterOpen((prev) => !prev);
  };

  return (
    <aside
      className={`${classes["product-filter-menu-container"]} ${
        isFilterOpen ? classes.active : ""
      }`}
    >
      <div className={classes["filter-header"]}>
        <p>Search Filter</p>
        <button onClick={toggleProductFilterButton}>
          <img src={CloseIcon} alt="X" />
        </button>
      </div>
      <ProductFilterContent
        setIsFilterOpen={setIsFilterOpen}
        setSearchParams={setSearchParams}
        categories={categories}
        brands={brands}
      />
    </aside>
  );
};

export default ProductFilterMenu;
