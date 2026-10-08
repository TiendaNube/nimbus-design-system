import React from "react";
import { render, screen, fireEvent, createEvent } from "@testing-library/react";
import { Button } from "@nimbus-ds/button/src";
import { pagination } from "@nimbus-ds/styles";

import { Pagination } from "./Pagination";
import { type PaginationProps } from "./pagination.types";

const mockedOnPageChange = jest.fn();

const makeSut = (rest: Omit<PaginationProps, "onPageChange">) => {
  render(
    <Pagination
      {...rest}
      onPageChange={mockedOnPageChange}
      data-testid="alert-element"
    />
  );
};

describe("GIVEN <Pagination />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("WHEN rendered", () => {
    it("THEN should correctly render the pagination", () => {
      makeSut({
        activePage: 1,
        pageCount: 3,
      });
      expect(screen.getByTestId("button-pagination-prev")).toBeDefined();
      expect(screen.getByTestId("button-pagination-next")).toBeDefined();
      expect(screen.getByText("1")).toBeDefined();
      expect(screen.getByText("2")).toBeDefined();
      expect(screen.getByText("3")).toBeDefined();
    });

    it("AND should render only pagination arrows", () => {
      makeSut({
        activePage: 1,
        pageCount: 3,
        showNumbers: false,
      });
      expect(screen.getByTestId("button-pagination-prev")).toBeDefined();
      expect(screen.getByTestId("button-pagination-next")).toBeDefined();
      expect(screen.queryByText("1")).toBeNull();
      expect(screen.queryByText("2")).toBeNull();
      expect(screen.queryByText("3")).toBeNull();
    });

    it("AND should render the pagination dot correctly", () => {
      makeSut({
        activePage: 1,
        pageCount: 20,
      });
      expect(screen.getByTestId("button-pagination-page-dots")).toBeDefined();
    });

    it("AND should render pagination dots correctly", () => {
      makeSut({
        activePage: 5,
        pageCount: 20,
      });
      const dots = screen.getAllByTestId("button-pagination-page-dots");
      expect(dots).toBeDefined();
      expect(dots.length).toEqual(2);
    });
  });
  describe("WHEN pagination is triggered", () => {
    it("THEN should advance to the last page", () => {
      makeSut({
        activePage: 5,
        pageCount: 20,
      });
      fireEvent.click(screen.getByText("20"));
      expect(mockedOnPageChange).toBeCalledWith(20);
    });

    it("AND should advance to the first page", () => {
      makeSut({
        activePage: 5,
        pageCount: 20,
      });
      fireEvent.click(screen.getByText("1"));
      expect(mockedOnPageChange).toBeCalledWith(1);
    });

    it("AND should return to the previous page", () => {
      makeSut({
        activePage: 19,
        pageCount: 20,
      });
      fireEvent.click(screen.getByTestId("button-pagination-prev"));
      expect(mockedOnPageChange).toBeCalledWith(18);
    });

    it("AND should return to the next page", () => {
      makeSut({
        activePage: 5,
        pageCount: 20,
      });
      fireEvent.click(screen.getByTestId("button-pagination-next"));
      expect(mockedOnPageChange).toBeCalledWith(6);
    });

    it("AND disable the button to advance the previous page", () => {
      makeSut({
        activePage: 1,
        pageCount: 20,
      });
      expect(
        screen.getByTestId<HTMLButtonElement>("button-pagination-prev").disabled
      ).toBeTruthy();
    });

    it("AND should disable the button to go back to the previous page", () => {
      makeSut({
        activePage: 20,
        pageCount: 20,
      });
      expect(
        screen.getByTestId<HTMLButtonElement>("button-pagination-next").disabled
      ).toBeTruthy();
    });
  });
  describe("WHEN using renderItem", () => {
    it("THEN should use the renderItem function to render custom buttons", () => {
      const mockRenderItem = jest.fn(({ isCurrent, pageNumber }) => (
        <Button
          as="a"
          href={`#${pageNumber}`}
          data-testid={`button-pagination-page-${pageNumber}`}
          appearance={isCurrent ? "primary" : "transparent"}
        >
          {pageNumber}
        </Button>
      ));

      makeSut({
        activePage: 2,
        pageCount: 5,
        renderItem: mockRenderItem,
      });

      expect(mockRenderItem).toBeDefined();
      expect(mockRenderItem).toBeCalledWith(
        expect.objectContaining({
          isCurrent: expect.any(Boolean),
          pageNumber: expect.any(Number),
        })
      );

      const button = screen.getByTestId("button-pagination-page-2");
      expect(button).toBeDefined();
      expect(button).toBeTruthy();

      expect(button.getAttribute("href")).toEqual("#2");

      expect(button.innerHTML).toEqual("2");

      expect(button.className).toContain("primary");
    });
  });
  describe("WHEN the navigation buttons are rendered", () => {
    it("THEN should name the previous and next buttons", () => {
      makeSut({ activePage: 2, pageCount: 3 });
      expect(screen.getByTestId("button-pagination-prev")).toHaveAttribute(
        "aria-label",
        "Previous page"
      );
      expect(screen.getByTestId("button-pagination-next")).toHaveAttribute(
        "aria-label",
        "Next page"
      );
    });

    it("AND should wrap the list in a named navigation landmark", () => {
      makeSut({ activePage: 2, pageCount: 3 });
      expect(screen.getByRole("navigation")).toHaveAttribute(
        "aria-label",
        "Pagination"
      );
    });

    it("AND should mark only the current page with aria-current", () => {
      makeSut({ activePage: 2, pageCount: 3 });
      expect(screen.getByTestId("button-pagination-page-2")).toHaveAttribute(
        "aria-current",
        "page"
      );
      expect(
        screen.getByTestId("button-pagination-page-1")
      ).not.toHaveAttribute("aria-current");
    });
  });
});

