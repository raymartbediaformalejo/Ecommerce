import { useState, useRef, useEffect, useMemo, memo } from "react";
import { Link, useLocation } from "react-router-dom";

import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import logo from "../../assets/logo-open-fashion.svg";
import logoLarge from "../../assets/logo-large-scree2.png";
import Menu from "../ui/Menu";
import SidebarNavigation from "../Navigations/SidebarNavigation";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import classes from "../../styles/components/Layout/Header.module.css";
import { SearchIcon } from "../icons/SearchIcon";
import { CartIcon } from "../icons/CartIcon";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { currencies } from "../../utils/productConstant";
import { ProfileIcon } from "../icons/ProfileIcon";
import Select from "react-select";
import { setCurrency } from "../../redux/products/product.slice";
import { useCurrencySelector } from "../../redux/products/product.slice";
import { TOption } from "../../types/TDelivery";

type THeader = {
  isCheckout: boolean;
};

const MemoizedSidebarNavigation = memo(SidebarNavigation);

const Header = ({ isCheckout }: THeader) => {
  const dispatch = useAppDispatch();
  const currency = useCurrencySelector();
  const headerRef = useRef<HTMLDivElement>(null);
  const cartItems = useAppSelector((state) => state.cart.products);
  const totalCartItems = useMemo(() => {
    return cartItems.reduce((prevValue, currentValue) => {
      return prevValue + currentValue.quantity;
    }, 0);
  }, [cartItems]);
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const pathname = useLocation().pathname;
  const isDarkNav = pathname !== "/";
  const [isInHeader, setIsInHeader] = useState(false);
  const { height } = useWindowDimensions();
  const screenHeight = useMemo(() => height, [height]);

  const toggleMenu = (isOpen: boolean) => {
    setIsActiveMenu(isOpen);
  };

  const handleMouseEnter = () => {
    setIsInHeader(true);
  };

  const handleMouseLeave = () => {
    setIsInHeader(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 0 || isDarkNav || isInHeader) {
        headerRef.current?.classList.remove("transparent");
        headerRef.current?.classList.add("light");
      } else {
        headerRef.current?.classList.remove("light");
        headerRef.current?.classList.add("transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isInHeader, isDarkNav]);

  return (
    <>
      {isCheckout && (
        <div className={` ${classes["checkout-header"]}`}>
          <Link to="/" className={classes.logo}>
            <picture>
              <img src={logoLarge} alt="Open Fashion Logo" />
            </picture>
          </Link>
        </div>
      )}
      {!isCheckout && (
        <div
          ref={headerRef}
          className={`${classes["section-header"]}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <header className={`${classes["header"]}   `}>
            <div className={`container ${classes["header-container"]}`}>
              <div className={classes["header-container__container-left"]}>
                <Menu isOpen={isActiveMenu} toggleMenu={toggleMenu} />

                <MemoizedSidebarNavigation
                  isActiveMenu={isActiveMenu}
                  isInHeader={isInHeader}
                  height={screenHeight}
                  onCloseMenu={setIsActiveMenu}
                />
                <Select
                  name="Currency"
                  placeholder="PHP"
                  value={currency}
                  options={currencies}
                  className={classes["select"]}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary50: "hsl(18 31% 51% / 0.4)",
                      primary25: "hsl(18 31% 51% / 0.2)",
                      primary: "hsl(18 31% 51%)",
                    },
                  })}
                  onChange={(value) => {
                    dispatch(setCurrency(value as TOption));
                  }}
                />
              </div>

              <Link to="/" className={classes.logo}>
                <picture>
                  <source media="(min-width: 700px)" srcSet={logoLarge} />
                  <img src={logo} alt="Open Fashion Logo" />
                </picture>
              </Link>
              <div
                className={classes["header-container__container-right-icons"]}
              >
                <Link to={"/profile"} className={classes["icon"]}>
                  <div className={classes["cart-icon"]}>
                    <ProfileIcon />
                  </div>
                </Link>
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
      )}
    </>
  );
};

export default Header;
