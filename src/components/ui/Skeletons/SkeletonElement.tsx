import classes from "../../../styles/components/ui/Skeletons/SkeletonElement.module.css";
import Shimmer from "./Shimmer";
type SkeletonProps = {
  type: string;
  variant?: string;
};
const SkeletonElement = ({ type, variant }: SkeletonProps) => {
 
  const content =
    type === "thumbnail" ? (
      <div className={classes["thumbnail-container"]}>
        <div>
          <div className={`${classes.skeleton} ${classes[type]}`}></div>
        </div>
        <Shimmer />
      </div>
    ) : type === "thumbnail" && variant === "variant-2" ? (
      <div className={classes["thumbnail-container"]}>
        <div>
          <div
            className={`${classes.skeleton} ${classes[type]} ${variant}`}
          ></div>
        </div>
        <Shimmer />
      </div>
    ) : (
      <div className={`${classes.skeleton} ${classes[type]}`}></div>
    );

  return <>{content}</>;
};

export default SkeletonElement;
