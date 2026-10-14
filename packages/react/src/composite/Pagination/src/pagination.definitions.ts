import type { PaginationLabels } from "./pagination.types";

export const generateKey = (pageNumber: number | string, index: number) =>
  `${pageNumber}-${index}`;

export const DEFAULT_PAGE_ANNOUNCEMENT = (page: number, pageCount: number) =>
  `Page ${page} of ${pageCount}`;

/**
 * Resolves every text, falling back with `||` to its English default so an
 * empty string never leaves a control without an accessible name.
 */
export const resolveLabels = (labels: PaginationLabels = {}) => ({
  navigation: labels.navigation || "Pagination",
  previousPage: labels.previousPage || "Previous page",
  nextPage: labels.nextPage || "Next page",
  firstPage: labels.firstPage || "First page",
  lastPage: labels.lastPage || "Last page",
  goToPage: labels.goToPage || "Go to page",
  goTo: labels.goTo || "Go to",
  of: labels.of || "of",
  pageAnnouncement: (page: number, pageCount: number) =>
    labels.pageAnnouncement?.(page, pageCount) ||
    DEFAULT_PAGE_ANNOUNCEMENT(page, pageCount),
});
