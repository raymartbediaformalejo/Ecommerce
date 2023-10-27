import { useState } from "react";

import classes from "../../styles/components/Navigations/TopNavigation.module.css";
import TopNavigationItem from "./TopNavigationItem";
import { TTopnavItems } from "../../types/TNavigation";
import { useGetAllProductsQuery } from "../../redux/products/products.api";

type TTopNavigation = {
  items: TTopnavItems;
  isInHeader: boolean;
};
const featuredProductIds: Record<string, number> = {
  apparel: 39,
  accessories: 76,
  bags: 75,
  footware: 56,
};
const productIds = [39, 76, 75, 56];

const TopNavigation = ({ items, isInHeader }: TTopNavigation) => {
  const ids = Object.values(featuredProductIds);
  const { data: featuredProductTopNav, isLoading } = useGetAllProductsQuery({
    ids,
  });

  const [active, setActive] = useState<string | null>(null);
  const mouseOver = (key: string) => {
    setActive(key);
  };

  const mouseOut = () => {
    setActive(null);
  };

  const getFeaturedProduct = (name: string) => {
    console.log(name);

    const featuredProduct = featuredProductTopNav?.products.find(
      (product) => featuredProductIds[name.toLowerCase()] === product.id
    );
    return featuredProduct;
  };

  return (
    <ul className={classes["nav-items"]}>
      {Object.entries(items).map(([key, value]) => {
        console.log(getFeaturedProduct(key));

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
