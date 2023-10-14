import Product, { ProductImage } from "../../../components/Products/Product";
import { TSelectedCart } from "../../../redux/cart/cart.types";
import { TProduct, TVarietiesProduct } from "../../../types/TProducts";
import CartItemVariation from "../../cart/components/CartItemVariation";
import { extractIdFromText } from "../../../utils/extractId";
import calculateDiscountedPrice from "../../../utils/discountedPrice";
import { TDiscountedPrice } from "../../../utils/discountedPrice";
import classes from "../../../styles/pages/checkout/OrderSummary.module.css";

type TOrderSummary = {
  productParamObjects: TSelectedCart[];
  products?: TProduct[];
};

type TProductItemPrice = TDiscountedPrice & { id: number };

const OrderSummary = ({ products, productParamObjects }: TOrderSummary) => {
  const getProductVariation = (id: number) => {
    const variaton = productParamObjects.find(
      (product) => extractIdFromText(product.id) === id
    )?.variation;

    return variaton as TVarietiesProduct;
  };

  const getProductQuantity = (id: number) => {
    const quantity = productParamObjects.find(
      (product) => extractIdFromText(product.id) === id
    )?.quantity;

    return quantity as number;
  };

  const calculateProductItemPrice = ({
    id,
    price,
    discountPercentage,
  }: TProductItemPrice) => {
    const quantity = getProductQuantity(id);
    const discountedPrice = calculateDiscountedPrice({
      price,
      discountPercentage,
    });
    const totalprice = quantity * discountedPrice;
    return totalprice;
  };

  return (
    <div className={classes["order-summary"]}>
      <Product isGridLayout={false} variants="variant-3">
        {products?.map((product) => (
          <Product.Wrapper key={product.id}>
            <div className={classes["product-item-card"]}>
              <ProductImage
                src={product.thumbnail}
                alt={product.title}
                variant="variant-2"
                className={classes["product-image"]}
              />
              <Product.BodyWrapper>
                <Product.Title>{product.title}</Product.Title>
                <CartItemVariation
                  className={classes["variation"]}
                  variation={getProductVariation(product.id)}
                />
                <div className={classes["price"]}>
                  <Product.Price
                    price={product.price}
                    discountPercentage={product.discountPercentage}
                  />
                </div>
              </Product.BodyWrapper>
            </div>
            <p className={classes["quantity"]}>
              <span>X</span>
              {getProductQuantity(product.id)}
            </p>
            <div className={classes["product-item-subtotal"]}>
              <Product.Price
                price={calculateProductItemPrice({
                  id: product.id,
                  price: product.price,
                  discountPercentage: product.discountPercentage,
                })}
              />
            </div>
          </Product.Wrapper>
        ))}
      </Product>
    </div>
  );
};

export default OrderSummary;
