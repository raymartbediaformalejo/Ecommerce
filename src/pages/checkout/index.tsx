import { useSearchParams } from "react-router-dom";

import classes from "../../styles/pages/checkout/Checkout.module.css";
import { cartParams } from "../../utils/productConstant";
import OrderSummary from "./components/OrderSummary";
import { TSelectedCart } from "../../redux/cart/cart.types";
import { extractIdFromURLParam } from "../../utils/extractId";
import { useGetAllProductsQuery } from "../../redux/products/products.api";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const productParamString = searchParams.get(cartParams.product) || "[]";
  const productParamObjects: TSelectedCart[] = JSON.parse(
    decodeURIComponent(productParamString as string)
  );
  const { data: products } = useGetAllProductsQuery({
    ids: extractIdFromURLParam(productParamObjects),
  });

  console.log(products);

  return (
    <div className={`container ${classes["checkout"]}`}>
      <OrderSummary
        products={products?.products}
        productParamObjects={productParamObjects}
      />
    </div>
  );
};

export default Checkout;
