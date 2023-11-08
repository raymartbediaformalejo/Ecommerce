import { useEffect, useRef, useDeferredValue } from "react";
import { useSearchParams } from "react-router-dom";

import { useLazySearchProductsQuery } from "../../redux/products/products.api";
import SearchForm from "./components/SearchForm";
import classes from "../../styles/pages/Products/Search.module.css";
import { useCategories } from "../../hooks/useCategories";
import { useBrands } from "../../hooks/useBrands";
import { useFilterProducts } from "../../hooks/useFitlerProducts";
import { productQueryKeys } from "../../utils/productConstant";
import { useSortProduct } from "../../hooks/useSortProducts";
import { useConvertToArray } from "../../hooks/useConvertToArray";
import { useConvertStringToObject } from "../../hooks/useConvertStringToObject";
import { TFiltersValue } from "../../redux/ui/ProductFilter/productFilter.type";
import ProductsContents from "./components/ProductsContents";

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

  console.log(priceRange);

  const filters: TFiltersValue = {
    categoriesToFilter: categoriesArr ?? [],
    rating: parseInt(rating),
    priceRangeToFilter: priceRange,
    brandsToFilter: brandsArr ?? [],
  };

  const sortByPriceLowToHigh =
    searchParams.get("sortByPriceLowToHigh") ?? "true";
  const isGridLayout = searchParams.get("isGridLayout") ?? "true";
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
  const isProductListNotEmptyQueryLoading =
    filteredProducts && filteredProducts.length > 0 && q && !isLoading;
  const isShowPagination = filteredProducts && q && !isLoading;
  useEffect(() => {
    if (deferredQuery && deferredQuery.length) {
      serchProducts({
        query: deferredQuery,
      });
    }
  }, [deferredQuery, serchProducts, searchParams]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      inputRef.current.focus({ preventScroll: true });
    }
  }, []);

  return (
    <section className={`container ${classes["search-container"]}`}>
      <SearchForm
        q={deferredQuery}
        inputRef={inputRef}
        setSearchParams={setSearchParams}
      />

      <ProductsContents
        query={q}
        filteredProducts={filteredProducts}
        categories={categories}
        brands={brands}
        filters={filters}
        isGridLayout={JSON.parse(isGridLayout)}
        sortByPriceLowToHigh={JSON.parse(sortByPriceLowToHigh)}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        isLoading={isLoading}
        page={page}
        isProductListNotEmptyQueryLoading={
          isProductListNotEmptyQueryLoading as boolean
        }
        isShowPagination={isShowPagination as boolean}
      />
    </section>
  );
};

export default Search;
