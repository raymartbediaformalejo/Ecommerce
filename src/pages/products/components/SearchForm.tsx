import { SetURLSearchParams } from "react-router-dom";

import SearchIcon from "../../../assets/icons/Search.svg";
import DeleteIcon from "../../../assets/icons/Delete.svg";
import classes from "../../../styles/pages/Products/SearchForm.module.css";
import { RefObject } from "react";

type SearchFormProps = {
  q: string | null;
  inputRef: RefObject<HTMLInputElement>;
  onDeleteQuery?: () => void;
  setSearchParams: SetURLSearchParams;
};

const SearchForm = ({
  q,
  inputRef,
  setSearchParams,
  onDeleteQuery,
}: SearchFormProps) => {
  // const handleDeleteSearchQuery = () => {
  //   setSearchParams((prev) => {
  //     console.log(prev);

  //     prev.delete("q");
  //     return prev;
  //   });
  // };

  return (
    <form action="/search" className={classes["search-form"]}>
      <div className={classes["form-field"]}>
        <input
          ref={inputRef}
          className={classes["search-input-field"]}
          type="text"
          name="q"
          placeholder="Search items"
          value={q ?? ""}
          onChange={(e) =>
            setSearchParams((prev) => {
              prev.set("q", e.target.value);
              return prev;
            })
          }
          autoComplete="off"
        />
        {q && q.length && (
          <button
            type="button"
            className={classes["delete-icon"]}
            onClick={onDeleteQuery}
          >
            <img src={DeleteIcon} alt="Delete icon" />
          </button>
        )}
        <img
          className={classes["search-icon"]}
          src={SearchIcon}
          alt="Search icon"
        />
      </div>
    </form>
  );
};

export default SearchForm;
