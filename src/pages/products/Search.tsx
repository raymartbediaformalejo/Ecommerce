import { useEffect, useState, useRef } from "react";
import { useDebounce } from "use-debounce";
import { useLazySearchProductsQuery } from "../../redux/products/products.api";
import Loading from "../../components/Loading/Loading";
import SearchForm from "./components/SearchForm";
import classes from "../../styles/pages/Products/Search.module.css";
import ProductList from "./components/ProductList";
import ProductFilter from "./components/ProductFilter";

const Search = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 1000);
  const [serchProducts, { data, error, isLoading }] =
    useLazySearchProductsQuery();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (debouncedQuery.length) {
      serchProducts({ query: debouncedQuery });
    }
  }, [debouncedQuery, serchProducts]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // if (isLoading) return <Loading />;
  // if (error) return <ErrorMessage error={error} />;
  console.log(data);

  return (
    <div className={classes["search-container"]}>
      <SearchForm query={query} inputRef={inputRef} setQuery={setQuery} />
      {data && data?.products.length > 0 && <ProductFilter />}
      <div
        className={`
      ${classes["product-list-container"]} `}
      >
        {isLoading && <Loading />}
        {data && query.length > 0 && <ProductList products={data?.products} />}
      </div>
    </div>
  );
};

export default Search;
