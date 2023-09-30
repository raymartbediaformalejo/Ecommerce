import { useState } from "react";

import logo from "../../assets/logo-open-fashion.svg";

import searchIcon from "../../assets/icons/Search.svg";
import cartIcon from "../../assets/icons/shopping bag.svg";
import classes from "../../styles/components/Layout/Header.module.css";
import Menu from "../ui/Menu";
import SidebarNavigation from "../Navigations/SidebarNavigation";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const pathname = useLocation().pathname;
  const isLight =
    pathname === "/search" ||
    pathname === "/products" ||
    pathname.includes("/product");

  const toggleMenu = (isOpen: boolean) => {
    setIsActiveMenu(isOpen);
  };

  return (
    <header
      className={`${classes["header-container"]} ${
        isLight ? classes.light : ""
      }`}
    >
      <Menu toggleMenu={toggleMenu} />
      <SidebarNavigation isActiveMenu={isActiveMenu} />

      {/* <img src={menuIcon} alt="Menu" /> */}
      <Link to={"/"} className={classes.logo}>
        <img src={logo} alt="Open Fashion Logo" />
      </Link>
      <div className={classes["header-container__container-right-icons"]}>
        {pathname !== "/search" && (
          <Link to={"/search"} className="search">
            <img src={searchIcon} alt="Search" />
          </Link>
        )}
        <div className="cart">
          <img src={cartIcon} alt="Cart" />
        </div>
      </div>
    </header>
  );
};

export default Header;
