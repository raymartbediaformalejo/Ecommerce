import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

import classes from "../../styles/components/Navigations/SidebarNavigation.module.css";
import TabButton from "../ui/TabButton";
import Phone from "../../assets/icons/Call.svg";
import Location from "../../assets/icons/Location.svg";
import Twitter from "../../assets/icons/Twitter.svg";
import Instagram from "../../assets/icons/Instagram.svg";
import YouTube from "../../assets/icons/YouTube.svg";
import Accordion from "../ui/Accordion/Accordion";
import { TAccordionItem, TArrayOfIds } from "../../types/TAccordionItem";
import Divider from "../ui/Divider";
import TopNavigation from "./TopNavigation";
import { CATEGORY, topNavItems } from "../../utils/productConstant";
import { ProfileIcon } from "../icons/ProfileIcon";

type SidebarNavigationProps = {
  isActiveMenu: boolean;
  isInHeader: boolean;
  height: number;
  onCloseMenu: Dispatch<SetStateAction<boolean>>;
};

type TAccordionBodyContent = TAccordionItem | number[] | TArrayOfIds | null;

const SidebarNavigation = ({
  isActiveMenu,
  isInHeader,
  height,
  onCloseMenu,
}: SidebarNavigationProps) => {
  const [category, setCategory] = useState(Object.keys(CATEGORY)[0]);
  const [accordionBodyContent, setAccordionBodyContent] =
    useState<TAccordionBodyContent>(null);
  const [sidenavHeightEl, setSidenavHeightEl] = useState(height);

  const toogleTab = (parentCategory: string) => {
    setCategory(parentCategory);
  };

  useEffect(() => {
    setSidenavHeightEl(height);
  }, [height]);

  useEffect(() => {
    const foundCategory = CATEGORY[category];
    if (foundCategory) setAccordionBodyContent(foundCategory);
  }, [category]);

  return (
    <>
      <aside
        className={`${classes["sidebar"]} ${
          isActiveMenu ? classes["active"] : ""
        } `}
        style={{ height: `${sidenavHeightEl}px` }}
      >
        <div>
          <div className={classes["sidebar__nav-container"]}>
            {CATEGORY &&
              Object.keys(CATEGORY).map((tab, i) => {
                return (
                  <TabButton
                    key={i}
                    size="lg"
                    isActive={category === tab}
                    onClick={() => toogleTab(tab)}
                  >
                    {tab}
                  </TabButton>
                );
              })}
          </div>

          <div className={classes["sidebar__content-container"]}>
            <Accordion
              categoryName={category}
              arr={accordionBodyContent}
              onClose={onCloseMenu}
            />
          </div>
        </div>
        <div>
          <div className={classes["contact-card"]}>
            <div>
              <Link to="/profile">
                <ProfileIcon />
                <p>Account</p>
              </Link>
            </div>
            <div>
              <img src={Phone} alt="Phone number" />
              <p>(786) 713-8616</p>
            </div>
            <div>
              <img src={Location} alt="Location" />
              <p>Store locator</p>
            </div>
          </div>

          <Divider size="large" />
          <div className={classes["socials-container"]}>
            <img src={Twitter} alt="Twitter" />
            <img src={Instagram} alt="Instagram" />
            <img src={YouTube} alt="YouTube" />
          </div>
        </div>
      </aside>

      <nav className={classes["nav"]}>
        <TopNavigation items={topNavItems} isInHeader={isInHeader} />
      </nav>
    </>
  );
};

export default SidebarNavigation;
