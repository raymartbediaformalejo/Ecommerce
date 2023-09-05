import classes from "../../styles/components/Loading/Loading.module.css";

const Loading = () => {
  return (
    <div className={classes["loading-container"]}>
      <div className={classes.loading}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loading;
