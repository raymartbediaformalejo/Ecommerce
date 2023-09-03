import logo from "../../../assets/Logo-big.svg";
import sticker5 from "../../../assets/Miroodles Sticker.png";
import sticker6 from "../../../assets/Miroodles Sticker2.png";
import sticker7 from "../../../assets/Miroodles Sticker3.png";
import sticker8 from "../../../assets/Miroodles Sticker4.png";
import classes from "../../../styles/components/home/OpenFashion.module.css";
import Divider from "../../../components/ui/Divider";
import snake from "../../../assets/icons/snake.svg";
const OpenFashion = () => {
  return (
    <section className={classes["open-fashion-container"]}>
      <img className={classes.logo} src={logo} alt="Logo" />
      <p className={classes["description"]}>
        Making a luxurious lifestyle accessible for a generous group of men and
        women is our daily drive.
      </p>
      <Divider />
      <div className={classes["service-wrapper"]}>
        <div>
          <img src={sticker5} alt="Fast shipping" />
          <p>Fast shipping. Free on orders over $25.</p>
        </div>
        <div>
          <img src={sticker6} alt="Sustainable process" />
          <p>Sustainable process from start to finish.</p>
        </div>
        <div>
          <img src={sticker7} alt="Unique designs" />
          <p>Unique designs and high-quality materials.</p>
        </div>
        <div>
          <img src={sticker8} alt="Quality product" />
          <p>Fast shipping. Free on orders over $25.</p>
        </div>
      </div>
      <img src={snake} alt="bottom icon design" />
    </section>
  );
};

export default OpenFashion;
