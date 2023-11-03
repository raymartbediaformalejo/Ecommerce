import { useState, useEffect } from "react";

import classes from "../../styles/components/ui/Menu.module.css";

type MenuProps = {
  toggleMenu: (isOpen: boolean) => void;
};

const Menu = ({ toggleMenu }: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   if (isOpen) {
  //     document.documentElement.style.overflow = "hidden";
  //   } else {
  //     document.documentElement.style.overflow = "hidden auto";
  //   }

  //   return () => {
  //     document.documentElement.style.overflow = "hidden auto";
  //   };
  // }, [isOpen]);
  const onIsOpenMenu = () => {
    setIsOpen((prev) => !prev);
    toggleMenu(!isOpen);
  };
  return (
    <>
      <label className={classes["hamburger-menu"]}>
        <input type="checkbox" onChange={onIsOpenMenu} checked={isOpen} />
      </label>
      {isOpen && <div className={classes.overlay} onClick={onIsOpenMenu}></div>}
    </>
  );
};

export default Menu;
