import backgroundImage from "../../../assets/hero-image.png";
import classes from "../../../styles/components/home/Hero.module.css";

const Hero = () => {
  return (
    <section className={classes["hero-container"]}>
      <img className={classes["background-image"]} src={backgroundImage} />
      <h1 className={classes.title}>
        <span>Luxury</span> <span>fashion</span> <span>& Accessories</span>
      </h1>
      <button className={classes.button}>Explore collection</button>
    </section>
  );
};

export default Hero;
