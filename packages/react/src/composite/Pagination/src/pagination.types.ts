import React, { HTMLAttributes } from "react";

export interface PaginationItemData {
  pageNumber: number | string;
  isCurrent: boolean;
}

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

  /**
   * Custom render function for pagination items.
   */
  renderItem?: (item: PaginationItemData) => React.ReactNode;
}

export type PaginationProps = PaginationProperties &
  HTMLAttributes<HTMLElement>;
