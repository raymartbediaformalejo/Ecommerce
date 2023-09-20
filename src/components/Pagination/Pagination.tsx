import ForwardIcon from "../../assets/icons/Forward.svg";
import { PRODUCT_LIMIT } from "../../utils/productLimit";
import { TPaginationProps } from "../../types/TPagination";
import classes from "../../styles/components/Pagination/Pagination.module.css";
const getPages = (total: number): string[] => {
  const totalPages = Math.ceil(total / PRODUCT_LIMIT);

  return Array.from({ length: totalPages }, (_, index) =>
    (index + 1).toString()
  );
};
const Pagination = ({
  total,
  activePage,
  setActivePage,
  hasNextPage,
  hasPrevPage,
}: TPaginationProps) => {
  if (!total) return null;
  const pages = getPages(total);

  const handleSetActivePage = (page: string) => {
    setActivePage(page);
  };

  const handleNextPageClick = () => {
    const nextPage = parseInt(activePage) + 1;
    setActivePage(nextPage.toString());
  };

  const handlePrevPageClick = () => {
    const prevPage = parseInt(activePage) - 1;
    setActivePage(prevPage.toString());
  };
  console.log("hasNextPage: ", hasNextPage);
  console.log("hasPrevPage: ", hasPrevPage);

  return (
    <div className={classes["pagination-container"]}>
      {hasPrevPage && (
        <button
          onClick={handlePrevPageClick}
          className={`${classes["prev-button"]}`}
        >
          <img src={ForwardIcon} alt="previos icon" />
        </button>
      )}
      {pages &&
        pages.map((page, i) => (
          <button
            key={page}
            className={`${classes["pagination-number"]} ${
              activePage === page ? classes.active : ""
            } `}
            onClick={() => handleSetActivePage(page)}
            onKeyDown={() => handleSetActivePage(page)}
            role="button"
            tabIndex={i}
          >
            {page}
          </button>
        ))}
      {hasNextPage && (
        <button onClick={handleNextPageClick}>
          <img src={ForwardIcon} alt="next icon" />
        </button>
      )}
    </div>
  );
};

export default Pagination;
