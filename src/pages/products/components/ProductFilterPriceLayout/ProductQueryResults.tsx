import classes from "../../../../styles/pages/Products/ProductFilter.module.css";
type ProductQueryResultsProps = {
  length?: number;
  query?: string;
  title?: string;
};
const ProductQueryResults = ({
  length,
  query,
  title,
}: ProductQueryResultsProps) => {
  const content = length ? (
    <p
      title={`${length && length} ${
        length > 1 ? "results" : "result"
      } of "${query}"`}
      className={classes["title-search-result"]}
    >{`${length} ${length > 1 ? "results" : "result"} of "${query}"`}</p>
  ) : title ? (
    <p className={classes["title-search-result"]}>{title}</p>
  ) : null;
  return content;
};

export default ProductQueryResults;
