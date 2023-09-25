import { SetURLSearchParams } from "react-router-dom";

export type TSetActivePage = (active: string) => void;

export type TPaginationProps = {
  activePage: string;
  total: number | undefined;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  setSearchParams: SetURLSearchParams;
};
