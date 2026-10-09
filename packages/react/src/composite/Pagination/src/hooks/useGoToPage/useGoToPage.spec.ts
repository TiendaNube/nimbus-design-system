import type {
  ChangeEvent,
  ClipboardEvent,
  FocusEvent,
  FormEvent,
  KeyboardEvent,
} from "react";
import { renderHook, act } from "@testing-library/react";

import { useGoToPage } from "./useGoToPage";
import { clampPage, keepDigits } from "./useGoToPage.definitions";
import { type UseGoToPageProps } from "./useGoToPage.types";

const onPageChange = jest.fn();

const makeSut = (initial: Partial<UseGoToPageProps> = {}) =>
  renderHook(
    (props: Partial<UseGoToPageProps>) =>
      useGoToPage({ activePage: 3, pageCount: 20, onPageChange, ...props }),
    { initialProps: initial }
  );

const change = (value: string) =>
  ({ target: { value } } as unknown as ChangeEvent<HTMLInputElement>);
const key = (k: string, isComposing = false, keyCode = 13) =>
  ({
    key: k,
    nativeEvent: { isComposing, keyCode },
    preventDefault: jest.fn(),
  } as unknown as KeyboardEvent<HTMLInputElement>);
const beforeInput = (data: string | null) =>
  ({
    data,
    preventDefault: jest.fn(),
  } as unknown as FormEvent<HTMLInputElement> & { data: string | null });
const paste = (text: string, start: number, end: number) => {
  const input = {
    selectionStart: start,
    selectionEnd: end,
    setSelectionRange: jest.fn(),
  };
  return {
    input,
    event: {
      currentTarget: input,
      clipboardData: { getData: () => text },
      preventDefault: jest.fn(),
    } as unknown as ClipboardEvent<HTMLInputElement>,
  };
};
const focusEvent = {} as FocusEvent<HTMLInputElement>;

describe("GIVEN keepDigits and clampPage", () => {
  it.each([
    ["12", "12"],
    ["-5", "5"],
    ["1e1", "11"],
    ["3.5", "35"],
    [" 7 ", "7"],
    ["abc", ""],
    ["٣", ""],
  ])("WHEN keeping the digits of %p THEN should return %p", (text, digits) => {
    expect(keepDigits(text)).toBe(digits);
  });

  it.each([
    [0, 1],
    [1, 1],
    [7, 7],
    [20, 20],
    [21, 20],
    [Infinity, 20],
  ])("WHEN clamping %p THEN should return %p", (page, expected) => {
    expect(clampPage(page, 20)).toBe(expected);
  });
});

