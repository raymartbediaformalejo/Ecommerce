import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { authSlice } from "../auth/auth.slice";
import { productSlice } from "../products/product.slice";
import { cartSlice } from "../cart/cart.slice";
import { checkoutSlice } from "../checkout/checkout.slice";

const AllActions = {
  ...authSlice.actions,
  ...productSlice.actions,
  ...cartSlice.actions,
  ...checkoutSlice.actions,
};

const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(AllActions, dispatch);
};

export default useActions;
