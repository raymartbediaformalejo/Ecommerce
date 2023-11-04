import { useRef, useState, useEffect } from "react";
import Product from "../../../components/Products/Product";
import Divider from "../../../components/ui/Divider";
import classes from "../../../styles/components/home/Recommendations.module.css";
import RecommendedProductItem from "./RecommendedProductItem";
import prevButton from "../../../assets/icons/backward.svg";
import nextButton from "../../../assets/icons/Forward.svg";
import { RECOMMENDED_PRODUCTS } from "../../../utils/productConstant";

const Recommendations = () => {
  const tabListRef = useRef<HTMLDivElement>(null);
  const [isRightArrowActive, setIsRightArrowActive] = useState(false);
  const [isLeftArrowActive, setIsLeftArrowActive] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);

  const manageIcons = () => {
    if (tabListRef.current) {
      const tabList = tabListRef.current;
      setIsLeftArrowActive(tabList.scrollLeft > 73);
      setIsRightArrowActive(
        tabList.scrollWidth - tabList.clientWidth - tabList.scrollLeft > 73
      );
    }
  };

  const handleArrowClick = (scrollOffset: number) => {
    if (tabListRef.current) {
      const innerTabContainer = tabListRef.current;
      innerTabContainer.scrollLeft += scrollOffset;
      setTimeout(() => {
        manageIcons();
      }, 200);
    }
  };
  const onIsLoadingProductHandler = (isLoading: boolean) => {
    setIsLoadingProduct(isLoading);
  };
  useEffect(() => {
    if (!isLoadingProduct) {
      manageIcons();
    }
  }, [isLoadingProduct]);

  return (
    <section className={`container ${classes["recommendation-container"]}`}>
      <h3 className={`title ${classes["title-recommendation"]}`}>
        Just For you
        <Divider className={classes["divider"]} />
      </h3>

      <div className={classes["products-wrapper"]}>
        <button
          className={`${classes["left-arrow-container"]} ${
            isLeftArrowActive && classes["active"]
          }`}
          onClick={() => handleArrowClick(-250)}
        >
          <img className={classes["left-arrow"]} src={prevButton} alt="back" />
        </button>
        <div
          className={classes["inner-product-wrapper"]}
          onScroll={manageIcons}
          ref={tabListRef}
        >
          <Product
            variants="variant-2"
            className={classes["products-container"]}
          >
            {RECOMMENDED_PRODUCTS.map((productId) => (
              <RecommendedProductItem
                key={productId}
                productId={productId}
                onIsLoadingProduct={onIsLoadingProductHandler}
              />
            ))}
          </Product>
        </div>

        <button
          className={
            isRightArrowActive
              ? `${classes["right-arrow-container"]} ${classes["active"]}`
              : classes["right-arrow-container"]
          }
          onClick={() => handleArrowClick(250)}
        >
          <img className={classes["right-arrow"]} src={nextButton} alt="next" />
        </button>
      </div>
    </section>
  );
};

export default Recommendations;
