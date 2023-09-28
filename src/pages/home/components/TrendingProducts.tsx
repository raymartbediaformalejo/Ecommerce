import { useState, useRef, useEffect } from "react";
import Divider from "../../../components/ui/Divider";
import forwardButton from "../../../assets/icons/Forward.svg";
import backwardButton from "../../../assets/icons/backward.svg";
import TabButton from "../../../components/ui/TabButton";
import classes from "../../../styles/components/home/TrendingProducts.module.css";
import Product from "../../../components/Products/Product";
import {
  useGetCategoriesQuery,
  useGetAllTopRatedProductsQuery,
} from "../../../redux/products/products.api";
import SkeletonProduct from "../../../components/ui/Skeletons/SkeletonProduct";
import { ProductImage } from "../../../components/Products/Product";
import ForwardArrow from "../../../assets/icons/Forward Arrow.svg";
import { Link } from "react-router-dom";
const TrendingProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data: topProductByCategory, isLoading: isLoadingTopProduct } =
    useGetAllTopRatedProductsQuery({
      category: selectedCategory,
      mode: "top-4",
    });

  const { data: categories, isLoading: categoryLoading } =
    useGetCategoriesQuery();
  const [toggleState, setToggleState] = useState("all");

  const tabListRef = useRef<HTMLDivElement>(null);
  const [isRightArrowActive, setIsRightArrowActive] = useState(false);
  const [isLeftArrowActive, setIsLeftArrowActive] = useState(false);

  useEffect(() => {
    if (!categoryLoading) {
      manageIcons();
    }
  }, [categoryLoading]);

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
      }, 300);
    }
  };

  const toggleTab = (category: string) => {
    setSelectedCategory(category);
    setToggleState(category);
  };

  return (
    <section className={classes["top-rated-container"]}>
      <div className={classes["title-wrapper"]}>
        <h3 className={`title ${classes["title-top-rated"]}`}>Top rated</h3>
        <Divider />
      </div>

      <div className={classes["tab-container"]}>
        <button
          className={`${classes["left-arrow-container"]} ${
            isLeftArrowActive && classes["active"]
          }`}
          onClick={() => handleArrowClick(-200)}
        >
          <img
            className={classes["left-arrow"]}
            src={backwardButton}
            alt="back"
          />
        </button>
        <div
          onScroll={manageIcons}
          className={classes["inner-tab-container"]}
          ref={tabListRef}
        >
          {categories &&
            categories.map(({ id, value, name }) => {
              return (
                <TabButton
                  key={id}
                  size="sm"
                  isActive={toggleState === value}
                  onClick={() => toggleTab(value)}
                >
                  {name}
                </TabButton>
              );
            })}
        </div>
        <button
          className={
            isRightArrowActive
              ? `${classes["right-arrow-container"]} ${classes["active"]}`
              : classes["right-arrow-container"]
          }
          onClick={() => handleArrowClick(200)}
        >
          <img
            className={classes["right-arrow"]}
            src={forwardButton}
            alt="next"
          />
        </button>
      </div>

      <Product>
        {isLoadingTopProduct && <SkeletonProduct repeat={4} />}
        {topProductByCategory &&
          topProductByCategory.products.map((product) => {
            return (
              <Product.Wrapper key={product.id}>
                <ProductImage
                  src={product.thumbnail}
                  alt={product.title}
                  variant="variant-1"
                />
                <Product.BodyWrapper>
                  <Product.Title>{product.title}</Product.Title>
                  <Product.Price
                    price={product.price}
                    discountPercentage={product.discountPercentage}
                  />
                  <Product.Rating value={product.rating} />
                </Product.BodyWrapper>
              </Product.Wrapper>
            );
          })}
      </Product>
      <Link to="/products" className={classes["more-product-button"]}>
        Explore More
        <img src={ForwardArrow} alt="➡" />
      </Link>
    </section>
  );
};

export default TrendingProducts;
