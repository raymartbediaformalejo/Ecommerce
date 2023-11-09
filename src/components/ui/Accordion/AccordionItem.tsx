import { useRef, Dispatch, SetStateAction } from "react";
import { TAccordionItem, TArrayOfIds } from "../../../types/TAccordionItem";
import Arrow from "../../../assets/icons/arrow2.svg";
import classes from "../../../styles/components/ui/Accordion/AccordionItem.module.css";
import { Link } from "react-router-dom";
import { convertToLowercaseSpaceWithDash } from "../../../utils/mergeProductNameID";

type AccordionItemProps = {
  name: string;
  categoryName: string;
  active: string | null;
  categories: TAccordionItem | number[] | TArrayOfIds;
  onToggle: (key: string) => void;
  onClose: Dispatch<SetStateAction<boolean>>;
};

const AccordionItem = ({
  active,
  name,
  categoryName,
  categories,
  onToggle,
  onClose,
}: AccordionItemProps) => {
  const contentEl = useRef<HTMLDivElement>(null);
  const isActive = active === name;
  const isArray = Array.isArray(categories);

  const handleSubCategory = () => {
    onToggle(name);
    onClose(false);
  };

  const subCategoryTitleContent = isArray ? (
    <Link
      to={`/products/${convertToLowercaseSpaceWithDash({
        name: categoryName + " " + name,
      })}`}
    >
      <button
        className={`${classes["rc-accordion-toggle"]}  ${
          isActive ? classes.active : ""
        }`}
        onClick={handleSubCategory}
      >
        <p className={classes["rc-accordion-title"]}>{name}</p>
        {!isArray && (
          <img
            className={classes["rc-accordion-icon"]}
            src={Arrow}
            alt="arrom"
          />
        )}
      </button>
    </Link>
  ) : (
    <button
      className={`${classes["rc-accordion-toggle"]}  ${
        isActive ? classes.active : ""
      }`}
      onClick={() => onToggle(name)}
    >
      <p className={classes["rc-accordion-title"]}>{name}</p>
      {!isArray && (
        <img className={classes["rc-accordion-icon"]} src={Arrow} alt="arrom" />
      )}
    </button>
  );

  return (
    <div className={classes["rc-accordion-card"]}>
      <div>{subCategoryTitleContent}</div>
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
                <Link
                  key={sub_category}
                  to={`/products/${convertToLowercaseSpaceWithDash({
                    name: categoryName + " " + name + " " + sub_category,
                  })}`}
                >
                  <button
                    onClick={handleSubCategory}
                    className={`${classes["rc-accordion-toggle"]} ${classes["accordion-body-button"]} ${classes["rc-accordion-title"]}`}
                  >
                    {sub_category}
                  </button>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
