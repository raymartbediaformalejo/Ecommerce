import YouTube from "../../assets/icons/YouTube.svg";
import Instagram from "../../assets/icons/Instagram.svg";
import Twitter from "../../assets/icons/Twitter.svg";
import classes from "../../styles/components/Layout/Footer.module.css";
import Divider from "../ui/Divider";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const currentYear = new Date().getFullYear();
  return (
    <footer className={classes.footer}>
      <div className={classes["socials-container"]}>
        <img src={Twitter} alt="Twitter" />
        <img src={Instagram} alt="Instagram" />
        <img src={YouTube} alt="YouTube" />
      </div>

      <Divider />

      <div className={classes["contact-info-wrapper"]}>
        <p>openui.ui@gmail.com</p>
        <p>
          <a href="tel:+60825876">+60 825 876</a>
        </p>
      </div>

      <Divider />
      <div className={classes["shortcut-container"]}>
        <a href="#">About</a>
        <a href="#">Contact</a>
        <a href="#">Blog</a>
      </div>

      <div className={classes["copyright-container"]}>
        <p>
          Copyright&copy;<span>{currentYear}</span>OpenUI. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
