import { useState } from "react";
import deleteIcon from "../../../assets/icons/delete3.svg";
import classes from "../../../styles/pages/cart/CartHeader.module.css";
import CartModal from "../../../components/ui/Modal/CartModal";
import { SetURLSearchParams } from "react-router-dom";
import { DeleteIcon } from "../../../components/icons/DeleteIcon";

type TCartHeaderProps = {
  totalCartItems: number;
  selectedCartItem: number[];
  setSearchParams: SetURLSearchParams;
  totalItemSelected: number;
};

const CartHeader = ({
  totalCartItems,
  selectedCartItem,
  setSearchParams,
  totalItemSelected,
}: TCartHeaderProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleCloseModal = () => {
    setIsOpenModal((prev) => !prev);
  };
  console.log("selectedCartItem", selectedCartItem);

  return (
    <div className={classes["cart-header"]}>
      <h3 className={classes["title"]}>
        Cart <span>{`(${totalCartItems})`}</span>
      </h3>
      {selectedCartItem.length > 0 && (
        <button onClick={handleCloseModal} className={classes["delete"]}>
          <DeleteIcon />
          {/* <img src={deleteIcon} /> */}
        </button>
      )}
      <CartModal
        title="Confirm to delete?"
        totalItemSelected={totalItemSelected}
        selectedItem={selectedCartItem}
        setSearchParams={setSearchParams}
        isOpened={isOpenModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default CartHeader;
