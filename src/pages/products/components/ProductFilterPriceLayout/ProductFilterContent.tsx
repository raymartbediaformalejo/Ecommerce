import React, { useState, Dispatch, SetStateAction } from "react";
import { SetURLSearchParams } from "react-router-dom";

import Button from "../../../../components/ui/Button";
import classes from "../../../../styles/pages/Products/ProductFilterContent.module.css";
import { TCategory, TBrand } from "../../../../types/TProducts";
import { TFiltersValue } from "../../../../redux/ui/ProductFilter/productFilter.type";
import {
  initialFiltersValue,
  productQueryKeys,
  ratingsRange,
  priceRangeAutoCompleteValue,
} from "../../../../utils/productConstant";

type TProductFilterContentProps = {
  categories: TCategory[];
  brands: TBrand[];
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
  searchParam: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  filters: TFiltersValue;
};

const ProductFilterContent = ({
  categories,
  brands,
  setIsFilterOpen,
  setSearchParams,
  filters,
}: TProductFilterContentProps) => {
  const [filtersValue, setFiltersValue] = useState<TFiltersValue>({
    categoriesToFilter: filters.categoriesToFilter ?? [],
    rating: filters.rating,
    priceRangeToFilter: filters.priceRangeToFilter,
    brandsToFilter: filters.brandsToFilter ?? [],
  });

  const handleCategoryClick = (category: string) => {
    setFiltersValue((prev) => {
      const isCategorySelected = prev.categoriesToFilter.includes(category);
      let updatedCategoriesToFilter;

      if (isCategorySelected) {
        updatedCategoriesToFilter = prev.categoriesToFilter.filter(
          (existingCategory) => existingCategory !== category
        );
      } else {
        updatedCategoriesToFilter = [...prev.categoriesToFilter, category];
      }

      return { ...prev, categoriesToFilter: updatedCategoriesToFilter };
    });
  };

  const handleRatingClick = (rating: number) => {
    console.log(rating);

    setFiltersValue((prev) => {
      const isEqual = prev.rating === rating;
      let updatedRating;

      if (isEqual) {
        updatedRating = 0;
      } else {
        updatedRating = rating;
      }
      return { ...prev, rating: updatedRating };
    });
  };

  const handlePriceRangeClick = (min: number, max: number) => {
    setFiltersValue((prev) => {
      const isEqual =
        prev.priceRangeToFilter.min === min &&
        prev.priceRangeToFilter.max === max;
      let updatedPriceRange;

      if (isEqual) {
        updatedPriceRange = { min: 0, max: 0 };
      } else {
        updatedPriceRange = { min, max };
      }
      return { ...prev, priceRangeToFilter: updatedPriceRange };
    });
  };

  const handleMinPriceRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const min = parseInt(e.target.value);
    setFiltersValue((prev) => ({
      ...prev,
      priceRangeToFilter: { ...prev.priceRangeToFilter, min },
    }));
  };

  const handleMaxPriceRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const max = parseInt(e.target.value);
    setFiltersValue((prev) => ({
      ...prev,
      priceRangeToFilter: { ...prev.priceRangeToFilter, max },
    }));
  };

  const handleBrandsClick = (brand: string) => {
    setFiltersValue((prev) => {
      const isBrandSelected = prev.brandsToFilter.includes(brand);
      let updatedBrandsToFilter;

      if (isBrandSelected) {
        updatedBrandsToFilter = prev.brandsToFilter.filter(
          (existingBrand) => existingBrand !== brand
        );
      } else {
        updatedBrandsToFilter = [...prev.brandsToFilter, brand];
      }

      return { ...prev, brandsToFilter: updatedBrandsToFilter };
    });
  };
  console.log(filtersValue.categoriesToFilter);

  const handleApplyFilterClick = () => {
    setSearchParams((prev) => {
      const productFilterQueryAndConditonArray = [
        {
          condition: filtersValue.categoriesToFilter.length > 0,
          queryString: filtersValue.categoriesToFilter.toString(),
        },
        {
          condition: filtersValue.rating > 0,
          queryString: filtersValue.rating.toString(),
        },
        {
          condition:
            filtersValue.priceRangeToFilter.min >= 0 &&
            filtersValue.priceRangeToFilter.max > 0,
          queryString: Object.entries(
            filtersValue.priceRangeToFilter
          ).toString(),
        },
        {
          condition: filtersValue.brandsToFilter.length > 0,
          queryString: filtersValue.brandsToFilter.toString(),
        },
      ];

      productFilterQueryAndConditonArray.map(
        ({ condition, queryString }, i) => {
          if (condition) {
            prev.set(productQueryKeys[i + 2], queryString);
          } else {
            prev.delete(productQueryKeys[i + 2]);
          }
        }
      );

      return prev;
    });

    setIsFilterOpen((prev) => !prev);
    setSearchParams((prev) => {
      prev.set("page", "1");
      return prev;
    });
  };

  const handleResetFilterClick = () => {
    setSearchParams((prev) => {
      productQueryKeys
        .filter(
          (productQuery) => productQuery !== "q" ?? productQuery !== "page"
        )
        .map((query) => prev.delete(query));
      return prev;
    });
    setFiltersValue((prev) => ({
      ...prev,
      ...initialFiltersValue,
    }));

    setIsFilterOpen((prev) => !prev);
    setSearchParams((prev) => {
      prev.set("page", "1");
      return prev;
    });
  };

  return (
    <div className={classes["filter-content-card"]}>
      <div className={classes["filter-group-card"]}>
        <p className={classes["filter-group-title"]}>By Category</p>
        <div className={classes["product-filter-button-card"]}>
          {categories.map(({ id, name, value }) => (
            <Button
              key={id}
              isActive={filtersValue.categoriesToFilter.includes(value)}
              size="small"
              variant="gray"
              textTransform="capitalize"
              onClick={() => handleCategoryClick(value)}
            >
              {name}
            </Button>
          ))}
        </div>
      </div>

      <div className={classes["filter-group-card"]}>
        <p className={classes["filter-group-title"]}>Rating</p>
        <div className={classes["product-filter-button-card"]}>
          {Object.entries(ratingsRange).map(([key, value]) => (
            <Button
              key={key}
              isActive={filtersValue.rating === value}
              size="small"
              variant="gray"
              textTransform="capitalize"
              onClick={() => handleRatingClick(value)}
            >
              {key}
            </Button>
          ))}
        </div>
      </div>

      <div className={classes["filter-group-card"]}>
        <p className={classes["filter-group-title"]}>Price Range ($)</p>
        <div>
          <div className={classes["price-range-input-card"]}>
            <input
              className={classes["price-range-input"]}
              type="number"
              placeholder="MIN"
              value={filtersValue.priceRangeToFilter.min}
              onChange={handleMinPriceRangeChange}
            />
            <div className={classes["price-range-to"]}></div>
            <input
              className={classes["price-range-input"]}
              type="number"
              placeholder="MAX"
              value={filtersValue.priceRangeToFilter.max}
              onChange={handleMaxPriceRangeChange}
            />
          </div>
          <div
            className={`${classes["price-range-autocomplete-card"]} ${classes["product-filter-button-card"]}`}
          >
            {Object.entries(priceRangeAutoCompleteValue).map(
              ([key, [min, max]]) => {
                return (
                  <Button
                    key={key}
                    isActive={
                      filtersValue.priceRangeToFilter.min === min &&
                      filtersValue.priceRangeToFilter.max === max
                    }
                    size="small"
                    variant="gray"
                    onClick={() => handlePriceRangeClick(min, max)}
                    textTransform="capitalize"
                  >
                    {key}
                  </Button>
                );
              }
            )}
          </div>
        </div>
      </div>
      <div className={classes["filter-group-card"]}>
        <p className={classes["filter-group-title"]}>Brand</p>
        <div className={classes["product-filter-button-card"]}>
          {brands.map(({ id, name, value }) => (
            <Button
              key={id}
              isActive={filtersValue.brandsToFilter.includes(value)}
              size="small"
              variant="gray"
              textTransform="capitalize"
              onClick={() => handleBrandsClick(value)}
            >
              {name}
            </Button>
          ))}
        </div>
      </div>

      <div
        className={`${classes["apply-reset-button-card"]} ${classes["product-filter-button-card"]}`}
      >
        <Button
          onClick={handleResetFilterClick}
          size="large"
          variant="outlined"
        >
          Reset
        </Button>
        <Button
          size="large"
          variant="contained"
          onClick={handleApplyFilterClick}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default ProductFilterContent;
