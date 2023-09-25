import { useAppDispatch, useAppSelector } from "../../../../redux";
import Button from "../../../../components/ui/Button";
import UpIcon from "../../../../assets/icons/up2.svg";
import classes from "../../../../styles/pages/Products/SortByPrice.module.css";
import { setSortByPriceLowToHigh } from "../../../../redux/ui/ProductFilter/productsFilter.slice";

const SortByPrice = () => {
  const dispatch = useAppDispatch();
  const isPriceLowToHigh = useAppSelector(
    (state) => state.filter.sortByPriceLowToHigh
  );
  const handleSortByPriceToggle = () => {
    dispatch(setSortByPriceLowToHigh(!isPriceLowToHigh));
  };

  return (
    <Button
      variant="chip"
      textTransform="capitalize"
      className={`${classes["sort-by-price"]} ${
        isPriceLowToHigh ? classes["low-to-high"] : ""
      }`}
      onClick={handleSortByPriceToggle}
    >
      Price
      <img src={UpIcon} />
    </Button>
  );
};

export default SortByPrice;
