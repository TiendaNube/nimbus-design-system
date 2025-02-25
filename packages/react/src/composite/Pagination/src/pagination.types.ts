import { HTMLAttributes } from "react";

export interface PaginationProperties {
  /**
   * The currently selected page.
   */
  activePage: number;
  /**
   * The total number of pages.
   */
  pageCount: number;
  /**
   * Called with event and page number when a page is clicked.
   * @TJS-type (page: number) => void;
   */
  onPageChange: (page: number) => void;
  /**
   * Determines whether page numbers should be shown.
   * @default true
   */
  showNumbers?: boolean;

  customButton?: (
    pageNumber: string
  ) => Record<string, string | boolean | number> & { as: any };
}

export type PaginationProps = PaginationProperties &
  HTMLAttributes<HTMLElement>;
