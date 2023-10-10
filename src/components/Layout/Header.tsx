import { useState } from "react";

import logo from "../../assets/logo-open-fashion.svg";
import searchIcon from "../../assets/icons/Search.svg";
import cartIcon from "../../assets/icons/shopping bag.svg";
import profileIcon from "../../assets/icons/profile2.svg";
import Menu from "../ui/Menu";
import SidebarNavigation from "../Navigations/SidebarNavigation";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import classes from "../../styles/components/Layout/Header.module.css";
import { SearchIcon } from "../icons/SearchIcon";
import { CartIcon } from "../icons/CartIcon";
import { ProfileIcon } from "../icons/ProfileIcon";

const Header = () => {
  const cartItems = useAppSelector((state) => state.cart.products);
  const totalCartItems = cartItems.reduce((prevValue, currentValue) => {
    return prevValue + currentValue.quantity;
  }, 0);
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const pathname = useLocation().pathname;
  const isDarkNav = pathname !== "/";

  const toggleMenu = (isOpen: boolean) => {
    setIsActiveMenu(isOpen);
  };

  return (
    <header
      className={`${classes["header-container"]} ${
        isDarkNav ? classes.light : ""
      }`}
    >
      <Menu toggleMenu={toggleMenu} />
      <SidebarNavigation isActiveMenu={isActiveMenu} />
      <Link to="/" className={classes.logo}>
        <img src={logo} alt="Open Fashion Logo" />
      </Link>

      <div className={classes["header-container__container-right-icons"]}>
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
                <p
                  className={classes["cart-badge"]}
                  style={
                    totalCartItems > 10
                      ? { width: "20px", borderRadius: "49%" }
                      : {}
                  }
                >
                  {totalCartItems}
                </p>
              )}
            </div>
          </Link>
        )}
        <Link to={"/profile"}>
          <div className={classes["cart-icon"]}>
            <ProfileIcon />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
