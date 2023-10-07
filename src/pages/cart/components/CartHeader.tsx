import { useState } from "react";
import deleteIcon from "../../../assets/icons/delete2.svg";
import classes from "../../../styles/pages/cart/CartHeader.module.css";
import Modal from "../../../components/ui/Modal/Modal";

type TCartHeaderProps = {
  totalCartItems: number;
  selectedCartItem: number[];
};

const CartHeader = ({ totalCartItems, selectedCartItem }: TCartHeaderProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleCloseModal = () => {
    setIsOpenModal((prev) => !prev);
  };
  return (
    <div className={classes["cart-header"]}>
      <h3 className={classes["title"]}>
        Cart <span>{`(${totalCartItems})`}</span>
      </h3>
      {selectedCartItem.length > 0 && (
        <button onClick={handleCloseModal} className={classes["delete"]}>
          <img src={deleteIcon} />
        </button>
      )}
      <Modal isOpened={isOpenModal} onClose={handleCloseModal}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium
        quia ipsa ad.
      </Modal>
    </div>
  );
};

export default CartHeader;
