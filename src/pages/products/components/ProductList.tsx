import Product, { ProductImage } from "../../../components/Products/Product";
import { TProduct } from "../../../redux/products/product.types";

type ProductListProps = {
  products?: TProduct[];
};

const ProductList = ({ products }: ProductListProps) => {
  console.log(products);

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
  );
};

export default ProductList;
