import { useEffect, useRef, useDeferredValue } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "../../redux";
import { useAppSelector } from "../../redux";
import { useLazySearchProductsQuery } from "../../redux/products/products.api";
import Loading from "../../components/Loading/Loading";
import SearchForm from "./components/SearchForm";
import classes from "../../styles/pages/Products/Search.module.css";
import ProductList from "./components/ProductList";
import ProductFilterPriceLayout from "./components/ProductFilterPriceLayout";
import Pagination from "../../components/Pagination/Pagination";
import { PER_PAGE } from "../../utils/productLimit";
import { useCategories } from "../../hooks/useCategories";
import { useBrands } from "../../hooks/useBrands";
import { useFilterProducts } from "../../hooks/useFitlerProducts";
import { setFilters } from "../../redux/ui/ProductFilter/productsFilter.slice";
import { initialFiltersValue } from "../../utils/productConstant";
import { useSortProduct } from "../../hooks/useSortProducts";

const Search = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filter.filters);
  const [searchParams, setSearchParams] = useSearchParams({ q: "", page: "1" });
  const q = searchParams.get("q");
  const page = searchParams.get("page") ?? "1";
  const deferredQuery = useDeferredValue(q);
  const [serchProducts, { data, isLoading }] = useLazySearchProductsQuery();
  const dataShallowCopy = { ...data };
  const { sortedProduct } = useSortProduct(dataShallowCopy.products);
  const { filteredProducts } = useFilterProducts(sortedProduct, filters);
  const { categories } = useCategories(dataShallowCopy?.products);
  const { brands } = useBrands(dataShallowCopy?.products);

  const inputRef = useRef<HTMLInputElement>(null);
  const start = (Number(page) - 1) * Number(PER_PAGE);
  const end = start + Number(PER_PAGE);

  const products = filteredProducts?.slice(start, end);
  const productsLength = filteredProducts?.length;
  const isProductListNotEmptyQueryLoading =
    filteredProducts && filteredProducts.length > 0 && q && !isLoading;
  // console.log(deferredQuery);

  // console.log(filteredProducts);

  useEffect(() => {
    if (deferredQuery && deferredQuery.length) {
      serchProducts({
        query: deferredQuery,
        filters,
      });
    }
  }, [deferredQuery, serchProducts, filters]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const onDeleteQuery = () => {
    setSearchParams((prev) => {
      prev.delete("q");
      prev.delete("page");
      return prev;
    });
  };

  return (
    <div className={classes["search-container"]}>
      <SearchForm
        q={deferredQuery}
        inputRef={inputRef}
        setSearchParams={setSearchParams}
        onDeleteQuery={onDeleteQuery}
      />

      {isProductListNotEmptyQueryLoading && (
        <ProductFilterPriceLayout
          length={productsLength}
          query={q}
          categories={categories}
          brands={brands}
          setSearchParams={setSearchParams}
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
          q &&
          !isLoading && (
            <Pagination
              hasNextPage={end < filteredProducts.length}
              hasPrevPage={start > 0}
              activePage={page}
              setSearchParams={setSearchParams}
              total={productsLength}
            />
          )}
      </div>
    </div>
  );
};

export default Search;
