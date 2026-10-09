/**
 * Minimum number of pages from which the go-to-page input is available
 * (and the compact layout is used below the `md` breakpoint).
 */
export const GO_TO_PAGE_MIN_PAGE_COUNT = 6;

/** Keeps only the digits of a text. */
export const keepDigits = (text: string): string => text.replace(/\D/g, "");

/** Limits a page to the `1..pageCount` range. */
export const clampPage = (page: number, pageCount: number): number =>
  Math.min(Math.max(page, 1), pageCount);
