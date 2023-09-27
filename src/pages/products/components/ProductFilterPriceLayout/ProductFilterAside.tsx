import { Dispatch, SetStateAction } from "react";
import CloseIcon from "../../../../assets/icons/Close.svg";
import classes from "../../../../styles/pages/Products/ProductFilterMenu.module.css";
import ProductFilterContent from "./ProductFilterContent";
import { TBrand, TCategory } from "../../../../types/TProducts";
import { SetURLSearchParams } from "react-router-dom";
import { TFiltersValue } from "../../../../redux/ui/ProductFilter/productFilter.type";

type ProductFilterMenuProps = {
  isFilterOpen: boolean;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
  searchParam: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  brands: TBrand[];
  categories: TCategory[];
  filters: TFiltersValue;
};

const ProductFilterMenu = ({
  isFilterOpen,
  setIsFilterOpen,
  searchParam,
  setSearchParams,
  categories,
  brands,
  filters,
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
        searchParam={searchParam}
        setSearchParams={setSearchParams}
        categories={categories}
        brands={brands}
        filters={filters}
      />
    </aside>
  );
};

export default ProductFilterMenu;
