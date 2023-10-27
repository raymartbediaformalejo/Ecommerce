import { useState } from "react";

import classes from "../../styles/components/Navigations/TopNavigation.module.css";
import TopNavigationItem from "./TopNavigationItem";
import { TNavigationItem } from "../../types/TNavigation";

type TTopNavigation = {
  items: Record<string, TNavigationItem>;
  isInHeader: boolean;
};

const navItemNames = ["apparel", "bags", "footware", "accessories"];

const TopNavigation = ({ items, isInHeader }: TTopNavigation) => {
  const [active, setActive] = useState<string | null>(null);
  const mouseOver = (key: string) => {
    setActive(key);
    // onMouseLeaveHeader?.();
  };

  const mouseOut = () => {
    setActive(null);
  };
  return (
    <ul className={classes["nav-items"]}>
      {navItemNames.map((navItem) => (
        <TopNavigationItem
          key={navItem}
          name={navItem}
          active={active}
          isInHeader={isInHeader}
          onMouseOver={mouseOver}
          onMouseOut={mouseOut}
        />
      ))}
    </ul>
  );
};

export default TopNavigation;
