import { useEffect } from "react";
import Product, { ProductImage } from "../../../components/Products/Product";
import { useGetProductQuery } from "../../../redux/products/products.api";
import mergeProductNameID from "../../../utils/mergeProductNameID";
import { Link } from "react-router-dom";

type RecommendedProductItemProps = {
  onIsLoadingProduct: (isLoading: boolean) => void;
  productId: number;
};

const RecommendedProductItem = ({
  onIsLoadingProduct,
  productId,
}: RecommendedProductItemProps) => {
  const { data, isLoading } = useGetProductQuery({ id: productId });
  // console.log(data);

  useEffect(() => {
    onIsLoadingProduct(isLoading);
  }, [isLoading, onIsLoadingProduct]);

  const { newProductId } = mergeProductNameID({
    productName: data?.title,
    productId: data?.id,
  });

  return (
    <>
      {data && (
        <Link to={`/product/${newProductId}`}>
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
        </Link>
      )}
    </>
  );
};

export default RecommendedProductItem;
