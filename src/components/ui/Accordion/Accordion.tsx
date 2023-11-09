import { useState, Dispatch, SetStateAction } from "react";
import { TAccordionItem, TArrayOfIds } from "../../../types/TAccordionItem";
import AccordionItem from "./AccordionItem";
import classes from "../../../styles/components/ui/Accordion/Accordion.module.css";

type AccordionProps = {
  categoryName: string;
  arr: TAccordionItem | number[] | TArrayOfIds | null;
  onClose: Dispatch<SetStateAction<boolean>>;
};
const Accordion = ({ categoryName, arr, onClose }: AccordionProps) => {
  const [active, setActive] = useState<string | null>(null);

  const handleToggle = (key: string) => {
    if (active === key) {
      setActive(null);
    } else {
      setActive(key);
    }
  };
  console.log("categoryName: ", categoryName);

  return (
    <>
      <div className={classes.card}>
        {arr &&
          Object.entries(arr).map(([key, categories]) => {
            return (
              <AccordionItem
                key={key}
                categoryName={categoryName}
                name={key}
                active={active}
                categories={categories}
                onToggle={handleToggle}
                onClose={onClose}
              />
            );
          })}
      </div>
    </>
  );
};

export default Accordion;
