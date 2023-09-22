import { useEffect, useState, useRef, useDeferredValue } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "../../redux";
import { useAppSelector } from "../../redux";
import { useLazySearchProductsQuery } from "../../redux/products/products.api";
import Loading from "../../components/Loading/Loading";
import SearchForm from "./components/SearchForm";
import classes from "../../styles/pages/Products/Search.module.css";
import ProductList from "./components/ProductList";
import ProductFilter from "./components/ProductFilter/ProductFilter";
import Pagination from "../../components/Pagination/Pagination";
import { PER_PAGE } from "../../utils/productLimit";
import { useCategories } from "../../hooks/useCategories";
import { useBrands } from "../../hooks/useBrands";
import { useFilterProducts } from "../../hooks/useFitlerProducts";
import { setFilters } from "../../redux/ui/ProductFilter/productsFilter.slice";
import { initialFiltersValue } from "../../utils/productConstant";

const Search = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filter.filters);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [activePage, setActivePage] = useState(searchParams.get("page") ?? "1");
  const [serchProducts, { data, isLoading }] = useLazySearchProductsQuery();
  const dataShallowCopy = { ...data };
  const { filteredProducts } = useFilterProducts(
    dataShallowCopy.products,
    filters
  );
  const { categories } = useCategories(dataShallowCopy?.products);
  const { brands } = useBrands(dataShallowCopy?.products);

  const inputRef = useRef<HTMLInputElement>(null);
  const start = (Number(activePage) - 1) * Number(PER_PAGE);
  const end = start + Number(PER_PAGE);

  const products = filteredProducts?.slice(start, end);
  const productsLength = filteredProducts?.length;
  const isProductListNotEmptyQueryLoading =
    filteredProducts && filteredProducts.length > 0 && query && !isLoading;

  console.log(filters);
  console.log(data);
  console.log(filteredProducts);

  useEffect(() => {
    if (deferredQuery.length) {
      serchProducts({
        query: deferredQuery,
        filters,
      });

      setSearchParams((params) => {
        params.set("q", deferredQuery);
        params.set("page", activePage.toString());
        return params;
      });
    } else {
      setSearchParams((params) => {
        params.delete("q");
        params.delete("page");
        setActivePage("1");

        return params;
      });
      dispatch(setFilters(initialFiltersValue));
    }
  }, [
    dispatch,
    deferredQuery,
    serchProducts,
    activePage,
    setSearchParams,
    filters,
  ]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <div className={classes["search-container"]}>
      <SearchForm query={query} inputRef={inputRef} setQuery={setQuery} />

      {isProductListNotEmptyQueryLoading && (
        <ProductFilter
          length={productsLength}
          query={query}
          categories={categories}
          brands={brands}
          setActivePage={setActivePage}
        />
      )}
      <div
        className={`
      ${classes["product-list-container"]} `}
      >
        {isLoading && <Loading />}
        {isProductListNotEmptyQueryLoading && (
          <ProductList products={products} />
        )}
        {filteredProducts &&
          filteredProducts.length > PER_PAGE &&
          query &&
          !isLoading && (
            <Pagination
              hasNextPage={end < filteredProducts.length}
              hasPrevPage={start > 0}
              activePage={activePage}
              setActivePage={setActivePage}
              total={productsLength}
            />
          )}
      </div>
    </div>
  );
};

export default Search;