describe("GIVEN useGoToPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("WHEN the hook runs", () => {
    it("THEN should start with the active page and no announcement", () => {
      const { result } = makeSut();
      expect(result.current.value).toBe("3");
      expect(result.current.announcement).toBeUndefined();
    });
  });

  describe("WHEN a page is typed and submitted", () => {
    it("THEN should call onPageChange once and announce it", () => {
      const { result } = makeSut();
      act(() => result.current.onFocus(focusEvent));
      act(() => result.current.onChange(change("9")));
      act(() => result.current.onKeyDown(key("Enter")));
      expect(onPageChange).toHaveBeenCalledTimes(1);
      expect(onPageChange).toHaveBeenCalledWith(9);
      expect(result.current.announcement).toEqual({ page: 9, tick: 1 });
    });

    it("AND should not submit while an IME composition is confirmed", () => {
      const { result } = makeSut();
      act(() => result.current.onChange(change("9")));
      act(() => result.current.onKeyDown(key("Enter", true)));
      expect(onPageChange).not.toHaveBeenCalled();
      act(() => result.current.onKeyDown(key("Enter")));
      expect(onPageChange).toHaveBeenCalledWith(9);
    });

    it("AND should not submit when the composition ended before keydown (keyCode 229)", () => {
      const { result } = makeSut();
      act(() => result.current.onChange(change("9")));
      act(() => result.current.onKeyDown(key("Enter", false, 229)));
      expect(onPageChange).not.toHaveBeenCalled();
    });

    it("AND should not submit on other keys", () => {
      const { result } = makeSut();
      act(() => result.current.onChange(change("9")));
      act(() => result.current.onKeyDown(key("a")));
      expect(onPageChange).not.toHaveBeenCalled();
    });

    it("AND should clamp a number above the last page", () => {
      const { result } = makeSut();
      act(() => result.current.onChange(change("50")));
      act(() => result.current.onKeyDown(key("Enter")));
      expect(onPageChange).toHaveBeenCalledWith(20);
      expect(result.current.value).toBe("20");
    });

    it("AND should clamp zero to the first page", () => {
      const { result } = makeSut();
      act(() => result.current.onChange(change("0")));
      act(() => result.current.onKeyDown(key("Enter")));
      expect(onPageChange).toHaveBeenCalledWith(1);
      expect(result.current.value).toBe("1");
    });

    it("AND should count each announcement, even for the same page", () => {
      const { result } = makeSut({ activePage: 20 });
      act(() => result.current.onChange(change("30")));
      act(() => result.current.onKeyDown(key("Enter")));
      act(() => result.current.onChange(change("40")));
      act(() => result.current.onKeyDown(key("Enter")));
      expect(onPageChange).not.toHaveBeenCalled();
      expect(result.current.announcement).toEqual({ page: 20, tick: 2 });
    });
  });

  describe("WHEN the field is emptied", () => {
    it("THEN should not navigate or announce and should show the active page", () => {
      const { result } = makeSut();
      act(() => result.current.onFocus(focusEvent));
      act(() => result.current.onChange(change("")));
      expect(result.current.value).toBe("");
      act(() => result.current.onBlur(focusEvent));
      expect(result.current.value).toBe("3");
      expect(onPageChange).not.toHaveBeenCalled();
      expect(result.current.announcement).toBeUndefined();
    });
  });

  describe("WHEN characters that are not digits arrive", () => {
    it("THEN onChange should keep only the digits", () => {
      const { result } = makeSut();
      act(() => result.current.onChange(change("-1e2.5")));
      expect(result.current.value).toBe("125");
    });

    it("AND onBeforeInput should cancel text with a non-digit", () => {
      const { result } = makeSut();
      const blocked = beforeInput("e");
      result.current.onBeforeInput(blocked);
      expect(blocked.preventDefault).toHaveBeenCalled();
      const mixed = beforeInput("1e");
      result.current.onBeforeInput(mixed);
      expect(mixed.preventDefault).toHaveBeenCalled();
    });

    it("AND onBeforeInput should let digits and deletions through", () => {
      const { result } = makeSut();
      const digit = beforeInput("4");
      result.current.onBeforeInput(digit);
      expect(digit.preventDefault).not.toHaveBeenCalled();
      const deletion = beforeInput(null);
      result.current.onBeforeInput(deletion);
      expect(deletion.preventDefault).not.toHaveBeenCalled();
    });

    it("AND onPaste should insert only the digits over the selection", () => {
      const { result } = makeSut();
      const { event, input } = paste("a1-2", 0, 1);
      act(() => result.current.onPaste(event));
      expect(event.preventDefault).toHaveBeenCalled();
      expect(result.current.value).toBe("12");
      expect(input.setSelectionRange).toHaveBeenCalledWith(2, 2);
    });

    it("AND onPaste of a text without digits should leave the value as it was", () => {
      const { result } = makeSut();
      const { event } = paste("abc", 1, 1);
      act(() => result.current.onPaste(event));
      expect(result.current.value).toBe("3");
    });
  });

  describe("WHEN activePage changes", () => {
    it("THEN should resync the value when not focused", () => {
      const { result, rerender } = makeSut();
      rerender({ activePage: 5 });
      expect(result.current.value).toBe("5");
    });

    it("AND should not touch the value while focused, then resync on blur", () => {
      const { result, rerender } = makeSut();
      act(() => result.current.onFocus(focusEvent));
      rerender({ activePage: 5 });
      expect(result.current.value).toBe("3");
      act(() => result.current.onBlur(focusEvent));
      expect(result.current.value).toBe("5");
      expect(result.current.announcement).toBeUndefined();
    });

    it("AND should keep what is being typed while focused", () => {
      const { result, rerender } = makeSut();
      act(() => result.current.onFocus(focusEvent));
      act(() => result.current.onChange(change("1")));
      rerender({ activePage: 5 });
      expect(result.current.value).toBe("1");
    });
  });

  describe("WHEN navigating from another control", () => {
    it("THEN should call onPageChange and record the arrow announcement", () => {
      const { result } = makeSut();
      act(() => result.current.navigate(7));
      expect(onPageChange).toHaveBeenCalledWith(7);
      expect(result.current.arrowAnnouncement).toEqual({ page: 7, tick: 1 });
      expect(result.current.announcement).toBeUndefined();
    });
  });
});
