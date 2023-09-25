import { useAppDispatch, useAppSelector } from "../../../../redux";
import ListViewIcon from "../../../../assets/icons/Listview.svg";
import GridViewIcon from "../../../../assets/icons/grid view.svg";
import Button from "../../../../components/ui/Button";
import { setIsGridLayout } from "../../../../redux/ui/ProductFilter/productsFilter.slice";

const ProductLayout = () => {
  const dispatch = useAppDispatch();
  const isGridLayout = useAppSelector((state) => state.filter.isGridLayout);
  const handleProductLayoutToggle = () => {
    dispatch(setIsGridLayout(!isGridLayout));
  };
  return (
    <Button variant="icon" onClick={handleProductLayoutToggle}>
      <img src={isGridLayout ? ListViewIcon : GridViewIcon} />
    </Button>
  );
};

export default ProductLayout;
