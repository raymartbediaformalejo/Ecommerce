import { useState, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import CloseIcon from "../../../../assets/icons/Close.svg";
import classes from "../../../../styles/pages/Products/ProductFilterMenu.module.css";
import ProductFilterContent from "./ProductFilterContent";
import { TBrand, TCategory } from "../../../../types/TProducts";
import { SetURLSearchParams } from "react-router-dom";
import { TFiltersValue } from "../../../../redux/ui/ProductFilter/productFilter.type";
import { useWindowDimensions } from "../../../../hooks/useWindowDimensions";

type ProductFilterMenuProps = {
  isFilterOpen: boolean;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
  searchParam: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  brands: TBrand[];
  categories: TCategory[];
  filters: TFiltersValue;
  height: number;
};

const ProductFilterAside = ({
  isFilterOpen,
  setIsFilterOpen,
  searchParam,
  setSearchParams,
  categories,
  brands,
  filters,
  height,
}: ProductFilterMenuProps) => {
  // const height = 400;
  // const { height } = useWindowDimensions();
  const [filterHeightEl, setFilterHeightEl] = useState(height);
  const toggleProductFilterButton = () => {
    setIsFilterOpen((prev) => !prev);
  };
  useEffect(() => {
    setFilterHeightEl(height);
  }, [height]);

  return (
    <aside
      className={`${classes["product-filter-menu-container"]} ${
        isFilterOpen ? classes.active : ""
      }`}
      style={{ height: `${filterHeightEl}px` }}
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

export default ProductFilterAside;
