import { useEffect, useState, memo } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { useGetProductQuery } from "../../redux/products/products.api";
import Product, {
  ProductImage,
  Price,
} from "../../components/Products/Product";
import Button from "../../components/ui/Button";
import Loading from "../../components/Loading/Loading";
import classes from "../../styles/pages/Products/SingleProduct.module.css";
import TabButton from "../../components/ui/TabButton";
import ProductVarieties from "./components/ProductVarieties/ProductVarieties";

const MemoizedProductImage = memo(ProductImage);

const SingleProduct = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data: product, isLoading } = useGetProductQuery({
    id: productId ? productId : "",
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [imageIdParam, setImageIdParam] = useState(
    searchParams.get("imageId") || "0"
  );

  const [activeProductImage, setActiveProductImage] = useState(
    product?.images[+imageIdParam]
  );
  const [isOpenVariety, setIsOpenVariety] = useState(false);
  const [selectedButton, setSelectedButton] = useState("");

  useEffect(() => {
    if (product) setActiveProductImage(product?.images[0]);
  }, [product]);

  useEffect(() => {
    setImageIdParam(searchParams.get("imageId")!);
    setActiveProductImage(product?.images[+imageIdParam]);
  }, [searchParams, imageIdParam, product?.images]);

  const handleProductImageIdClick = (imageId: number) => {
    if (imageId !== null && imageId !== undefined) {
      setActiveProductImage(product?.images[imageId]);
      setSearchParams((prev) => {
        prev.set("imageId", imageId + "");
        return prev;
      });
    }
  };

  const handleToggleIsOpenVariety = (button: string) => {
    setIsOpenVariety((prev) => !prev);
    setSelectedButton(button);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={classes["single-product"]}>
          {product && (
            <Product
              variants="single"
              className={classes["single-product-wrapper"]}
            >
              <Product.Wrapper className={classes["product-wrapper"]}>
                <div
                  className={`${classes["container"]} ${classes["image-wrapper"]}`}
                >
                  <MemoizedProductImage
                    variant="variant-2"
                    src={activeProductImage || product.images[0]}
                    alt={product.title}
                    className={classes["product-image"]}
                  />
                  <div className={`${classes["image-tab-buttons"]}`}>
                    <div className={classes["image-tab-button-wrapper"]}>
                      {product.images.map((image, i) => {
                        return (
                          <TabButton
                            key={i}
                            isActive={activeProductImage === image}
                            variant="image-button"
                            onClick={() => handleProductImageIdClick(i)}
                          >
                            <img src={image} />
                          </TabButton>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <Product.BodyWrapper
                  className={`${classes["product-info-wrapper"]}`}
                >
                  <Product.Title className={classes["product-name"]}>
                    {product.title}
                  </Product.Title>
                  <Product.Description>
                    {product.description}
                  </Product.Description>
                  <Price
                    price={product.price}
                    discountPercentage={product.discountPercentage}
                  />
                  <ProductVarieties
                    productId={product.id}
                    images={product.images}
                    setIsOpenVariety={setIsOpenVariety}
                    isOpenVariety={isOpenVariety}
                    selectedButton={selectedButton}
                    rawId={productId}
                    price={product.price}
                    discount={product.discountPercentage}
                  />
                </Product.BodyWrapper>
              </Product.Wrapper>
            </Product>
          )}
          <div className={classes["buttons-container"]}>
            <Button
              onClick={() => handleToggleIsOpenVariety("add-to-cart")}
              size="large"
              variant="outlined"
            >
              Add to cart
            </Button>
            <Button
              onClick={() => handleToggleIsOpenVariety("buy-now")}
              size="large"
            >
              Buy now
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
