import { useState, useEffect } from "react";

import logo from "../../assets/logo-open-fashion.svg";

import searchIcon from "../../assets/icons/Search.svg";
import cartIcon from "../../assets/icons/shopping bag.svg";
import classes from "../../styles/components/Layout/Header.module.css";
import Menu from "../ui/Menu";
import SidebarNavigation from "../Navigations/SidebarNavigation";
const Header = () => {
  const [isActiveMenu, setIsActiveMenu] = useState(false);

  const toggleMenu = (isOpen: boolean) => {
    setIsActiveMenu(isOpen);
  };

  useEffect(() => {
    // Disable scrolling when isActiveMenu is true
    if (isActiveMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isActiveMenu]);
  return (
    <header className={classes["header-container"]}>
      <Menu toggleMenu={toggleMenu} />
      <SidebarNavigation isActiveMenu={isActiveMenu} />

      {/* <img src={menuIcon} alt="Menu" /> */}
      <div className={classes.logo}>
        <img src={logo} alt="Open Fashion Logo" />
      </div>
      <div className={classes["header-container__container-right-icons"]}>
        <div className="search">
          <img src={searchIcon} alt="Search" />
        </div>
        <div className="cart">
          <img src={cartIcon} alt="Cart" />
        </div>
      </div>
    </header>
  );
};

export default Header;
