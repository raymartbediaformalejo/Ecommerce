import { SetURLSearchParams } from "react-router-dom";

import Button from "../../../../components/ui/Button";
import UpIcon from "../../../../assets/icons/up2.svg";
import classes from "../../../../styles/pages/Products/SortByPrice.module.css";

type TSortByPriceProps = {
  sortByPriceLowToHigh: boolean;
  setSearchParams: SetURLSearchParams;
};
const SortByPrice = ({
  sortByPriceLowToHigh,
  setSearchParams,
}: TSortByPriceProps) => {
  const handleSortByPriceToggle = () => {
    const isSortByPriceLowToHighString = !sortByPriceLowToHigh;
    setSearchParams((prev) => {
      prev.set("sortByPriceLowToHigh", String(isSortByPriceLowToHighString));
      return prev;
    });
  };

  return (
    <Button
      variant="chip"
      textTransform="capitalize"
      className={`${classes["sort-by-price"]} ${
        sortByPriceLowToHigh ? classes["low-to-high"] : ""
      }`}
      onClick={handleSortByPriceToggle}
    >
      Price
      <img src={UpIcon} />
    </Button>
  );
};

export default SortByPrice;
