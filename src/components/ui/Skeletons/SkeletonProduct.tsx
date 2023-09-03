import SkeletonElement from "./SkeletonElement";
import classes from "../../../styles/components/ui/Skeletons/SkeletonElement.module.css";
import Shimmer from "./Shimmer";

type SkeletonProductProps = {
  repeat?: number;
};

const SkeletonProduct = ({ repeat = 1 }: SkeletonProductProps) => {
  const skeletonWrappers = Array.from({ length: repeat }, (_, index) => (
    <div className={classes["skeleton-wrapper"]} key={index}>
      <div>
        <SkeletonElement type="thumbnail" />
        <SkeletonElement type="title" />
        <SkeletonElement type="price" />
        <SkeletonElement type="rating" />
      </div>
      <Shimmer />
    </div>
  ));

  return <>{skeletonWrappers}</>;
};

export default SkeletonProduct;
