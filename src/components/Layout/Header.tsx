import { useState, useRef, useEffect, useMemo, memo } from "react";

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

import Select from "../ui/Select/Select";
type THeader = {
  isCheckout: boolean;
};

const MemoizedSidebarNavigation = memo(SidebarNavigation);

const currencies: Record<string, string>[] = [
  { value: "PHP" },
  { value: "USD" },
];

const Header = ({ isCheckout }: THeader) => {
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

  const handlerMouseLeave = () => {
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
          onMouseLeave={handlerMouseLeave}
        >
          <header className={`${classes["header"]}   `}>
            <div className={`container ${classes["header-container"]}`}>
              <div className={classes["header-container__container-left"]}>
                <Menu toggleMenu={toggleMenu} />

                <MemoizedSidebarNavigation
                  isActiveMenu={isActiveMenu}
                  isInHeader={isInHeader}
                  height={screenHeight}
                />
                <Select
                  label="currencies"
                  defaultValue={"USD"}
                  options={currencies}
                  className={classes["currencies"]}
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
