import { useEffect, useState } from "react";
import { SetURLSearchParams } from "react-router-dom";

import classes from "../../../../styles/pages/Products/ProductFilter.module.css";
import ProductFilterAside from "./ProductFilterAside";
import { TCategory, TBrand } from "../../../../types/TProducts";
import ProductSortByPrice from "./ProductSortByPrice";
import ProductLayout from "./ProductLayout";
import ProductFilterButton from "./ProductFilterButton";
import ProductQueryResults from "./ProductQueryResults";
import { TFiltersValue } from "../../../../redux/ui/ProductFilter/productFilter.type";

type ProductFilterProps = {
  length?: number;
  query: string;
  categories: TCategory[];
  brands: TBrand[];
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  filters: TFiltersValue;
  sortByPriceLowToHigh: boolean;
  isGridLayout: boolean;
};

const ProductFilter = ({
  query,
  brands,
  categories,
  length,
  searchParams,
  setSearchParams,
  filters,
  sortByPriceLowToHigh,
  isGridLayout,
}: ProductFilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [queryCopy, setQueryCopy] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setQueryCopy(query);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    if (isFilterOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "hidden auto";
    }

    return () => {
      document.documentElement.style.overflow = "hidden auto";
    };
  }, [isFilterOpen]);

  const toggleFilterMenu = () => {
    setIsFilterOpen((prev) => !prev);
  };

  return (
    <div className={classes["filter-container"]}>
      {isFilterOpen && (
        <div onClick={toggleFilterMenu} className={classes.overflow}></div>
      )}
      <ProductFilterAside
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        searchParam={searchParams}
        setSearchParams={setSearchParams}
        brands={brands}
        categories={categories}
        filters={filters}
      />
      <ProductQueryResults query={queryCopy} length={length} />
      <div className={classes["filter-actions-wrapper"]}>
        <ProductSortByPrice
          setSearchParams={setSearchParams}
          sortByPriceLowToHigh={sortByPriceLowToHigh}
        />
        <ProductLayout
          setSearchParams={setSearchParams}
          isGridLayout={isGridLayout}
        />
        <ProductFilterButton setIsFilterOpen={setIsFilterOpen} />
      </div>
    </div>
  );
};

export default ProductFilter;
