import CollectionImage1 from "../../../assets/collectionImage1.png";
import CollectionImage2 from "../../../assets/collectionImage2.png";
import CollectionImage3 from "../../../assets/CollectionImage3.png";
import classes from "../../../styles/components/home/Collections.module.css";
const Collections = () => {
  return (
    <section className={classes["collection-container"]}>
      <h3 className={`title ${classes["title-collection"]}`}>Collections</h3>
      <div className={classes["collection-item-wrapper"]}>
        <h4
          className={`${classes["collection-item-title"]} ${classes["october-collection-title"]}`}
        >
          October
          <span className={classes["october-collection-title__date"]}>10</span>
          <span>Collection</span>
        </h4>

        <img
          className={classes["collection-item-bg-image"]}
          src={CollectionImage1}
          alt="Collection"
        />
      </div>

      <div
        className={`${classes["collection-item-wrapper"]} ${classes["autumn-collection-wrapper"]}`}
      >
        <h4
          className={`${classes["collection-item-title"]} ${classes["autumn-collection-title"]}`}
        >
          Autumn
          <span>Collection</span>
        </h4>

        <img
          className={classes["collection-item-bg-image"]}
          src={CollectionImage2}
          alt="Collection"
        />
      </div>

      <div className={classes["collection-item-wrapper"]}>
        <h4
          className={`${classes["collection-item-title"]} ${classes["spring-collection-title"]}`}
        >
          Spring
          <span>Collection</span>
        </h4>
        <img
          className={classes["collection-item-bg-image"]}
          src={CollectionImage3}
          alt="Collection"
        />
      </div>
    </section>
  );
};

export default Collections;
