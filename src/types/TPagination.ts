export type TPaginationProps = {
  activePage: string;
  setActivePage: (active: string) => void;
  total: number | undefined;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};
