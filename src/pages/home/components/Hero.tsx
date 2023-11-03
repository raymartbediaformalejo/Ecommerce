import { Link } from "react-router-dom";
import backgroundImage from "../../../assets/hero-img-model.png";
import classes from "../../../styles/components/home/Hero.module.css";

const Hero = () => {
  return (
    <section className={` ${classes["hero-container"]}`}>
      <img className={classes["background-image"]} src={backgroundImage} />
      <div className={`container ${classes["hero-content"]}`}>
        <h1 className={classes.title}>Luxury fashion & Accessories</h1>
        <Link to="/products" className={classes.button}>
          <button>Explore collection</button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
