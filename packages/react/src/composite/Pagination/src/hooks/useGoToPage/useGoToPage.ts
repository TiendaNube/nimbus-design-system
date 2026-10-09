import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";

import {
  type PageAnnouncement,
  type UseGoToPageProps,
  type UseGoToPageResult,
} from "./useGoToPage.types";
import { clampPage, keepDigits } from "./useGoToPage.definitions";

/**
 * State of the "go to page" input.
 *
 * - Only digits can enter the input, however they arrive (typing, paste, drop,
 *   autofill), so what is submitted is always a non-negative integer or empty.
 * - The entry is submitted on Enter or on blur and clamped to `1..pageCount`.
 *   The input then shows the resulting page and it is announced. An empty entry
 *   neither navigates nor announces; the input shows the active page again.
 * - The displayed value mirrors `activePage`, except while the user is
 *   editing: an external `activePage` change never overwrites what is being
 *   typed. It is applied once the input loses focus.
 */
export const useGoToPage = ({
  activePage,
  pageCount,
  onPageChange,
}: UseGoToPageProps): UseGoToPageResult => {
  const [value, setValue] = useState(String(activePage));
  // Announcement of a page reached by submitting the input.
  const [announcement, setAnnouncement] = useState<
    PageAnnouncement | undefined
  >(undefined);
  // Announcement of a page reached with the arrow buttons.
  const [arrowAnnouncement, setArrowAnnouncement] = useState<
    PageAnnouncement | undefined
  >(undefined);

  // The input currently has focus.
  const isFocused = useRef(false);
  // The user typed something that has not been submitted yet.
  const hasPendingEntry = useRef(false);
  // Caret position to restore after a paste is applied.
  const caret = useRef<
    { input: HTMLInputElement; position: number } | undefined
  >(undefined);

  const resync = useCallback(() => {
    hasPendingEntry.current = false;
    setValue(String(activePage));
  }, [activePage]);

  // Resync from `activePage` changes made through any other control, unless
  // the user is editing.
  useEffect(() => {
    if (!isFocused.current) resync();
  }, [resync]);

  useLayoutEffect(() => {
    if (!caret.current) return;
    const { input, position } = caret.current;
    caret.current = undefined;
    input.setSelectionRange(position, position);
  }, [value]);

  const nextAnnouncement =
    (page: number) =>
    (previous: PageAnnouncement | undefined): PageAnnouncement => ({
      page,
      tick: (previous?.tick ?? 0) + 1,
    });

  const navigate = (page: number) => {
    onPageChange(page);
    setArrowAnnouncement(nextAnnouncement(page));
  };

  const submit = () => {
    if (!hasPendingEntry.current) return;

    if (value === "") {
      resync();
      return;
    }

    const page = clampPage(Number(value), pageCount);
    hasPendingEntry.current = false;
    setValue(String(page));
    if (page !== activePage) onPageChange(page);
    setAnnouncement(nextAnnouncement(page));
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    hasPendingEntry.current = true;
    setValue(keepDigits(event.target.value));
  };

  const onBeforeInput = (
    event: FormEvent<HTMLInputElement> & { data?: string | null }
  ) => {
    if (event.data && keepDigits(event.data) !== event.data) {
      event.preventDefault();
    }
  };

  const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const input = event.currentTarget;
    const digits = keepDigits(event.clipboardData.getData("text"));
    const start = input.selectionStart ?? value.length;
    const end = input.selectionEnd ?? value.length;
    hasPendingEntry.current = true;
    caret.current = { input, position: start + digits.length };
    setValue(`${value.slice(0, start)}${digits}${value.slice(end)}`);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    // Enter that confirms an IME composition must not submit the entry. Safari
    // ends the composition before keydown, so `isComposing` is already false
    // there; its only signal is the legacy keyCode 229, which has no standard
    // replacement.
    const isImeConfirm =
      event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229; // NOSONAR
    if (isImeConfirm) return;
    // The input is not a form submission control.
    event.preventDefault();
    submit();
  };

  const onFocus = () => {
    isFocused.current = true;
  };

  const onBlur = () => {
    isFocused.current = false;
    if (hasPendingEntry.current) submit();
    else resync();
  };

  return {
    value,
    announcement,
    arrowAnnouncement,
    navigate,
    onChange,
    onBeforeInput,
    onPaste,
    onKeyDown,
    onFocus,
    onBlur,
  };
};
