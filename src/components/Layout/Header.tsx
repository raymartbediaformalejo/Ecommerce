import { useState, useRef } from "react";

import logo from "../../assets/logo-open-fashion.svg";
import logoLarge from "../../assets/logo-large-scree2.png";
import Menu from "../ui/Menu";
import SidebarNavigation from "../Navigations/SidebarNavigation";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import classes from "../../styles/components/Layout/Header.module.css";
import { SearchIcon } from "../icons/SearchIcon";
import { CartIcon } from "../icons/CartIcon";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { ProfileIcon } from "../icons/ProfileIcon";
const isHoverIsInHeader = (e: MouseEvent, element: HTMLElement) => {
  const r = element.getBoundingClientRect();
  return (
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom
  );
};
const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const cartItems = useAppSelector((state) => state.cart.products);
  const totalCartItems = cartItems.reduce((prevValue, currentValue) => {
    return prevValue + currentValue.quantity;
  }, 0);
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const pathname = useLocation().pathname;
  const isDarkNav = pathname !== "/";
  const { width: screenWidth } = useWindowDimensions();
  const largeScreen = 700;
  const isSmallScreen = screenWidth < largeScreen;
  const [isInHeader, setIsInHeader] = useState(false);

  const toggleMenu = (isOpen: boolean) => {
    setIsActiveMenu(isOpen);
  };

  const handleMouseEnter = () => {
    setIsInHeader(true);
  };

  const handlerMouseLeave = () => {
    setIsInHeader(false);
  };

  return (
    <div
      ref={headerRef}
      className={classes["section-header"]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handlerMouseLeave}
    >
      <header
        className={`${classes["header"]} ${
          !isInHeader ? classes["transparent"] : ""
        } ${isDarkNav ? classes.light : ""}  `}
      >
        <div className={`container ${classes["header-container"]}`}>
          <div className={classes["header-container__container-left"]}>
            {isSmallScreen && <Menu toggleMenu={toggleMenu} />}

            <SidebarNavigation
              isActiveMenu={isActiveMenu}
              isSmallScreen={isSmallScreen}
              isInHeader={isInHeader}
            />
            {!isSmallScreen && <button>PHP</button>}
          </div>

          <Link to="/" className={classes.logo}>
            <picture>
              <source media="(min-width: 700px)" srcSet={logoLarge} />
              <img src={logo} alt="Open Fashion Logo" />
            </picture>
          </Link>
          <div className={classes["header-container__container-right-icons"]}>
            {!isSmallScreen && (
              <Link to={"/profile"}>
                <div className={classes["cart-icon"]}>
                  <ProfileIcon />
                </div>
              </Link>
            )}
            {pathname !== "/search" && (
              <Link to="/search" className="search">
                <SearchIcon />
              </Link>
            )}
            {pathname !== "/cart" && (
              <Link to="/cart" className="cart">
                <div className={classes["cart-icon"]}>
                  <CartIcon />
                  {totalCartItems > 0 && (
                    <div className={classes["cart-badge"]}>
                      <p>{totalCartItems}</p>
                    </div>
                  )}
                </div>
              </Link>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
