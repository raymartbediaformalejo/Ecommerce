import { useRef } from "react";
import { Link } from "react-router-dom";

import classes from "../../styles/components/Navigations/TopNavigationItem.module.css";
import { TAccordionItem } from "../../types/TAccordionItem";
import { TProduct } from "../../types/TProducts";
import Product, { ProductImage } from "../Products/Product";

type TTopNavigationItem = {
  name: string;
  values: TAccordionItem;
  active: string | null;
  isInHeader: boolean;
  featuredProduct?: TProduct;
  onMouseLeaveHeader?: (bol: boolean) => void;
  onMouseOver: (key: string) => void;
  onMouseOut: () => void;
};

const TopNavigationItem = ({
  name,
  values,
  active,
  featuredProduct,
  isInHeader,
  onMouseOver,
  onMouseOut,
}: TTopNavigationItem) => {
  const isActive = isInHeader && active === name;
  const navBodyRef = useRef<HTMLDivElement>(null);
  const isArray = (item: unknown) => {
    return Array.isArray(item);
  };
  const subCategTitle = (title: string) => {
    const newTitle =
      title === "Men"
        ? "for him"
        : title === "Women"
        ? "for her"
        : title === "Kids"
        ? "for kids"
        : "";

    return newTitle;
  };

  return (
    <li
      onMouseOver={() => onMouseOver(name)}
      onMouseOut={onMouseOut}
      className={`${classes["nav-item"]} ${isActive ? classes["active"] : ""}`}
    >
      <Link to="/" className={classes["nav-item__link"]}>
        {name}
        <span onMouseOver={() => onMouseOver(name)} onMouseOut={onMouseOut}>
          {name}
        </span>
      </Link>
      <div
        ref={navBodyRef}
        className={` ${classes["nav-item-body"]} ${
          isActive ? classes["show"] : ""
        }`}
        onMouseEnter={() => onMouseOver(name)}
        onMouseLeave={onMouseOut}
      >
        <div className={`container ${classes["nav-item-body-wrapper"]}`}>
          {Object.entries(values).map(([key, subCateg]) => (
            <div key={key} className={classes["sub-category"]}>
              {isArray(subCateg) && (
                <Link to="/" className={classes["sub-category__title"]}>
                  {subCategTitle(key)}
                </Link>
              )}
              {!isArray(subCateg) && (
                <>
                  <Link to="/" className={classes["sub-category__title"]}>
                    {subCategTitle(key)}
                  </Link>
                  <ul>
                    {Object.entries(subCateg).map(([key, __]) => (
                      <li key={key}>
                        <Link to="/" className={classes["sub-category__item"]}>
                          {key}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
          {featuredProduct && (
            <div className={classes["featured-product"]}>
              <ProductImage
                src={featuredProduct?.thumbnail}
                alt={featuredProduct?.title}
                className={classes["nav-item__featured-product-img"]}
              />
              <Product.Title
                className={classes["nav-item__featured-product-title"]}
              >
                {featuredProduct.title}
              </Product.Title>
              <Product.Price
                className={classes["nav-item__featured-product-price"]}
                price={featuredProduct.price}
                discountPercentage={featuredProduct.discountPercentage}
              />
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default TopNavigationItem;
