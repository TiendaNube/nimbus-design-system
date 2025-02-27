import React, { HTMLAttributes } from "react";
import { ButtonBaseProps } from "@nimbus-ds/button/src/button.types";
import { PaginationItem } from "./Pagination";

export interface PaginationComponents {
  Item: typeof PaginationItem;
}

export type PaginationItemProps = ButtonBaseProps & {
  "data-testid": string;
  href?: string;
};

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
  onPageChange?: (page: number) => void;
  /**
   * Determines whether page numbers should be shown.
   * @default true
   */
  showNumbers?: boolean;
  /**
   * Custom render function for pagination items.
   */
  renderItem?: (page: number, item: PaginationItemProps) => React.ReactNode;
}

export type PaginationProps = PaginationProperties &
  HTMLAttributes<HTMLElement>;
