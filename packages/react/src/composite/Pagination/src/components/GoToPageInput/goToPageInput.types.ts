import { type UseGoToPageResult } from "../../hooks";

/**
 * Props specific to the go-to-page input.
 */
export interface GoToPageInputProperties {
  /**
   * Accessible name of the input.
   */
  "aria-label": string;
  /**
   * Id of the element describing the input (the "of Y" text).
   */
  "aria-describedby": string;
  /**
   * `data-testid` of the native input.
   */
  "data-testid": string;
}

/**
 * The go-to-page input's own props plus the state and handlers returned by
 * `useGoToPage` that the input uses.
 */
export type GoToPageInputProps = GoToPageInputProperties &
  Pick<
    UseGoToPageResult,
    | "value"
    | "onChange"
    | "onBeforeInput"
    | "onPaste"
    | "onKeyDown"
    | "onFocus"
    | "onBlur"
  >;