const renderPagination = (
  props: Partial<PaginationProps> &
    Pick<PaginationProps, "pageCount" | "activePage">
) => {
  const ui = (p: typeof props) => (
    <Pagination onPageChange={mockedOnPageChange} {...p} />
  );
  const utils = render(ui(props));
  return {
    ...utils,
    update: (next: typeof props) => utils.rerender(ui(next)),
  };
};

const desktopInput = () =>
  screen.queryByTestId<HTMLInputElement>("input-pagination-go-to-page");
const compactInput = () =>
  screen.getByTestId<HTMLInputElement>("input-pagination-go-to-page-compact");
const announcement = () => screen.getByTestId("pagination-announcement");
const compactAnnouncement = () =>
  screen.getByTestId("pagination-compact-announcement");

const type = (input: HTMLInputElement, text: string) => {
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value: text } });
};

describe("GIVEN <Pagination /> with the go to page input", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("WHEN showInput is not set", () => {
    it("THEN should not render the desktop input", () => {
      renderPagination({ activePage: 3, pageCount: 20 });
      expect(desktopInput()).toBeNull();
    });
  });

  describe("WHEN showInput is set", () => {
    it("THEN should render a numeric text input with a static name", () => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      const input = desktopInput() as HTMLInputElement;
      expect(input).toHaveAttribute("type", "text");
      expect(input).toHaveAttribute("inputmode", "numeric");
      expect(input).toHaveAttribute("pattern", "[0-9]*");
      expect(input).not.toHaveAttribute("min");
      expect(input).not.toHaveAttribute("max");
      expect(input).toHaveValue("3");
      expect(input).toHaveAttribute("aria-label", "Go to page");
    });

    it("AND should keep the arrows and the page numbers", () => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      expect(screen.getByTestId("button-pagination-prev")).toBeDefined();
      expect(screen.getByTestId("button-pagination-next")).toBeDefined();
      expect(screen.getByTestId("button-pagination-page-3")).toBeDefined();
    });

    it("AND should describe the input with its 'of Y' text", () => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      expect(desktopInput()).toHaveAccessibleDescription("of 20");
    });

    it("AND should only show the desktop input from the md breakpoint", () => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      const item = (desktopInput() as HTMLInputElement).closest("li");
      expect(item).toHaveClass(pagination.classnames.goToPage__desktop);
    });

    it("AND should not render the input when there are fewer than 6 pages", () => {
      renderPagination({ activePage: 1, pageCount: 5, showInput: true });
      expect(desktopInput()).toBeNull();
      expect(
        screen.queryByTestId("input-pagination-go-to-page-compact")
      ).toBeNull();
      expect(screen.queryByRole("status")).toBeNull();
    });

    it("AND should render the input when there are exactly 6 pages", () => {
      renderPagination({ activePage: 1, pageCount: 6, showInput: true });
      expect(desktopInput()).not.toBeNull();
    });
  });

  describe("WHEN the compact layout applies", () => {
    it("THEN should render first, previous, input, next and last controls without showInput", () => {
      renderPagination({ activePage: 3, pageCount: 6 });
      expect(screen.getByTestId("button-pagination-first")).toBeDefined();
      expect(screen.getByTestId("button-pagination-prev")).toBeDefined();
      expect(compactInput()).toHaveValue("3");
      expect(screen.getByTestId("button-pagination-next")).toBeDefined();
      expect(screen.getByTestId("button-pagination-last")).toBeDefined();
      expect(desktopInput()).toBeNull();
    });

    it("AND should hide the compact controls from the md breakpoint and the numbers below it", () => {
      renderPagination({ activePage: 3, pageCount: 6 });
      const { compactOnly, compactHidden } = pagination.classnames;
      expect(
        screen.getByTestId("button-pagination-first").closest("li")
      ).toHaveClass(compactOnly);
      expect(
        screen.getByTestId("button-pagination-last").closest("li")
      ).toHaveClass(compactOnly);
      expect(compactInput().closest("li")).toHaveClass(compactOnly);
      expect(
        screen.getByTestId("button-pagination-page-3").closest("li")
      ).toHaveClass(compactHidden);
      expect(
        screen.getByTestId("button-pagination-prev").closest("li")
      ).not.toHaveClass(compactOnly);
    });

    it("AND should keep renderItem for the numbers", () => {
      const renderItem = jest.fn(({ pageNumber }) => (
        <a href={`#${pageNumber}`} data-testid={`custom-${pageNumber}`}>
          {pageNumber}
        </a>
      ));
      renderPagination({ activePage: 3, pageCount: 20, renderItem });
      expect(screen.getByTestId("custom-3")).toHaveAttribute("href", "#3");
      expect(screen.getByTestId("custom-3").closest("li")).toHaveClass(
        pagination.classnames.compactHidden
      );
      expect(compactInput()).toHaveValue("3");
      expect(screen.getByTestId("button-pagination-first")).toBeDefined();
    });

    it("AND should not activate with fewer than 6 pages", () => {
      renderPagination({ activePage: 3, pageCount: 5 });
      expect(screen.queryByTestId("button-pagination-first")).toBeNull();
      expect(screen.queryByTestId("button-pagination-last")).toBeNull();
      expect(
        screen.queryByTestId("input-pagination-go-to-page-compact")
      ).toBeNull();
      expect(
        screen.getByTestId("button-pagination-page-3").closest("li")
      ).not.toHaveClass(pagination.classnames.compactHidden);
    });

    it("AND should jump to the first and last pages", () => {
      renderPagination({ activePage: 3, pageCount: 20 });
      fireEvent.click(screen.getByTestId("button-pagination-first"));
      expect(mockedOnPageChange).toHaveBeenLastCalledWith(1);
      fireEvent.click(screen.getByTestId("button-pagination-last"));
      expect(mockedOnPageChange).toHaveBeenLastCalledWith(20);
    });

    it("AND should name the jump buttons", () => {
      renderPagination({ activePage: 3, pageCount: 20 });
      expect(screen.getByTestId("button-pagination-first")).toHaveAttribute(
        "aria-label",
        "First page"
      );
      expect(screen.getByTestId("button-pagination-last")).toHaveAttribute(
        "aria-label",
        "Last page"
      );
    });

    it("AND should disable first and previous on the first page", () => {
      renderPagination({ activePage: 1, pageCount: 20 });
      expect(screen.getByTestId("button-pagination-first")).toBeDisabled();
      expect(screen.getByTestId("button-pagination-prev")).toBeDisabled();
      expect(screen.getByTestId("button-pagination-next")).toBeEnabled();
      expect(screen.getByTestId("button-pagination-last")).toBeEnabled();
    });

    it("AND should disable next and last on the last page", () => {
      renderPagination({ activePage: 20, pageCount: 20 });
      expect(screen.getByTestId("button-pagination-next")).toBeDisabled();
      expect(screen.getByTestId("button-pagination-last")).toBeDisabled();
      expect(screen.getByTestId("button-pagination-first")).toBeEnabled();
      expect(screen.getByTestId("button-pagination-prev")).toBeEnabled();
    });

    it("AND should show the 'of Y' text as the input description", () => {
      renderPagination({ activePage: 3, pageCount: 20 });
      expect(compactInput()).toHaveAccessibleDescription("of 20");
    });

    it.each([
      ["button-pagination-first", 1],
      ["button-pagination-prev", 2],
      ["button-pagination-next", 4],
      ["button-pagination-last", 20],
    ])("AND should announce the page reached with %s", (testId, page) => {
      renderPagination({ activePage: 3, pageCount: 20 });
      expect(compactAnnouncement()).toHaveTextContent("");
      fireEvent.click(screen.getByTestId(testId));
      expect(mockedOnPageChange).toHaveBeenCalledWith(page);
      expect(compactAnnouncement()).toHaveTextContent(`Page ${page} of 20`);
      expect(announcement()).toHaveTextContent("");
    });

    it("AND should keep the arrow announcements in a region hidden from the md breakpoint", () => {
      renderPagination({ activePage: 3, pageCount: 20 });
      expect(compactAnnouncement()).toHaveClass(
        pagination.classnames.compactOnly
      );
      expect(announcement()).not.toHaveClass(pagination.classnames.compactOnly);
    });
  });

  describe("WHEN a page is submitted", () => {
    it("THEN should navigate on Enter and announce the page", () => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      type(desktopInput() as HTMLInputElement, "12");
      fireEvent.keyDown(desktopInput() as HTMLInputElement, { key: "Enter" });
      expect(mockedOnPageChange).toHaveBeenCalledTimes(1);
      expect(mockedOnPageChange).toHaveBeenCalledWith(12);
      expect(announcement()).toHaveTextContent("Page 12 of 20");
    });

    it("AND should navigate on blur", () => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      type(desktopInput() as HTMLInputElement, "12");
      fireEvent.blur(desktopInput() as HTMLInputElement);
      expect(mockedOnPageChange).toHaveBeenCalledWith(12);
    });

    it("AND should work from the compact input", () => {
      renderPagination({ activePage: 3, pageCount: 20 });
      type(compactInput(), "7");
      fireEvent.keyDown(compactInput(), { key: "Enter" });
      expect(mockedOnPageChange).toHaveBeenCalledWith(7);
      expect(announcement()).toHaveTextContent("Page 7 of 20");
    });

    it("AND should not submit when Enter confirms an IME composition", () => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      const input = desktopInput() as HTMLInputElement;
      type(input, "12");
      fireEvent.keyDown(input, { key: "Enter", isComposing: true });
      expect(mockedOnPageChange).not.toHaveBeenCalled();
      fireEvent.keyDown(input, { key: "Enter" });
      expect(mockedOnPageChange).toHaveBeenCalledWith(12);
    });

    it("AND should not navigate or announce when blurred without typing", () => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      fireEvent.focus(desktopInput() as HTMLInputElement);
      fireEvent.blur(desktopInput() as HTMLInputElement);
      expect(mockedOnPageChange).not.toHaveBeenCalled();
      expect(announcement()).toHaveTextContent("");
    });

    it("AND should not call onPageChange for the active page but still announce", () => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      type(desktopInput() as HTMLInputElement, "35");
      type(desktopInput() as HTMLInputElement, "3");
      fireEvent.keyDown(desktopInput() as HTMLInputElement, { key: "Enter" });
      expect(mockedOnPageChange).not.toHaveBeenCalled();
      expect(announcement()).toHaveTextContent("Page 3 of 20");
    });
  });

  describe("WHEN the entry is out of range", () => {
    it.each([
      ["30", 20],
      ["21", 20],
      ["0", 1],
      ["000", 1],
      ["99999999999999999999999", 20],
    ])("THEN should clamp %p to page %p without an error", (entry, page) => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      const input = desktopInput() as HTMLInputElement;
      type(input, entry);
      fireEvent.keyDown(input, { key: "Enter" });
      expect(mockedOnPageChange).toHaveBeenCalledTimes(1);
      expect(mockedOnPageChange).toHaveBeenCalledWith(page);
      expect(input).toHaveValue(String(page));
      expect(input).not.toHaveAttribute("aria-invalid");
      expect(screen.queryByRole("alert")).toBeNull();
      expect(announcement()).toHaveTextContent(`Page ${page} of 20`);
    });

    it("AND should show the clamped page when the active page already is that page", () => {
      renderPagination({ activePage: 20, pageCount: 20, showInput: true });
      const input = desktopInput() as HTMLInputElement;
      type(input, "30");
      fireEvent.blur(input);
      expect(mockedOnPageChange).not.toHaveBeenCalled();
      expect(input).toHaveValue("20");
      expect(announcement()).toHaveTextContent("Page 20 of 20");
    });

    it("AND should announce the same page again on the next submission", () => {
      renderPagination({ activePage: 20, pageCount: 20, showInput: true });
      const input = desktopInput() as HTMLInputElement;
      type(input, "30");
      fireEvent.keyDown(input, { key: "Enter" });
      const first = announcement().textContent;
      type(input, "40");
      fireEvent.keyDown(input, { key: "Enter" });
      expect(announcement().textContent).not.toBe(first);
      expect(announcement()).toHaveTextContent("Page 20 of 20");
    });
  });

  describe("WHEN the input is emptied", () => {
    it("THEN should not navigate or announce and should show the active page again", () => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      const input = desktopInput() as HTMLInputElement;
      type(input, "");
      expect(input).toHaveValue("");
      fireEvent.blur(input);
      expect(mockedOnPageChange).not.toHaveBeenCalled();
      expect(announcement()).toHaveTextContent("");
      expect(input).toHaveValue("3");
    });
  });

  describe("WHEN characters other than digits are entered", () => {
    it.each([
      ["-5", "5"],
      ["1e1", "11"],
      ["3.5", "35"],
      ["abc", ""],
      ["+3", "3"],
      [" 7 ", "7"],
    ])("THEN should keep only the digits of %p", (entry, shown) => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      const input = desktopInput() as HTMLInputElement;
      type(input, entry);
      expect(input).toHaveValue(shown);
    });

    it("AND should never show an error state", () => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      const input = desktopInput() as HTMLInputElement;
      type(input, "e");
      fireEvent.blur(input);
      expect(input).not.toHaveAttribute("aria-invalid");
      expect(screen.queryByRole("alert")).toBeNull();
    });

    it("AND should cancel a non-digit before it is inserted", () => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      const input = desktopInput() as HTMLInputElement;
      const letter = createEvent.keyPress(input, {
        key: "e",
        charCode: 101,
        which: 101,
      });
      fireEvent(input, letter);
      expect(letter.defaultPrevented).toBe(true);
      const digit = createEvent.keyPress(input, {
        key: "4",
        charCode: 52,
        which: 52,
      });
      fireEvent(input, digit);
      expect(digit.defaultPrevented).toBe(false);
    });

    it("AND should paste only the digits at the caret", () => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      const input = desktopInput() as HTMLInputElement;
      fireEvent.focus(input);
      input.setSelectionRange(1, 1);
      const paste = createEvent.paste(input, {
        clipboardData: { getData: () => "1-2e" },
      });
      fireEvent(input, paste);
      expect(paste.defaultPrevented).toBe(true);
      expect(input).toHaveValue("312");
      expect(input.selectionStart).toBe(3);
    });
  });

  describe("WHEN activePage changes from another control", () => {
    it("THEN should update the displayed value on desktop and compact layouts", () => {
      const { update } = renderPagination({
        activePage: 3,
        pageCount: 20,
        showInput: true,
      });
      update({ activePage: 8, pageCount: 20, showInput: true });
      expect(desktopInput()).toHaveValue("8");
      expect(compactInput()).toHaveValue("8");
    });

    it("AND should not overwrite what is being typed while the input has focus", () => {
      const { update } = renderPagination({
        activePage: 3,
        pageCount: 20,
        showInput: true,
      });
      const input = desktopInput() as HTMLInputElement;
      type(input, "1");
      update({ activePage: 8, pageCount: 20, showInput: true });
      expect(input).toHaveValue("1");
    });

    it("AND should resync on blur when nothing was typed", () => {
      const { update } = renderPagination({
        activePage: 3,
        pageCount: 20,
        showInput: true,
      });
      const input = desktopInput() as HTMLInputElement;
      fireEvent.focus(input);
      update({ activePage: 8, pageCount: 20, showInput: true });
      expect(input).toHaveValue("3");
      fireEvent.blur(input);
      expect(input).toHaveValue("8");
      expect(mockedOnPageChange).not.toHaveBeenCalled();
    });

    it("AND should submit what was typed on blur, even if the page changed meanwhile", () => {
      const { update } = renderPagination({
        activePage: 3,
        pageCount: 20,
        showInput: true,
      });
      const input = desktopInput() as HTMLInputElement;
      type(input, "15");
      update({ activePage: 8, pageCount: 20, showInput: true });
      fireEvent.blur(input);
      expect(mockedOnPageChange).toHaveBeenCalledWith(15);
    });
  });

  describe("WHEN labels are provided", () => {
    const labels = {
      navigation: "Paginación",
      previousPage: "Página anterior",
      nextPage: "Página siguiente",
      firstPage: "Primera página",
      lastPage: "Última página",
      goToPage: "Ir a la página",
      goTo: "Ir a",
      of: "de",
      pageAnnouncement: (page: number, pageCount: number) =>
        `Página ${page} de ${pageCount}`,
    };

    it("THEN should render every text translated", () => {
      renderPagination({
        activePage: 3,
        pageCount: 20,
        showInput: true,
        labels,
      });
      expect(screen.getByRole("navigation")).toHaveAttribute(
        "aria-label",
        "Paginación"
      );
      expect(screen.getByTestId("button-pagination-prev")).toHaveAttribute(
        "aria-label",
        "Página anterior"
      );
      expect(screen.getByTestId("button-pagination-next")).toHaveAttribute(
        "aria-label",
        "Página siguiente"
      );
      expect(screen.getByTestId("button-pagination-first")).toHaveAttribute(
        "aria-label",
        "Primera página"
      );
      expect(screen.getByTestId("button-pagination-last")).toHaveAttribute(
        "aria-label",
        "Última página"
      );
      expect(desktopInput()).toHaveAttribute("aria-label", "Ir a la página");
      expect(desktopInput()).toHaveAccessibleDescription("de 20");
      expect(screen.getByText("Ir a")).toBeDefined();
    });

    it("AND should announce with the translated text", () => {
      renderPagination({
        activePage: 3,
        pageCount: 20,
        showInput: true,
        labels,
      });
      type(desktopInput() as HTMLInputElement, "30");
      fireEvent.keyDown(desktopInput() as HTMLInputElement, { key: "Enter" });
      expect(announcement()).toHaveTextContent("Página 20 de 20");
    });

    it("AND should fall back to English for omitted or empty texts", () => {
      renderPagination({
        activePage: 3,
        pageCount: 20,
        labels: { previousPage: "", navigation: "" },
      });
      expect(screen.getByTestId("button-pagination-prev")).toHaveAttribute(
        "aria-label",
        "Previous page"
      );
      expect(screen.getByRole("navigation")).toHaveAttribute(
        "aria-label",
        "Pagination"
      );
      expect(screen.getByTestId("button-pagination-next")).toHaveAttribute(
        "aria-label",
        "Next page"
      );
    });

    it("AND should fall back to the English announcement when the function returns nothing", () => {
      renderPagination({
        activePage: 3,
        pageCount: 20,
        labels: { pageAnnouncement: () => "" },
      });
      fireEvent.click(screen.getByTestId("button-pagination-next"));
      expect(compactAnnouncement()).toHaveTextContent("Page 4 of 20");
    });
  });
});
