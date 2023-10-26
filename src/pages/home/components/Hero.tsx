import { Link } from "react-router-dom";
import backgroundImage from "../../../assets/hero-image.png";
import classes from "../../../styles/components/home/Hero.module.css";

const Hero = () => {
  return (
    <section className={classes["hero-container"]}>
      <img className={classes["background-image"]} src={backgroundImage} />
      <div>
        <h1 className={classes.title}>
          <span>Luxury</span> <span>fashion</span> <span>& Accessories</span>
        </h1>
        <Link to="/products" className={classes.button}>
          <button>Explore collection</button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
