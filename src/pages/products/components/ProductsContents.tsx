import { SetURLSearchParams } from "react-router-dom";

import Loading from "../../../components/Loading/Loading";
import classes from "../../../styles/pages/Products/Search.module.css";
import ProductList from "../components/ProductList";
import ProductFilterPriceLayout from "../components/ProductFilterPriceLayout";
import Pagination from "../../../components/Pagination/Pagination";
import { PER_PAGE } from "../../../utils/productConstant";
import { TFiltersValue } from "../../../redux/ui/ProductFilter/productFilter.type";
import { TBrand, TCategory, TProduct } from "../../../types/TProducts";

type TProductsContentsProps = {
  title?: string;
  query?: string | null;
  filteredProducts: TProduct[];
  categories: TCategory[];
  brands: TBrand[];
  filters: TFiltersValue;
  isGridLayout: boolean;
  sortByPriceLowToHigh: boolean;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  isLoading: boolean;
  page: string;
  isProductListNotEmptyQueryLoading: boolean;
  isShowPagination: boolean;
};
const ProductsContents = ({
  title,
  query,
  filteredProducts,
  categories,
  brands,
  filters,
  isGridLayout,
  sortByPriceLowToHigh,
  searchParams,
  setSearchParams,
  isLoading,
  page,
  isProductListNotEmptyQueryLoading,
  isShowPagination,
}: TProductsContentsProps) => {
  const start = (parseInt(page) - 1) * PER_PAGE;
  const end = start + PER_PAGE;
  const products = filteredProducts?.slice(start, end);
  const productsLength = filteredProducts?.length;
  return (
    <>
      {isProductListNotEmptyQueryLoading && (
        <ProductFilterPriceLayout
          title={title!}
          query={query}
          categories={categories}
          brands={brands}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          filters={filters}
          length={productsLength}
          sortByPriceLowToHigh={sortByPriceLowToHigh}
          isGridLayout={isGridLayout}
        />
      )}
      <div
        className={`
      ${classes["product-list-container"]} `}
      >
        {isLoading && <Loading />}
        {isProductListNotEmptyQueryLoading && (
          <ProductList products={products} isGridLayout={isGridLayout} />
        )}
        {isShowPagination && filteredProducts.length > PER_PAGE && (
          <Pagination
            hasNextPage={end < filteredProducts.length}
            hasPrevPage={start > 0}
            activePage={page}
            setSearchParams={setSearchParams}
            total={productsLength}
          />
        )}
      </div>
    </>
  );
};

export default ProductsContents;
