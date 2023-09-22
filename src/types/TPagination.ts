export type TSetActivePage = (active: string) => void;

export type TPaginationProps = {
  activePage: string;
  setActivePage: TSetActivePage;
  total: number | undefined;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};
