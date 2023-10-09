import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { authSlice } from "../auth/auth.slice";
import { productSlice } from "../products/product.slice";
import { cartSlice } from "../cart/cart.slice";

const allActions = {
  ...authSlice.actions,
  ...productSlice.actions,
  ...cartSlice.actions,
};

const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(allActions, dispatch);
};

export default useActions;
