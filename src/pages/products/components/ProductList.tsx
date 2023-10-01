import { Link } from "react-router-dom";
import Product, { ProductImage } from "../../../components/Products/Product";
import { TProduct } from "../../../redux/products/product.types";
import mergeProductNameID from "../../../utils/mergeProductNameID";

type ProductListProps = {
  products?: TProduct[];
  isGridLayout: boolean;
};

const ProductList = ({ isGridLayout, products }: ProductListProps) => {
  return (
    <Product isGridLayout={isGridLayout}>
      {products?.map((product) => {
        const { newProductId } = mergeProductNameID({
          productName: product.title,
          productId: product.id,
        });
        return (
          <Link key={product.id} to={`/product/${newProductId}`}>
            <Product.Wrapper>
              <ProductImage
                src={product.thumbnail}
                alt={product.title}
                variant="variant-2"
              />
              <Product.BodyWrapper>
                <Product.Title>{product.title}</Product.Title>
                {!isGridLayout && (
                  <Product.Description>
                    {product.description}
                  </Product.Description>
                )}

                <Product.Price
                  price={product.price}
                  discountPercentage={product.discountPercentage}
                />
                <Product.Rating value={product.rating} />
              </Product.BodyWrapper>
            </Product.Wrapper>
          </Link>
        );
      })}
    </Product>
  );
};

export default ProductList;
