import { useEffect, useState, useRef, useDeferredValue } from "react";
import { useSearchParams } from "react-router-dom";

import { useLazySearchProductsQuery } from "../../redux/products/products.api";
import Loading from "../../components/Loading/Loading";
import SearchForm from "./components/SearchForm";
import classes from "../../styles/pages/Products/Search.module.css";
import ProductList from "./components/ProductList";
import ProductFilter from "./components/ProductFilter";
import Pagination from "../../components/Pagination/Pagination";
import { PRODUCT_LIMIT, PER_PAGE } from "../../utils/productLimit";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [activePage, setActivePage] = useState(searchParams.get("page") ?? "1");
  const [serchProducts, { data, error, isLoading }] =
    useLazySearchProductsQuery();
  const inputRef = useRef<HTMLInputElement>(null);
  const start = (Number(activePage) - 1) * Number(PER_PAGE);
  const end = start + Number(PER_PAGE);
  const products = data?.products.slice(start, end);
  const productsLength = data?.products.length;
  console.log(data);

  useEffect(() => {
    if (deferredQuery.length) {
      serchProducts({
        query: deferredQuery,
        // limit: PRODUCT_LIMIT,
        // skip: (activePage - 1) * 10,
      });

      setSearchParams((params) => {
        params.set("q", deferredQuery);
        params.set("page", activePage.toString());
        return params;
      });
    }
  }, [deferredQuery, serchProducts, activePage, setSearchParams]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // if (isLoading) return <Loading />;
  // if (error) return <ErrorMessage error={error} />;
  // console.log(query);
  console.log(data);

  return (
    <div className={classes["search-container"]}>
      <SearchForm query={query} inputRef={inputRef} setQuery={setQuery} />

      {data?.products && data?.products.length > 0 && query && !isLoading && (
        <ProductFilter
          length={productsLength}
          products={products}
          query={query}
        />
      )}
      <div
        className={`
      ${classes["product-list-container"]} `}
      >
        {isLoading && <Loading />}
        {data?.products && data?.products.length > 0 && query && !isLoading && (
          <ProductList products={products} />
        )}
        {data && data?.products.length > PER_PAGE && (
          <Pagination
            hasNextPage={end < data.products.length}
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
