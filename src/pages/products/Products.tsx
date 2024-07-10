import { memo } from "react";
import { useSearchParams, useParams } from "react-router-dom";

import { useGetProductsQuery } from "../../redux/products/products.api";
import { useCategories } from "../../hooks/useCategories";
import { useBrands } from "../../hooks/useBrands";
import { useFilterProducts } from "../../hooks/useFitlerProducts";
import { productQueryKeys } from "../../utils/productConstant";
import { useSortProduct } from "../../hooks/useSortProducts";
import { useConvertToArray } from "../../hooks/useConvertToArray";
import { useConvertStringToObject } from "../../hooks/useConvertStringToObject";
import { TFiltersValue } from "../../redux/ui/ProductFilter/productFilter.type";
import ProductsContents from "./components/ProductsContents";
import classes from "../../styles/pages/Products/Search.module.css";

const MemoizedProductsContents = memo(ProductsContents);

const getCapitalizeCategoryName = ({
  rawCategoryName,
}: {
  rawCategoryName: string;
}) => {
  const categoryName =
    rawCategoryName.charAt(0).toLocaleUpperCase() + rawCategoryName.slice(1);

  return categoryName;
};


const Products = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const categoryArray =
    categoryId
      ?.split("-")
      .map((category) =>
        getCapitalizeCategoryName({ rawCategoryName: category })
      ) || [];

  const [category, subCategory, subSubCategory] = categoryArray!;

  const title =
    categoryId && categoryArray && categoryArray?.length >= 3
      ? `${category}'s ${subSubCategory}`
      : categoryId && categoryArray && categoryArray?.length === 2
      ? `${category}'s ${subCategory}`
      : categoryId && categoryArray && categoryArray?.length === 1
      ? category
      : "All Products";

  const [searchParams, setSearchParams] = useSearchParams();
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
  const { data: allProducts, isLoading } = useGetProductsQuery({ limit: 100 });

  console.log("allProducts: ", allProducts);

  const sortByPriceLowToHigh =
    searchParams.get("sortByPriceLowToHigh") ?? "true";
  const isGridLayout = searchParams.get("isGridLayout") ?? "true";
  const dataShallowCopy = { ...allProducts };
  const { sortedProduct } = useSortProduct(
    JSON.parse(sortByPriceLowToHigh),
    dataShallowCopy.products
  );
  const { filteredProducts } = useFilterProducts(filters, sortedProduct);
  const { categories } = useCategories(dataShallowCopy?.products);
  const { brands } = useBrands(dataShallowCopy?.products);

  const isProductListNotEmptyQueryLoading =
    filteredProducts && filteredProducts.length > 0 && !isLoading;
  const isShowPagination = filteredProducts && !isLoading;

  return (
    <div className={`container ${classes["search-container"]}`}>
      <MemoizedProductsContents
        title={title}
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
        isProductListNotEmptyQueryLoading={isProductListNotEmptyQueryLoading}
        isShowPagination={isShowPagination}
      />
    </div>
  );
};

export default Products;
