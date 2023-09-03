import Divider from "../../../components/ui/Divider";
import Prada from "../../../assets/icons/brands/Prada.svg";
import Burberry from "../../../assets/icons/brands/Burberry.svg";
import Boss from "../../../assets/icons/brands/Boss.svg";
import Catier from "../../../assets/icons/brands/Catier.svg";
import Gucci from "../../../assets/icons/brands/Gucci.svg";
import Tiffany from "../../../assets/icons/brands/Tiffany & Co.svg";
import classes from "../../../styles/components/home/Brands.module.css";
const Brands = () => {
  return (
    <section className={classes["brand-section-container"]}>
      <Divider />
      <div className={classes["brand-container"]}>
        <img className={classes.brand} src={Prada} alt="Prada" />
        <img className={classes.brand} src={Burberry} alt="Burberry" />
        <img className={classes.brand} src={Boss} alt="Boss" />
        <img className={classes.brand} src={Catier} alt="Catier" />
        <img className={classes.brand} src={Gucci} alt="Gucci" />
        <img className={classes.brand} src={Tiffany} alt="Tiffany" />
      </div>
      <Divider />
    </section>
  );
};

export default Brands;
