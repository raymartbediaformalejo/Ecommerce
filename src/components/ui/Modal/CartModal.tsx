import Button from "../Button";
import Modal from "../Modal/Modal";
import { useAppDispatch } from "../../../redux/hooks/useAppDispatch";
import classes from "../../../styles/components/ui/Modal/CartModal.module.css";
import { deleteCartItems } from "../../../redux/cart/cart.slice";
import { useAppSelector } from "../../../redux/hooks/useAppSelector";
import { SetURLSearchParams } from "react-router-dom";
import { cartParams } from "../../../utils/productConstant";

type TCartModal = {
  title?: string;
  isOpened: boolean;
  onClose: () => void;
  selectedItem: number[];
  setSearchParams: SetURLSearchParams;
  totalItemSelected: number;
};

const CartModal = ({
  title,
  isOpened,
  onClose,
  selectedItem,
  setSearchParams,
  totalItemSelected,
}: TCartModal) => {
  const dispatch = useAppDispatch();
  const currentCartItems = useAppSelector((state) => state.cart.products);

  const handleDeleteCartItems = () => {
    if (currentCartItems) {
      dispatch(deleteCartItems(selectedItem));
    }
    onClose();
    setSearchParams((prev) => {
      prev.delete(cartParams.product);
      prev.delete(cartParams.subtotal);
      prev.delete(cartParams.totalDiscount);
      return prev;
    });
  };

  return (
    <Modal
      title={title}
      isOpened={isOpened}
      onClose={onClose}
      className={classes["cart-modal"]}
    >
      <p
        className={classes["body-text"]}
      >{`Are you sure your want to delete this ${totalItemSelected}  item(s) from cart?`}</p>
      <div className={classes["buttons"]}>
        <Button size="large" onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button size="large" onClick={handleDeleteCartItems}>
          Remove
        </Button>
      </div>
    </Modal>
  );
};

export default CartModal;
