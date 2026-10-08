import type {
  ChangeEvent,
  ClipboardEvent,
  FocusEvent,
  FormEvent,
  KeyboardEvent,
} from "react";
import { type PaginationProps } from "../../pagination.types";

export type UseGoToPageProps = Pick<
  PaginationProps,
  "activePage" | "pageCount" | "onPageChange"
>;

/** The last page announced to screen readers. */
export interface PageAnnouncement {
  page: number;
  /** Changes on every announcement, so identical text is announced again. */
  tick: number;
}

export interface UseGoToPageResult {
  /** Digits currently displayed by the go-to-page input. */
  value: string;
  /** The last page announced to screen readers, or `undefined` before any. */
  announcement: PageAnnouncement | undefined;
  /** Navigates to a page from another control and announces it. */
  navigate: (page: number) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBeforeInput: (event: FormEvent<HTMLInputElement>) => void;
  onPaste: (event: ClipboardEvent<HTMLInputElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onFocus: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
}
