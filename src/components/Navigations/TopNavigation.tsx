import { useState } from "react";

import classes from "../../styles/components/Navigations/TopNavigation.module.css";
import TopNavigationItem from "./TopNavigationItem";
import { TTopnavItems } from "../../types/TNavigation";
import { useGetAllProductsQuery } from "../../redux/products/products.api";
import { featuredProductIds } from "../../utils/productConstant";

type TTopNavigation = {
  items: TTopnavItems;
  isInHeader: boolean;
};

const TopNavigation = ({ items, isInHeader }: TTopNavigation) => {
  const ids = Object.values(featuredProductIds);
  const { data: featuredProductTopNav } = useGetAllProductsQuery({
    ids,
  });

  console.log("featuredProductTopNav", featuredProductTopNav);

  const [active, setActive] = useState<string | null>(null);
  const mouseOver = (key: string) => {
    setActive(key);
  };

  const mouseOut = () => {
    setActive(null);
  };

  const getFeaturedProduct = (name: string) => {
    const featuredProduct = featuredProductTopNav?.products.find(
      (product) => featuredProductIds[name.toLowerCase()] === product.id
    );
    return featuredProduct;
  };

  return (
    <ul className={classes["nav-items"]}>
      {Object.entries(items).map(([key, value]) => {
        return (
          <TopNavigationItem
            key={key}
            name={key}
            values={value}
            active={active}
            isInHeader={isInHeader}
            onMouseOver={mouseOver}
            onMouseOut={mouseOut}
            featuredProduct={getFeaturedProduct(key)}
          />
        );
      })}
    </ul>
  );
};

export default TopNavigation;
