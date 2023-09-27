import Product, { ProductImage } from "../../../components/Products/Product";
import { TProduct } from "../../../redux/products/product.types";

type ProductListProps = {
  products?: TProduct[];
  isGridLayout: boolean;
};

const ProductList = ({ isGridLayout, products }: ProductListProps) => {
  return (
    <Product isGridLayout={isGridLayout}>
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
              {!isGridLayout && (
                <Product.Description>{product.description}</Product.Description>
              )}

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
