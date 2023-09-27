import { useEffect, useRef, useDeferredValue } from "react";
import { useSearchParams } from "react-router-dom";

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
import { productQueryKeys } from "../../utils/productConstant";
import { useSortProduct } from "../../hooks/useSortProducts";
import { useConvertToArray } from "../../hooks/useConvertToArray";
import useConvertStringToObject from "../../hooks/useConvertStringToObjectPriceRange";
import { TFiltersValue } from "../../redux/ui/ProductFilter/productFilter.type";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get(productQueryKeys[0]);
  const page = searchParams.get(productQueryKeys[1]) ?? "1";
  const categoriesParam = searchParams.get(productQueryKeys[2]) ?? "";
  const { newArray: categoriesArr } = useConvertToArray(categoriesParam);
  const brandsParam = searchParams.get(productQueryKeys[5]) ?? "";
  const { newArray: brandsArr } = useConvertToArray(brandsParam);
  const priceRangeParam =
    searchParams.get(productQueryKeys[4]) ?? "min,0,max,0";
  const { convertedToObject: priceRange } =
    useConvertStringToObject(priceRangeParam);
  const rating = searchParams.get("rating") ?? "0";
  const filters: TFiltersValue = {
    categoriesToFilter: categoriesArr ?? [],
    rating: parseInt(rating),
    priceRangeToFilter: priceRange,
    brandsToFilter: brandsArr ?? [],
  };

  const sortByPriceLowToHigh =
    searchParams.get("sortByPriceLowToHigh") ?? "true";
  const deferredQuery = useDeferredValue(q);
  const [serchProducts, { data, isLoading }] = useLazySearchProductsQuery();
  const dataShallowCopy = { ...data };
  const { sortedProduct } = useSortProduct(
    JSON.parse(sortByPriceLowToHigh),
    dataShallowCopy.products
  );
  const { filteredProducts } = useFilterProducts(filters, sortedProduct);
  const { categories } = useCategories(dataShallowCopy?.products);
  const { brands } = useBrands(dataShallowCopy?.products);

  const inputRef = useRef<HTMLInputElement>(null);
  const start = (Number(page) - 1) * Number(PER_PAGE);
  const end = start + Number(PER_PAGE);

  const products = filteredProducts?.slice(start, end);
  const productsLength = filteredProducts?.length;
  const isProductListNotEmptyQueryLoading =
    filteredProducts && filteredProducts.length > 0 && q && !isLoading;

  useEffect(() => {
    if (deferredQuery && deferredQuery.length) {
      serchProducts({
        query: deferredQuery,
      });
    }
  }, [deferredQuery, serchProducts, searchParams]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {}, []);

  const onDeleteQuery = () => {
    setSearchParams((prev) => {
      productQueryKeys.map((key) => prev.delete(key));
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
          query={q}
          categories={categories}
          brands={brands}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          filters={filters}
          length={productsLength}
          sortByPriceLowToHigh={JSON.parse(sortByPriceLowToHigh)}
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
