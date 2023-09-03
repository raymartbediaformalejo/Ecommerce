import { useEffect } from "react";
import Product, { ProductImage } from "../../../components/Products/Product";
import { useGetProductQuery } from "../../../redux/products/products.api";

type RecommendedProductItemProps = {
  onIsLoadingProduct: (isLoading: boolean) => void;
  productId: number;
};

const RecommendedProductItem = ({
  onIsLoadingProduct,
  productId,
}: RecommendedProductItemProps) => {
  const { data, isLoading } = useGetProductQuery({ id: productId });
  
  useEffect(() => {
    onIsLoadingProduct(isLoading);
  }, [isLoading, onIsLoadingProduct]);

  return (
    <>
      {data && (
        <Product.Wrapper>
          <ProductImage
            src={data.thumbnail}
            alt={data.title}
            variant="variant-2"
          />
          <Product.BodyWrapper>
            <Product.Title>{data.title}</Product.Title>
            <Product.Price
              price={data.price}
              discountPercentage={data.discountPercentage}
            />
          </Product.BodyWrapper>
        </Product.Wrapper>
      )}
    </>
  );
};

export default RecommendedProductItem;
