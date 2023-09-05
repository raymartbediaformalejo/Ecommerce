import ListViewIcon from "../../../assets/icons/Listview.svg";
import GridViewIcon from "../../../assets/icons/grid view.svg";
import FilterIcon from "../../../assets/icons/Filter.svg";
import DownArrowIcon from "../../../assets/icons/Downfilled.svg";
import classes from "../../../styles/pages/Products/ProductFilter.module.css";
const ProductFilter = () => {
  return (
    <div className={classes["filter-container"]}>
      <p className={classes["title-search-result"]}>8 results of dress</p>
      <div className={classes["filter-actions-wrapper"]}>
        <button className={`${classes.button} ${classes["sort-button"]}`}>
          <p>Price low to high</p>
          <img src={DownArrowIcon} alt="Down arrow icon" />
        </button>

        <button
          className={`${classes.button} ${classes["view-layout-button"]}`}
        >
          <img src={ListViewIcon} alt="List view icon" />
        </button>

        <button className={`${classes.button} ${classes["filter-button"]}`}>
          <picture>
            <img src={FilterIcon} alt="Filter icon" />
          </picture>
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
