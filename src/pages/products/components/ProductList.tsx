import { memo } from "react";
import { Link } from "react-router-dom";

import Product, {
  ProductImage,
  Price,
} from "../../../components/Products/Product";
import { TProduct } from "../../../redux/products/product.types";
import classes from "../../../styles/pages/Products/ProductList.module.css";

type ProductListProps = {
  products?: TProduct[];
  isGridLayout: boolean;
};

const MemoizedProductImage = memo(ProductImage);

const ProductList = ({ isGridLayout, products }: ProductListProps) => {
  return (
    <Product isGridLayout={isGridLayout}>
      {products?.map((product) => {
        return (
          <Link key={product.id} to={`/product/${product.id}`}>
            <Product.Wrapper className={classes["product-wrapper"]}>
              <MemoizedProductImage
                src={product.thumbnail}
                alt={product.title}
                variant="variant-2"
                className={classes["product-image"]}
              />
              <Product.BodyWrapper>
                <Product.Title>{product.title}</Product.Title>
                {!isGridLayout && (
                  <Product.Description>
                    {product.description}
                  </Product.Description>
                )}

                <Price
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
