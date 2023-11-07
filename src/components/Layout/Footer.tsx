import { Link } from "react-router-dom";

import logo from "../../assets/logo-open-fashion-light.png";
import { YoutubeIcon } from "../icons/Youtube";
import { FacebookIcon } from "../icons/Facebook";
import { InstagramIcon } from "../icons/Instagram";
import classes from "../../styles/components/Layout/Footer.module.css";
import Divider from "../ui/Divider";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

type TFooter = {
  isCheckout: boolean;
};

const smallScreen = 640;
const Footer = ({ isCheckout }: TFooter) => {
  const { width } = useWindowDimensions();
  const currentYear = new Date().getFullYear();
  const isSmallScreen = width <= smallScreen;
  return (
    <>
      {isCheckout && (
        <footer className={classes["checkout-footer"]}>
          <div className={`${classes["checkout-footer-wrapper"]}`}>
            <button
              type="button"
              className={classes["checkout-footer__button"]}
            >
              <span>Refund policy</span>
            </button>
            <button
              type="button"
              className={classes["checkout-footer__button"]}
            >
              <span>Shipping policy</span>{" "}
            </button>
            <button
              type="button"
              className={classes["checkout-footer__button"]}
            >
              <span>Privacy policy</span>{" "}
            </button>
            <button
              type="button"
              className={classes["checkout-footer__button"]}
            >
              <span>Terms of service</span>{" "}
            </button>
          </div>
        </footer>
      )}
      {!isCheckout && (
        <footer className={classes["footer"]}>
          <div className={`container ${classes["footer-container"]}`}>
            <div className={classes["logo"]}>
              <Link to="#">
                <img src={logo} alt="Logo of Open UI ecommerce" />
              </Link>
            </div>

            <div className={classes["socials-container"]}>
              {!isSmallScreen && (
                <h2 className={classes["title-link"]}>Socials</h2>
              )}
              <Link to="/">
                <FacebookIcon />
                {!isSmallScreen && (
                  <p className={classes["social-title"]}>Facebook</p>
                )}
              </Link>
              <Link to="/">
                <InstagramIcon />
                {!isSmallScreen && (
                  <p className={classes["social-title"]}>Instagram</p>
                )}
              </Link>
              <Link to="/">
                <YoutubeIcon />
                {!isSmallScreen && (
                  <p className={classes["social-title"]}>YouTube</p>
                )}
              </Link>
            </div>
            {isSmallScreen && <Divider />}

            <div className={classes["contact-info-wrapper"]}>
              <p className={classes["contact-email"]}>openui.ui@gmail.com</p>
              <p className={classes["contact-phone"]}>
                <Link to="tel:+60825876">+60 825 876</Link>
              </p>
            </div>

            {isSmallScreen && <Divider />}
            <div className={classes["shortcut-container"]}>
              <Link className={classes["title-link"]} to="#">
                About
              </Link>
              <Link className={classes["title-link"]} to="#">
                Contact
              </Link>
              <Link className={classes["title-link"]} to="#">
                Blog
              </Link>
            </div>
          </div>

          <div className={classes["copyright-container"]}>
            <p>
              Copyright&copy;<span>{currentYear}</span>Raymart Formalejo. All
              Rights Reserved.
            </p>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
