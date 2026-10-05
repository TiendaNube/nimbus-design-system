import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";

import {
  type UseGoToPageProps,
  type UseGoToPageResult,
} from "./useGoToPage.types";
import { getInvalidPageMessage, parsePage } from "./useGoToPage.definitions";

/**
 * State of the "go to page" input.
 *
 * - The displayed value mirrors `activePage`, except while the user is
 *   editing: an external `activePage` change never overwrites what is being
 *   typed. It is applied once the input loses focus.
 * - An invalid entry is kept as typed together with an error. The error is
 *   cleared by the next keystroke, a successful submit, or when the value is
 *   resynchronized from an external `activePage` change.
 * - The entry is submitted on Enter or on blur.
 */
export const useGoToPage = ({
  activePage,
  pageCount,
  onPageChange,
}: UseGoToPageProps): UseGoToPageResult => {
  const [value, setValue] = useState(String(activePage));
  const [error, setError] = useState<string | undefined>(undefined);

  // The input currently has focus.
  const isFocused = useRef(false);
  // The user typed something that has not been submitted yet (or was invalid).
  const hasPendingEntry = useRef(false);

  const resync = useCallback(() => {
    hasPendingEntry.current = false;
    setValue(String(activePage));
    setError(undefined);
  }, [activePage]);

  // Resync from `activePage` changes made through any other control, unless
  // the user is editing.
  useEffect(() => {
    if (!isFocused.current) resync();
  }, [resync]);

  const submit = () => {
    const page = parsePage(value, pageCount);

    if (page === undefined) {
      hasPendingEntry.current = true;
      setError(getInvalidPageMessage(pageCount));
      return;
    }

    hasPendingEntry.current = false;
    setError(undefined);
    setValue(String(page));
    if (page !== activePage) onPageChange(page);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    hasPendingEntry.current = true;
    setValue(event.target.value);
    if (error) setError(undefined);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
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

  return { value, error, onChange, onKeyDown, onFocus, onBlur };
};
