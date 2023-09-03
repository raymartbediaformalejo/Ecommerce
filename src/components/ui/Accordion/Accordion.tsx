import { useState } from "react";
import { TAccordionItem, TArrayOfIds } from "../../../types/TAccordionItem";
import AccordionItem from "./AccordionItem";
import classes from "../../../styles/components/ui/Accordion/Accordion.module.css";

type AccordionProps = {
  categoryName: string;
  arr: TAccordionItem | number[] | TArrayOfIds | null;
};
const Accordion = ({ categoryName, arr }: AccordionProps) => {
  const [active, setActive] = useState<string | null>(null);
  console.log(arr);

  const handleToggle = (key: string) => {
    if (active === key) {
      setActive(null);
    } else {
      setActive(key);
    }
  };

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
                handleToggle={handleToggle}
                categories={categories}
              />
            );
          })}
      </div>
    </>
  );
};

export default Accordion;
