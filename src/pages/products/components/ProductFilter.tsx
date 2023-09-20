import Select from "../../../components/ui/Select/Select";
import ListViewIcon from "../../../assets/icons/Listview.svg";
import GridViewIcon from "../../../assets/icons/grid view.svg";

import FilterIcon from "../../../assets/icons/Filter.svg";
import DownArrowIcon from "../../../assets/icons/Downfilled.svg";
import { useAppDispatch, useAppSelector } from "../../../redux";
import classes from "../../../styles/pages/Products/ProductFilter.module.css";
import {
  setSortBy,
  setViewLayout,
} from "../../../redux/ui/ProductFilter/productsFilter.slice";
import { useEffect, useState } from "react";
import ProductFilterMenu from "./ProductFilterMenu";
import { TGetProductResponse } from "../../../redux/products/product.types";
import { TProduct } from "../../../types/TProducts";

type ProductFilterProps = {
  length?: number;
  products?: TProduct[];
  query: string;
};

const SORT_BY_OPTIONS = [
  { value: "Price low to high" },
  { value: "Price high to low" },
];

const VIEW_LAYOUT_OPTION = ["grid-view", "list-view"];

const ProductFilter = ({ products, query, length }: ProductFilterProps) => {
  const dispatch = useAppDispatch();
  const viewLayout = useAppSelector((state) => state.filter.viewLayout);
  const [isGridLayout, setIsGridLayout] = useState(false);
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
    dispatch(setViewLayout(VIEW_LAYOUT_OPTION[0]));
  }, [dispatch]);

  const handleSortByPrice = (value: string) => {
    dispatch(setSortBy(value));
  };

  const toggleViewLayout = () => {
    setIsGridLayout((prev) => !prev);

    if (isGridLayout) dispatch(setViewLayout(VIEW_LAYOUT_OPTION[0]));
    if (!isGridLayout) dispatch(setViewLayout(VIEW_LAYOUT_OPTION[1]));
  };

  const toggleFilterMenu = () => {
    setIsFilterOpen((prev) => !prev);
  };

  return (
    <div className={classes["filter-container"]}>
      {isFilterOpen && <ProductFilterMenu setIsFilterOpen={setIsFilterOpen} />}
      {length && (
        <p
          title={`${length} ${
            length > 1 ? "results" : "result"
          } of ${queryCopy}`}
          className={classes["title-search-result"]}
        >{`${length} ${length > 1 ? "results" : "result"} of ${queryCopy}`}</p>
      )}
      <div className={classes["filter-actions-wrapper"]}>
        <Select
          placeholder="Sort by price"
          options={SORT_BY_OPTIONS}
          onClick={handleSortByPrice}
        />
        <button
          className={`${classes.button} ${classes["view-layout-button"]}`}
          onClick={toggleViewLayout}
        >
          <picture>
            {viewLayout === VIEW_LAYOUT_OPTION[0] ? (
              <img src={GridViewIcon} alt="Grid view icon" />
            ) : (
              <img src={ListViewIcon} alt="List view icon" />
            )}
          </picture>
        </button>

        <button
          onClick={toggleFilterMenu}
          className={`${classes.button} ${classes["filter-button"]}`}
        >
          <picture>
            <img src={FilterIcon} alt="Filter icon" />
          </picture>
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
