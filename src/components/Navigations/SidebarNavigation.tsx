import { useState, useEffect } from "react";
import classes from "../../styles/components/Navigations/SidebarNavigation.module.css";
import TabButton from "../ui/TabButton";
import Phone from "../../assets/icons/Call.svg";
import Location from "../../assets/icons/Location.svg";
import Twitter from "../../assets/icons/Twitter.svg";
import Instagram from "../../assets/icons/Instagram.svg";
import YouTube from "../../assets/icons/YouTube.svg";
// import { useGetAllProductsQuery } from "../../redux/products/products.api";
import Accordion from "../ui/Accordion/Accordion";
import { TAccordionItem, TArrayOfIds } from "../../types/TAccordionItem";
import Divider from "../ui/Divider";

type SidebarNavigationProps = {
  isActiveMenu: boolean;
};

const CATEGORY: Record<string, TAccordionItem> = {
  Women: {
    Apparel: {
      Tops: [40, 39, 37, 36],
      Dresses: [45, 41, 43, 42, 44],
      "T-shirt": [52],
    },
    Bags: [75, 72, 71, 73, 74],
    Shoes: [49, 60, 58, 56, 50, 59, 47, 46, 48],

    Accessories: {
      Jewellery: [79, 78, 76, 88, 77],
      Watches: [64, 63, 65, 66, 69, 61, 68, 70, 62, 67],
      Sunglasses: [84, 81],
    },
  },

  Men: {
    Apparel: { Shirts: [52, 53, 54, 51] },
    Shoes: [57, 60, 58, 56, 59],

    Accessories: {
      Watches: [64, 63, 65, 61, 62],
      Sunglasses: [85, 83, 81, 82],
    },
  },
  Kids: { Apparel: { Tops: [38] } },
};

const SidebarNavigation = ({ isActiveMenu }: SidebarNavigationProps) => {
  // const { data } = useGetAllProductsQuery();

  const [category, setCategory] = useState(Object.keys(CATEGORY)[0]);
  const [accordionBoduContent, setAccordionBodyContent] = useState<
    TAccordionItem | number[] | TArrayOfIds | null
  >(null);

  const toogleTab = (parentCategory: string) => {
    setCategory(parentCategory);
  };

  useEffect(() => {
    const foundCategory = CATEGORY[category];
    if (foundCategory) setAccordionBodyContent(foundCategory);
  }, [category]);

  return (
    <>
      <aside
        className={`${classes.sidebar} ${isActiveMenu ? classes.active : ""} `}
      >
        <div>
          <div className={classes["sidebar__nav-container"]}>
            {CATEGORY &&
              Object.keys(CATEGORY).map((tab, i) => {
                console.log(tab);

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
            <Accordion categoryName={category} arr={accordionBoduContent} />
          </div>
        </div>
        <div>
          <div className={classes["contact-card"]}>
            <div>
              <img src={Phone} alt="Phone number" />
              <p>(786) 713-8616</p>
            </div>
            <div>
              <img src={Location} alt="Location" />
              <p>Store locator</p>
            </div>
          </div>

          <Divider size="lg"/>
          <div className={classes["socials-container"]}>
            <img src={Twitter} alt="Twitter" />
            <img src={Instagram} alt="Instagram" />
            <img src={YouTube} alt="YouTube" />
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarNavigation;
