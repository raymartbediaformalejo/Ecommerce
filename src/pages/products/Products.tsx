import { memo } from "react";
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
import { CATEGORY, topNavItems } from "../../utils/productConstant";
import { TTopnavItems } from "../../types/TAccordionItem";
type TCategory = TTopnavItems | number[] | null;

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

const getAllArrayValues = ({ categoryArray }: { categoryArray: string[] }) => {
  let categories: TCategory = {
    ...topNavItems,
    ...CATEGORY,
  };
  const allValues: number[] = [];

  for (const category of categoryArray) {
    if (
      categories &&
      typeof categories === "object" &&
      !Array.isArray(categories)
    ) {
      categories = categories[category];
    } else {
      categories = null;
      break;
    }
  }

  const processCategory = (category: TCategory) => {
    if (Array.isArray(category)) {
      allValues.push(...category);
    } else if (typeof category === "object" && category !== null) {
      for (const subCategory in category) {
        const subCategoryObject =
          category[subCategory as keyof typeof category];

        if (Array.isArray(subCategoryObject)) {
          allValues.push(...subCategoryObject);
        } else {
          processCategory(subCategoryObject);
        }
      }
    }
  };

  processCategory(categories);

  return allValues;
};

const Products = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const categoryArray = categoryId
    ?.split("-")
    .map((category) =>
      getCapitalizeCategoryName({ rawCategoryName: category })
    );

  const [category, subCategory, subSubCategory] = categoryArray!;

  const productIds: number[] | undefined = categoryArray
    ? getAllArrayValues({ categoryArray: categoryArray! })
    : undefined;

  const { data: allProducts, isLoading } = useGetAllProductsQuery({
    ids: productIds ? (productIds as number[]) : null,
  });

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
