import { type UseGoToPageResult } from "../../hooks";

export interface GoToPageInputProps extends UseGoToPageResult {
  /** The total number of pages. */
  pageCount: number;
  /** `data-testid` of the native input. */
  "data-testid": string;
  /** Ids of the elements describing the input ("X of Y" text, error message). */
  "aria-describedby"?: string;
}
