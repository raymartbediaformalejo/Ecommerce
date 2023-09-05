import Product, { ProductImage } from "../../../components/Products/Product";
import { TProduct } from "../../../redux/products/product.types";

type ProductListProps = {
  products?: TProduct[];
};

const ProductList = ({ products }: ProductListProps) => {
  return (
    <Product>
      {products?.map((product) => {
        return (
          <Product.Wrapper key={product.id}>
            <ProductImage
              src={product.thumbnail}
              alt={product.title}
              variant="variant-2"
            />
            <Product.BodyWrapper>
              <Product.Title>{product.title}</Product.Title>
              <Product.Rating value={product.rating} />
              <Product.Price
                price={product.price}
                discountPercentage={product.discountPercentage}
              />
            </Product.BodyWrapper>
          </Product.Wrapper>
        );
      })}
    </Product>
  );
};

export default ProductList;
