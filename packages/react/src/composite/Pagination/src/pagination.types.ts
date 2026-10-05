import { type HTMLAttributes } from "react";
import type React from "react";

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
   * Shows the numeric "go to page" input next to the navigation, to jump
   * straight to a page by typing its number. Submitted on Enter or on blur.
   * It is only available when `pageCount` is 6 or more, and never replaces the
   * arrows or page numbers. Below the `md` breakpoint (672px) the compact
   * first / previous / go-to-page / next / last layout is used instead, with its
   * own input, whether or not this prop is set.
   * @default false
   */
  showInput?: boolean;

  /**
   * Custom render function for pagination items.
   */
  renderItem?: (item: PaginationItemData) => React.ReactNode;
}

export type PaginationProps = PaginationProperties &
  HTMLAttributes<HTMLElement>;
