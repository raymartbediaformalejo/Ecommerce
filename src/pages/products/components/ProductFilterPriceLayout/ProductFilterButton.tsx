import React from "react";

import FilterIcon from "../../../../assets/icons/Filter.svg";
import Button from "../../../../components/ui/Button";

type ProductFilterButtonProps = {
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProductFilterButton = ({ setIsFilterOpen }: ProductFilterButtonProps) => {
  return (
    <Button variant="icon" onClick={() => setIsFilterOpen((prev) => !prev)}>
      <img src={FilterIcon} />
    </Button>
  );
};

export default ProductFilterButton;
