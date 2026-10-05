import type { ChangeEvent, FocusEvent, KeyboardEvent } from "react";
import { renderHook, act } from "@testing-library/react";

import { useGoToPage } from "./useGoToPage";
import { parsePage } from "./useGoToPage.definitions";
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
const key = (k: string) =>
  ({
    key: k,
    preventDefault: jest.fn(),
  } as unknown as KeyboardEvent<HTMLInputElement>);
const focusEvent = {} as FocusEvent<HTMLInputElement>;

describe("GIVEN parsePage", () => {
  it.each([
    ["1", 1],
    [" 20 ", 20],
    ["007", 7],
  ])("WHEN %p THEN should return %p", (text, expected) => {
    expect(parsePage(text, 20)).toBe(expected);
  });

  it.each(["", "  ", "0", "21", "-1", "1.5", "abc", "1e1x"])(
    "WHEN %p THEN should be invalid",
    (text) => {
      expect(parsePage(text, 20)).toBeUndefined();
    }
  );
});

describe("GIVEN useGoToPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("WHEN the hook runs", () => {
    it("THEN should start with the active page and no error", () => {
      const { result } = makeSut();
      expect(result.current.value).toBe("3");
      expect(result.current.error).toBeUndefined();
    });
  });

  describe("WHEN a valid page is typed and submitted", () => {
    it("THEN should call onPageChange once and keep no error", () => {
      const { result } = makeSut();
      act(() => result.current.onFocus(focusEvent));
      act(() => result.current.onChange(change("9")));
      act(() => result.current.onKeyDown(key("Enter")));
      expect(onPageChange).toHaveBeenCalledTimes(1);
      expect(onPageChange).toHaveBeenCalledWith(9);
      expect(result.current.error).toBeUndefined();
    });

    it("AND should not submit on other keys", () => {
      const { result } = makeSut();
      act(() => result.current.onChange(change("9")));
      act(() => result.current.onKeyDown(key("a")));
      expect(onPageChange).not.toHaveBeenCalled();
    });
  });

  describe("WHEN an invalid page is submitted", () => {
    it("THEN should keep the typed value and set the error", () => {
      const { result } = makeSut();
      act(() => result.current.onFocus(focusEvent));
      act(() => result.current.onChange(change("50")));
      act(() => result.current.onBlur(focusEvent));
      expect(result.current.value).toBe("50");
      expect(result.current.error).toBe("Enter a page between 1 and 20.");
      expect(onPageChange).not.toHaveBeenCalled();
    });

    it("AND should clear the error on the next change", () => {
      const { result } = makeSut();
      act(() => result.current.onChange(change("50")));
      act(() => result.current.onKeyDown(key("Enter")));
      expect(result.current.error).toBeDefined();
      act(() => result.current.onChange(change("5")));
      expect(result.current.error).toBeUndefined();
    });
  });

  describe("WHEN activePage changes", () => {
    it("THEN should resync the value and clear the error when not focused", () => {
      const { result, rerender } = makeSut();
      act(() => result.current.onChange(change("50")));
      act(() => result.current.onKeyDown(key("Enter")));
      rerender({ activePage: 5 });
      expect(result.current.value).toBe("5");
      expect(result.current.error).toBeUndefined();
    });

    it("AND should not touch the value while focused, then resync on blur", () => {
      const { result, rerender } = makeSut();
      act(() => result.current.onFocus(focusEvent));
      rerender({ activePage: 5 });
      expect(result.current.value).toBe("3");
      act(() => result.current.onBlur(focusEvent));
      expect(result.current.value).toBe("5");
    });

    it("AND should keep what is being typed while focused", () => {
      const { result, rerender } = makeSut();
      act(() => result.current.onFocus(focusEvent));
      act(() => result.current.onChange(change("1")));
      rerender({ activePage: 5 });
      expect(result.current.value).toBe("1");
    });
  });
});
