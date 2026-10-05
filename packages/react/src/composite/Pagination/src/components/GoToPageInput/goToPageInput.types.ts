import { type UseGoToPageResult } from "../../hooks";

/**
 * Props specific to the go-to-page input.
 */
export interface GoToPageInputProperties {
  /**
   * The total number of pages. Sets the `max` of the native number input.
   */
  pageCount: number;
  /**
   * `data-testid` of the native input.
   */
  "data-testid": string;
  /**
   * Ids of the elements describing the input ("of Y" text, error message).
   */
  "aria-describedby"?: string;
}

/**
 * The go-to-page input's own props plus the state and handlers returned by
 * `useGoToPage`.
 */
export type GoToPageInputProps = GoToPageInputProperties & UseGoToPageResult;
