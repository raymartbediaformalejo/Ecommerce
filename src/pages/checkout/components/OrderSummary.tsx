import Product, { ProductImage } from "../../../components/Products/Product";
import { TSelectedCart } from "../../../redux/cart/cart.types";
import { TProduct, TVarietiesProduct } from "../../../types/TProducts";
import CartItemVariation from "../../cart/components/CartItemVariation";
import { extractIdFromText } from "../../../utils/extractId";

type TOrderSummary = {
  productParamObjects: TSelectedCart[];
  products?: TProduct[];
};
const OrderSummary = ({ products, productParamObjects }: TOrderSummary) => {
  const getProductVariation = (id: number) => {
    const variaton = productParamObjects.find(
      (product) => extractIdFromText(product.id) === id
    )?.variation;

    return variaton as TVarietiesProduct;
  };
  return (
    <div>
      <Product>
        {products?.map((product) => (
          <Product.Wrapper key={product.id}>
            <ProductImage src={product.thumbnail} alt={product.title} />
            <Product.BodyWrapper>
              <Product.Title>{product.title}</Product.Title>
              <CartItemVariation variation={getProductVariation(product.id)} />
            </Product.BodyWrapper>
          </Product.Wrapper>
        ))}
      </Product>
    </div>
  );
};

export default OrderSummary;
