import { HTMLAttributes } from "react";

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  /** Active page */
  activePage: number;
  /** Page count */
  pageCount: number;
  /** Function to be passed on actioning the dismiss button */
  onPageChange: (page: number) => void;
  /** Determines if the alert is shown or not */
  showNumbers?: boolean;
}
