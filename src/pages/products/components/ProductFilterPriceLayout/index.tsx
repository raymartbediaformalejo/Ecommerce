import { useEffect, useState } from "react";
import { SetURLSearchParams } from "react-router-dom";

import classes from "../../../../styles/pages/Products/ProductFilter.module.css";
import ProductFilterAside from "./ProductFilterAside";
import { TCategory, TBrand } from "../../../../types/TProducts";
import { TSetActivePage } from "../../../../types/TPagination";
import ProductSortByPrice from "./ProductSortByPrice";
import ProductLayout from "./ProductLayout";
import ProductFilterButton from "./ProductFilterButton";
import ProductQueryResults from "./ProductQueryResults";

type ProductFilterProps = {
  length?: number;
  query: string;
  categories: TCategory[];
  brands: TBrand[];
  setSearchParams: SetURLSearchParams;
};

const ProductFilter = ({
  query,
  brands,
  categories,
  length,
  setSearchParams,
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
        setSearchParams={setSearchParams}
        brands={brands}
        categories={categories}
      />
      <ProductQueryResults query={queryCopy} length={length} />
      <div className={classes["filter-actions-wrapper"]}>
        <ProductSortByPrice />
        <ProductLayout />
        <ProductFilterButton setIsFilterOpen={setIsFilterOpen} />
      </div>
    </div>
  );
};

export default ProductFilter;