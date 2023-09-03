import { useRef } from "react";
import { TAccordionItem, TArrayOfIds } from "../../../types/TAccordionItem";
import Arrow from "../../../assets/icons/arrow2.svg";
import classes from "../../../styles/components/ui/Accordion/AccordionItem.module.css";

type AccordionItemProps = {
  name: string;
  categoryName: string;
  active: string | null;
  categories: TAccordionItem | number[] | TArrayOfIds;
  handleToggle: (key: string) => void;
};

const AccordionItem = ({
  active,
  name,
  categories,
  handleToggle,
}: AccordionItemProps) => {
  const contentEl = useRef<HTMLDivElement>(null);
  const isActive = active === name;
  const isArray = Array.isArray(categories);

  return (
    <button className={classes["rc-accordion-card"]}>
      <div>
        <div
          className={`${classes["rc-accordion-toggle"]}  ${
            isActive ? classes.active : ""
          }`}
          onClick={() => handleToggle(name)}
        >
          <h5 className={classes["rc-accordion-title"]}>{name}</h5>
          {!isArray && (
            <img
              className={classes["rc-accordion-icon"]}
              src={Arrow}
              alt="arrom"
            />
          )}
        </div>
      </div>
      <div
        ref={contentEl}
        className={`${!isArray ? classes["rc-collapse"] : ""} ${
          !isArray && isActive ? classes.show : ""
        }`}
        style={
          contentEl && !isArray && isActive
            ? { maxHeight: contentEl.current?.scrollHeight }
            : { maxHeight: "0px" }
        }
      >
        <div className={classes["rc-accordion-body"]}>
          {!isArray &&
            Object.keys(categories).map((sub_category) => {
              return (
                <button
                  className={`${classes["rc-accordion-toggle"]} ${classes["accordion-body-button"]} ${classes["rc-accordion-title"]}`}
                  key={sub_category}
                >
                  {sub_category}
                </button>
              );
            })}
        </div>
      </div>
    </button>
  );
};

export default AccordionItem;
