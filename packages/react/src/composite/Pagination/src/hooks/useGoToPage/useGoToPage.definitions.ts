/**
 * Minimum number of pages from which the go-to-page input is available
 * (and the compact layout is used below the `md` breakpoint).
 */
export const GO_TO_PAGE_MIN_PAGE_COUNT = 6;

export const getInvalidPageMessage = (pageCount: number) =>
  `Enter a page between 1 and ${pageCount}.`;

/** Plain decimal digits only: rejects signs, decimals and exponent notation. */
const DECIMAL_INTEGER = /^\d+$/;

/**
 * Parses what the user typed. Returns the page number when it is an integer
 * between 1 and `pageCount` (both included), otherwise `undefined`.
 */
export const parsePage = (
  text: string,
  pageCount: number
): number | undefined => {
  const trimmed = text.trim();
  if (!DECIMAL_INTEGER.test(trimmed)) return undefined;
  const page = Number(trimmed);
  const isValid = Number.isInteger(page) && page >= 1 && page <= pageCount;
  return isValid ? page : undefined;
};
