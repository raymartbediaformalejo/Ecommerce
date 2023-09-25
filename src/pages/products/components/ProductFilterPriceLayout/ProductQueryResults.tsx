import classes from "../../../../styles/pages/Products/ProductFilter.module.css";
type ProductQueryResultsProps = {
  length?: number;
  query: string;
};
const ProductQueryResults = ({ length, query }: ProductQueryResultsProps) => {
  const content = length ? (
    <p
      title={`${length} ${length > 1 ? "results" : "result"} of "${query}"`}
      className={classes["title-search-result"]}
    >{`${length} ${length > 1 ? "results" : "result"} of "${query}"`}</p>
  ) : null;
  return content;
};

export default ProductQueryResults;
