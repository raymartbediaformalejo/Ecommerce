import { useState } from "react";

import classes from "../../styles/components/ui/Menu.module.css";

type MenuProps = {
  toggleMenu: (isOpen: boolean) => void;
};

const Menu = ({ toggleMenu }: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
