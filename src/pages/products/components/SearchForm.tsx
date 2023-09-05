import SearchIcon from "../../../assets/icons/Search.svg";
import DeleteIcon from "../../../assets/icons/Delete.svg";
import classes from "../../../styles/pages/Products/SearchForm.module.css";
import { RefObject } from "react";

type SearchFormProps = {
  query: string;
  inputRef: RefObject<HTMLInputElement>;
  setQuery: (query: string) => void;
};

const SearchForm = ({ query, inputRef, setQuery }: SearchFormProps) => {
  const handleDeleteSearch = () => {
    setQuery("");
  };

  return (
    <form action="/search" className={classes["search-form"]}>
      <div className={classes["form-field"]}>
        <input
          ref={inputRef}
          className={classes["search-input-field"]}
          type="text"
          name="query"
          placeholder="Search items"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
        {query && query.length && (
          <button
            className={classes["delete-icon"]}
            onClick={handleDeleteSearch}
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
