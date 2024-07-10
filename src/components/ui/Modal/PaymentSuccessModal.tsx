import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import classes from "../../../styles/components/ui/Modal/PaymentSuccess.module.css";
import Modal from "./Modal";
import Button from "../Button";
import generateRandomProductId from "../../../utils/generateRandomProductId";
import EmojiIcons from "../../icons/EmojiIcons";
import SuccessIcon from "../../icons/SuccessIcon";
import Divider from "../Divider";

type TPaymentSuccessModalProps = {
  isOpened: boolean;
  onClose: () => void;
};

const EMOJIS = {
  DISAPOINTED: "disapointed",
  HAPPY: "happy",
  LOVE: "love",
};

const PaymentSuccessModal = ({
  isOpened,
  onClose,
}: TPaymentSuccessModalProps) => {
  const navigate = useNavigate();
  const [purchaseRate, setPurchaseRate] = useState<string | null>(null);

  const productId = useMemo(() => {
    return generateRandomProductId();
  }, []);

  const handleGoHomePage = () => {
    onClose();
    navigate("/");
  };

  const handleRatePurchase = (rate: string) => {
    if (purchaseRate === rate) {
      setPurchaseRate(null);
    } else {
      setPurchaseRate(rate);
    }
  };

  return (
    <Modal
      title="Payment Success"
      isOpened={isOpened}
      onClose={handleGoHomePage}
      className={classes["payment-success-modal"]}
    >
      <div className={classes["payment-success-modal__body"]}>
        <SuccessIcon />
        <div className={classes["description"]}>
          <p className={classes["sub-title"]}>Your payment was successful</p>
          <p className={classes["payment-id"]}>{`Payment ID: ${productId}`}</p>
        </div>
        <Divider />
        <div className={classes["rate-your-purchase"]}>
          <p className={classes["rate-title"]}>Rate your purchase</p>
          <div className={classes["rate-your-purchase__emojis"]}>
            {Object.entries(EMOJIS).map(([key, value]) => (
              <button key={key} onClick={() => handleRatePurchase(value)}>
                <EmojiIcons emoji={value} selected={purchaseRate} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={classes["buttons"]}>
        <Button
          size="large"
          disabled={!purchaseRate}
          onClick={handleGoHomePage}
        >
          Submit
        </Button>
        <Button size="large" onClick={handleGoHomePage} variant="outlined">
          Back to home
        </Button>
      </div>
    </Modal>
  );
};

export default PaymentSuccessModal;
