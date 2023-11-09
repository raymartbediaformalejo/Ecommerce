import { useEffect, useRef } from "react";
import { useSearchParams, useParams } from "react-router-dom";

import { useGetAllProductsQuery } from "../../redux/products/products.api";
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
import { CATEGORY } from "../../utils/productConstant";
import { TAccordionItem, TArrayOfIds } from "../../types/TAccordionItem";

const Products = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const categoryArray = categoryId?.split("-");
  const categoryName =
    categoryId &&
    categoryArray &&
    categoryArray[0].charAt(0).toLocaleUpperCase() + categoryArray[0].slice(1);
  const subCategory =
    categoryId &&
    categoryArray &&
    categoryArray[1].charAt(0).toLocaleUpperCase() + categoryArray[1].slice(1);

  const subSubCategory: string | undefined =
    categoryId &&
    categoryArray &&
    categoryArray?.length === 3 &&
    typeof categoryArray[2] === "string"
      ? categoryArray[2].charAt(0).toLocaleUpperCase() +
        categoryArray[2].slice(1)
      : undefined;

  const productIds = subSubCategory
    ? (
        CATEGORY[categoryName as keyof typeof CATEGORY][
          subCategory as keyof typeof CATEGORY
        ] as Record<string, TAccordionItem>
      )[subSubCategory]
    : (CATEGORY[categoryName as keyof typeof CATEGORY][
        subCategory as keyof typeof CATEGORY
      ] as TAccordionItem | number[] | TArrayOfIds);

  const { data: allProducts, isLoading } = useGetAllProductsQuery({
    ids: productIds ? (productIds as number[]) : null,
  });

  const title =
    categoryId && categoryArray && categoryArray?.length === 3
      ? `${categoryName}'s ${subSubCategory}`
      : categoryId && categoryArray && categoryArray?.length === 2
      ? `${categoryName}'s ${subCategory}`
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

  const inputRef = useRef<HTMLInputElement>(null);

  const isProductListNotEmptyQueryLoading =
    filteredProducts && filteredProducts.length > 0 && !isLoading;
  const isShowPagination = filteredProducts && !isLoading;
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  console.log(allProducts);
  return (
    <div className={`container ${classes["search-container"]}`}>
      <ProductsContents
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
