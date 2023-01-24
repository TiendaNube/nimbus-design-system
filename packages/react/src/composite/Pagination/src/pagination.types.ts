import { HTMLAttributes } from "react";

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  /** Active page */
  activePage: number;
  /** Page count */
  pageCount: number;
  /** Function to be passed when performing a page change */
  onPageChange: (page: number) => void;
  /** Determines whether page numbers should be shown */
  showNumbers?: boolean;
}
