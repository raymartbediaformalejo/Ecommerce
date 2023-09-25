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
  setSearchParams,
  hasNextPage,
  hasPrevPage,
}: TPaginationProps) => {
  if (!total) return null;
  const pages = getPages(total);

  const handleSetActivePage = (page: string) => {
    setSearchParams(prev => {
      prev.set('page', page)
      return prev
    })
  };

  const handleNextPageClick = () => {
    const nextPage = parseInt(activePage) + 1;
    setSearchParams(prev => {
      prev.set('page', nextPage.toString())
      return prev
    })
  };

  const handlePrevPageClick = () => {
    const prevPage = parseInt(activePage) - 1;
    setSearchParams(prev => {
      prev.set('page', prevPage.toString())
      return prev
    })
  };

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
