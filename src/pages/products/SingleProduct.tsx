import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import { useGetProductQuery } from "../../redux/products/products.api";
import Product, { ProductImage } from "../../components/Products/Product";
import Button from "../../components/ui/Button";
import Loading from "../../components/Loading/Loading";
import classes from "../../styles/pages/Products/SingleProduct.module.css";
import TabButton from "../../components/ui/TabButton";
import { addToCartProduct } from "../../redux/cart/cart.slice";
import { TCartProducts } from "../../redux/cart/cart.types";
import ProductVarieties from "./components/ProductVarieties/ProductVarieties";

const SingleProduct = () => {
  const dispatch = useAppDispatch();
  const { productId: rawId } = useParams<{ productId: string }>();
  const productId = rawId?.split("-").slice(-1)[0];
  const { data: product, isLoading } = useGetProductQuery({
    id: parseInt(productId as string),
  });
  const [activeProductImage, setActiveProductImage] = useState("");

  useEffect(() => {
    if (product) setActiveProductImage(product?.images[0]);
  }, [product]);

  const handleProductImageClick = (image: string) => {
    if (image) setActiveProductImage(image);
  };

  const handleAddToCartClick = (cartItem: TCartProducts) => {
    dispatch(addToCartProduct(cartItem));
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {product && (
            <Product variants="single">
              <Product.Wrapper>
                <div className={classes["image-container"]}>
                  <ProductImage
                    variant="variant-2"
                    src={activeProductImage || product.images[0]}
                    alt={product.title}
                  />
                  <div className={classes["image-tab-button-wrapper"]}>
                    {product.images.map((image, i) => (
                      <TabButton
                        key={i}
                        isActive={activeProductImage === image}
                        variant="image-button"
                        onClick={() => handleProductImageClick(image)}
                      >
                        <img src={image} />
                      </TabButton>
                    ))}
                  </div>
                </div>
                <Product.BodyWrapper>
                  <Product.Title>{product.title}</Product.Title>
                  <Product.Description>
                    {product.description}
                  </Product.Description>
                  <Product.Price
                    price={product.price}
                    discountPercentage={product.discountPercentage}
                  />
                  <ProductVarieties productId={product.id} />
                </Product.BodyWrapper>
              </Product.Wrapper>
            </Product>
          )}
          <div className={classes["buttons-container"]}>
            <Button
              onClick={() =>
                handleAddToCartClick({
                  id: product?.id as number,
                  quantity: 1,
                })
              }
              size="large"
              variant="outlined"
            >
              Add to cart
            </Button>
            <Button size="large">Buy now</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
