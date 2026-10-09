import { type HTMLAttributes } from "react";
import type React from "react";

export interface PaginationItemData {
  pageNumber: number | string;
  isCurrent: boolean;
}

/**
 * Translatable texts for the Pagination component.
 * Every text can be customized for localization; when a key is omitted
 * (or empty) its English default is used.
 */
export interface PaginationLabels {
  /**
   * Accessible name of the navigation landmark that wraps the pagination.
   * @default "Pagination"
   */
  navigation?: string;
  /**
   * Accessible name of the previous page button.
   * @default "Previous page"
   */
  previousPage?: string;
  /**
   * Accessible name of the next page button.
   * @default "Next page"
   */
  nextPage?: string;
  /**
   * Accessible name of the first page button (compact layout).
   * @default "First page"
   */
  firstPage?: string;
  /**
   * Accessible name of the last page button (compact layout).
   * @default "Last page"
   */
  lastPage?: string;
  /**
   * Accessible name of the go to page input.
   * @default "Go to page"
   */
  goToPage?: string;
  /**
   * Visible text before the go to page input (desktop layout).
   * @default "Go to"
   */
  goTo?: string;
  /**
   * Text between the go to page input and the total number of pages,
   * rendered as "{of} {pageCount}".
   * @default "of"
   */
  of?: string;
  /**
   * Text announced to screen readers after navigating to a page. A function
   * so each language can order the words.
   * @default (page, pageCount) => `Page ${page} of ${pageCount}`
   * @TJS-type (page: number, pageCount: number) => string;
   */
  pageAnnouncement?: (page: number, pageCount: number) => string;
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
   * Shows the "go to page" input next to the navigation, to jump straight to
   * a page by typing its number (digits only). Submitted on Enter or on blur;
   * a number outside the range goes to the nearest page.
   * It is only available when `pageCount` is 6 or more, and never replaces the
   * arrows or page numbers. Below the `md` breakpoint (672px) the compact
   * first / previous / go-to-page / next / last layout is used instead, with its
   * own input, whether or not this prop is set.
   * @default false
   */
  showInput?: boolean;

  /**
   * Translatable texts for localization. Omitted keys use their English default.
   */
  labels?: PaginationLabels;

  /**
   * Custom render function for pagination items.
   */
  renderItem?: (item: PaginationItemData) => React.ReactNode;
}

export type PaginationProps = PaginationProperties &
  HTMLAttributes<HTMLElement>;
