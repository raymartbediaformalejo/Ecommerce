import { TVarietiesProduct } from "../../../types/TProducts";
import classes from "../../../styles/pages/cart/CartItemVariation.module.css";
import { useCapitalizeText } from "../../../hooks/useCapitalizeText";

type TCartItemVariationProps = React.HTMLAttributes<HTMLParagraphElement> & {
  variation: TVarietiesProduct;
};

const CartItemVariation = ({
  variation,
  className,
}: TCartItemVariationProps) => {
  const { setText } = useCapitalizeText();
  return (
    <p
      className={`${className ? className : ""} ${
        classes["cart-item-variation"]
      }`}
    >
      Variation:
      <span>
        {variation &&
          Object.entries(variation)
            .filter(([key, _]) => key !== "quantity")
            .map(([_, variety]) => setText(variety))
            .filter((variety) => variety.length > 0)
            .join(", ")}
      </span>
    </p>
  );
};

export default CartItemVariation;
