import { useRef } from "react";
import { Link } from "react-router-dom";

import classes from "../../styles/components/Navigations/TopNavigationItem.module.css";

type TTopNavigationItem = {
  name: string;
  active: string | null;
  isInHeader: boolean;
  onMouseLeaveHeader?: (bol: boolean) => void;
  onMouseOver: (key: string) => void;
  onMouseOut: () => void;
};

const TopNavigationItem = ({
  name,
  active,
  isInHeader,
  onMouseOver,
  onMouseOut,
}: TTopNavigationItem) => {
  const isActive = isInHeader && active === name;
  const navBodyRef = useRef<HTMLDivElement>(null);

  return (
    <li
      onMouseOver={() => onMouseOver(name)}
      onMouseOut={onMouseOut}
      className={`${classes["nav-item"]} ${isActive ? classes["active"] : ""}`}
    >
      <Link to="/" className={classes["nav-item__link"]}>
        {name}
        <span onMouseOver={() => onMouseOver(name)} onMouseOut={onMouseOut}>
          {name}
        </span>
      </Link>
      <div
        ref={navBodyRef}
        className={`${classes["nav-item-body"]} ${
          isActive ? classes["show"] : ""
        }`}
        onMouseEnter={() => onMouseOver(name)}
        onMouseLeave={onMouseOut}
      >
        <div>
          <h2>For him</h2>
          <ul>
            <li>
              <Link to="/">eme</Link>
            </li>
            <li>
              <Link to="/">eme</Link>
            </li>
            <li>
              <Link to="/">eme</Link>
            </li>
            <li>
              <Link to="/">eme</Link>
            </li>
          </ul>
        </div>
      </div>
    </li>
  );
};

export default TopNavigationItem;
