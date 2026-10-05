import type { ChangeEvent, FocusEvent, KeyboardEvent } from "react";
import { type PaginationProps } from "../../pagination.types";

export type UseGoToPageProps = Pick<
  PaginationProps,
  "activePage" | "pageCount" | "onPageChange"
>;

export interface UseGoToPageResult {
  /** Text currently displayed by the go-to-page input. */
  value: string;
  /** Validation message, or `undefined` when the input holds no invalid entry. */
  error: string | undefined;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onFocus: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
}
