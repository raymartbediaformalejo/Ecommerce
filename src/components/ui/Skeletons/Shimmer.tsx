import classes from "../../../styles/components/ui/Skeletons/SkeletonElement.module.css";
const Shimmer = () => {
  return (
    <div className={classes["shimmer-wrapper"]}>
      <div className={classes.shimmer}></div>
    </div>
  );
};

export default Shimmer;
