import React, { useState } from "react";

import classes from "../../../styles/components/ui/Select.module.css";
import DownArrowIcon from "../../../assets/icons/Downfilled.svg";

type SelectProps = {
  label?: string;
  placeholder: string;
  options: { value: string }[];
  onClick: (value: string) => void;
};

const Select = ({ label, placeholder, options, onClick }: SelectProps) => {
  const [values, setValues] = useState("");
  const [focusedValue, setFocusedValue] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [typed, setTyped] = useState("");

  const onBlur = () => {
    const value = values;
    let focusedValue = -1;

    if (value) {
      focusedValue = options.findIndex((option) => option.value === value);
    }

    setIsOpen(false);
    setFocusedValue(focusedValue);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case " ":
        e.preventDefault();

        setIsOpen(true);
        break;
      case "Escape":
      case "Tab":
        if (isOpen) {
          e.preventDefault();
          setIsOpen(false);
        }
        break;
      case "Enter":
        setIsOpen(!isOpen);
        break;
      case "ArrowDown":
        e.preventDefault();
        if (focusedValue < options.length - 1) {
          setFocusedValue(focusedValue + 1);
          setValues(options[focusedValue + 1].value);
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (focusedValue > 0) {
          setFocusedValue(focusedValue - 1);
          setValues(options[focusedValue - 1].value);
        }
        break;
      default:
        if (/^[a-z0-9]$/i.test(e.key)) {
          const char = e.key;

          clearTimeout(
            setTimeout(() => {
              setTyped("");
            }, 1000)
          );

          const newTyped = typed + char;
          const re = new RegExp(`^${newTyped}`, "i");
          const index = options.findIndex((option) => re.test(option.value));

          if (index === -1) {
            setTyped(newTyped);
          }

          setValues(options[index].value);
          setFocusedValue(index);
          setTyped(newTyped);
        }
        break;
    }
  };

  const onClickHadler = () => {
    setIsOpen(!isOpen);
  };

  const onHoverOption = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { value } = e.currentTarget.dataset;
    const index = options.findIndex((option) => option.value === value);
    setFocusedValue(index);
  };

  const onClickOption = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { value } = e.currentTarget.dataset;

    if (value) {
      onClick(value);

      setValues(value);
      setIsOpen(false);
    }
  };

  const renderValues = () => {
    if (values.length === 0) {
      return <p className={classes.value}>{placeholder}</p>;
    }

    return <p className={classes.value}>{values}</p>;
  };

  const renderOption = (option: { value: string }, index: number) => {
    const { value } = option;
    const selected = values.includes(value);

    let className = classes.option;
    if (selected) className += ` ${classes.selected}`;
    if (index === focusedValue) className += ` ${classes.focused}`;

    return (
      <div
        key={value}
        data-value={value}
        className={className}
        onMouseOver={onHoverOption}
        onClick={onClickOption}
      >
        {value}
      </div>
    );
  };

  const renderOptions = () => {
    if (!isOpen) {
      return null;
    }

    return <div className={classes.options}>{options.map(renderOption)}</div>;
  };

  return (
    <div
      title={placeholder}
      className={classes.select}
      tabIndex={0}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    >
      {/* <label className="label">{label}</label> */}
      <div className={classes.selection} onClick={onClickHadler}>
        {renderValues()}
        <img src={DownArrowIcon} alt="Down arrow icon" />
      </div>

      {renderOptions()}
    </div>
  );
};

export default Select;
