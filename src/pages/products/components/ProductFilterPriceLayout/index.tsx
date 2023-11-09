import { memo, useEffect, useMemo, useState } from "react";
import { SetURLSearchParams } from "react-router-dom";

import classes from "../../../../styles/pages/Products/ProductFilter.module.css";
import ProductFilterAside from "./ProductFilterAside";
import { TCategory, TBrand } from "../../../../types/TProducts";
import ProductSortByPrice from "./ProductSortByPrice";
import ProductLayout from "./ProductLayout";
import ProductFilterButton from "./ProductFilterButton";
import ProductQueryResults from "./ProductQueryResults";
import { TFiltersValue } from "../../../../redux/ui/ProductFilter/productFilter.type";
import { useWindowDimensions } from "../../../../hooks/useWindowDimensions";

const MemoizedProductFilterAside = memo(ProductFilterAside);

type ProductFilterProps = {
  length?: number;
  query?: string | null;
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
  const [queryCopy, setQueryCopy] = useState<string | undefined>();
  const { height } = useWindowDimensions();
  const screenHeight = useMemo(() => height, [height]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) setQueryCopy(query);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  const toggleFilterMenu = () => {
    setIsFilterOpen((prev) => !prev);
  };

  return (
    <div className={classes["filter-container"]}>
      {isFilterOpen && (
        <div onClick={toggleFilterMenu} className={classes.overflow}></div>
      )}
      <MemoizedProductFilterAside
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        searchParam={searchParams}
        setSearchParams={setSearchParams}
        brands={brands}
        categories={categories}
        filters={filters}
        height={screenHeight}
      />
      {query ? (
        <ProductQueryResults query={queryCopy} length={length} />
      ) : (
        <ProductQueryResults title={"All Products"} />
      )}
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
