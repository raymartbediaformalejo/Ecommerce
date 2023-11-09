import classes from "../../styles/components/ui/Menu.module.css";

type MenuProps = {
  isOpen: boolean;
  toggleMenu: (isOpen: boolean) => void;
};

const Menu = ({ isOpen, toggleMenu }: MenuProps) => {
  const onIsOpenMenu = () => {
    toggleMenu(!isOpen);
  };

  return (
    <>
      <label className={classes["hamburger-menu"]}>
        <input type="checkbox" onChange={onIsOpenMenu} checked={isOpen} />
      </label>
      {isOpen && (
        <div className={classes["overlay"]} onClick={onIsOpenMenu}></div>
      )}
    </>
  );
};

export default Menu;
