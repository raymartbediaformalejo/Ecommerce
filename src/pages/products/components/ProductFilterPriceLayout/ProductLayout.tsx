import { SetURLSearchParams } from "react-router-dom";

import ListViewIcon from "../../../../assets/icons/Listview.svg";
import GridViewIcon from "../../../../assets/icons/grid view.svg";
import Button from "../../../../components/ui/Button";

type TProductLayouteProps = {
  isGridLayout: boolean;
  setSearchParams: SetURLSearchParams;
};
const ProductLayout = ({
  isGridLayout,
  setSearchParams,
}: TProductLayouteProps) => {
  const handleProductLayoutToggle = () => {
    const isGridLayoutString = String(!isGridLayout);
    setSearchParams((prev) => {
      prev.set("isGridLayout", isGridLayoutString);
      return prev;
    });
    // dispatch(setIsGridLayout(!isGridLayout));
  };
  return (
    <Button variant="icon" onClick={handleProductLayoutToggle}>
      <img src={isGridLayout ? ListViewIcon : GridViewIcon} />
    </Button>
  );
};

export default ProductLayout;
