import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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
      expect(
        screen.getByTestId("button-pagination-prev").getAttribute("aria-label")
      ).toBe("Previous page");
      expect(
        screen.getByTestId("button-pagination-next").getAttribute("aria-label")
      ).toBe("Next page");
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
    it("THEN should render a native number input with the page range and a static name", () => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      const input = desktopInput() as HTMLInputElement;
      expect(input.type).toBe("number");
      expect(input.min).toBe("1");
      expect(input.max).toBe("20");
      expect(input.value).toBe("3");
      expect(input.getAttribute("aria-label")).toBe("Go to page");
    });

    it("AND should keep the arrows and the page numbers", () => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      expect(screen.getByTestId("button-pagination-prev")).toBeDefined();
      expect(screen.getByTestId("button-pagination-next")).toBeDefined();
      expect(screen.getByTestId("button-pagination-page-3")).toBeDefined();
    });

    it("AND should describe the input with its 'of Y' text", () => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      const describedBy = (desktopInput() as HTMLInputElement).getAttribute(
        "aria-describedby"
      );
      expect(describedBy).toBeTruthy();
      expect(document.getElementById(describedBy as string)?.textContent).toBe(
        "of 20"
      );
    });

    it("AND should only show the desktop input from the md breakpoint", () => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      const item = (desktopInput() as HTMLInputElement).closest("li");
      expect(item?.className).toContain(
        pagination.classnames.goToPage__desktop
      );
    });

    it("AND should not render the input when there are fewer than 6 pages", () => {
      renderPagination({ activePage: 1, pageCount: 5, showInput: true });
      expect(desktopInput()).toBeNull();
      expect(
        screen.queryByTestId("input-pagination-go-to-page-compact")
      ).toBeNull();
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
      expect(compactInput().value).toBe("3");
      expect(screen.getByTestId("button-pagination-next")).toBeDefined();
      expect(screen.getByTestId("button-pagination-last")).toBeDefined();
      expect(desktopInput()).toBeNull();
    });

    it("AND should hide the compact controls from the md breakpoint and the numbers below it", () => {
      renderPagination({ activePage: 3, pageCount: 6 });
      const { compactOnly, compactHidden } = pagination.classnames;
      expect(
        screen.getByTestId("button-pagination-first").closest("li")?.className
      ).toContain(compactOnly);
      expect(
        screen.getByTestId("button-pagination-last").closest("li")?.className
      ).toContain(compactOnly);
      expect(compactInput().closest("li")?.className).toContain(compactOnly);
      expect(
        screen.getByTestId("button-pagination-page-3").closest("li")?.className
      ).toContain(compactHidden);
      expect(
        screen.getByTestId("button-pagination-prev").closest("li")?.className ??
          ""
      ).not.toContain(compactOnly);
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
          ?.className ?? ""
      ).not.toContain(pagination.classnames.compactHidden);
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
      expect(
        screen.getByTestId("button-pagination-first").getAttribute("aria-label")
      ).toBe("First page");
      expect(
        screen.getByTestId("button-pagination-last").getAttribute("aria-label")
      ).toBe("Last page");
    });

    it("AND should disable first and previous on the first page", () => {
      renderPagination({ activePage: 1, pageCount: 20 });
      expect(
        screen.getByTestId<HTMLButtonElement>("button-pagination-first")
          .disabled
      ).toBe(true);
      expect(
        screen.getByTestId<HTMLButtonElement>("button-pagination-prev").disabled
      ).toBe(true);
      expect(
        screen.getByTestId<HTMLButtonElement>("button-pagination-next").disabled
      ).toBe(false);
      expect(
        screen.getByTestId<HTMLButtonElement>("button-pagination-last").disabled
      ).toBe(false);
    });

    it("AND should disable next and last on the last page", () => {
      renderPagination({ activePage: 20, pageCount: 20 });
      expect(
        screen.getByTestId<HTMLButtonElement>("button-pagination-next").disabled
      ).toBe(true);
      expect(
        screen.getByTestId<HTMLButtonElement>("button-pagination-last").disabled
      ).toBe(true);
      expect(
        screen.getByTestId<HTMLButtonElement>("button-pagination-first")
          .disabled
      ).toBe(false);
      expect(
        screen.getByTestId<HTMLButtonElement>("button-pagination-prev").disabled
      ).toBe(false);
    });

    it("AND should show the 'of Y' text as the input description", () => {
      renderPagination({ activePage: 3, pageCount: 20 });
      const describedBy = compactInput().getAttribute(
        "aria-describedby"
      ) as string;
      expect(
        document.getElementById(describedBy.split(" ")[0])?.textContent
      ).toBe("of 20");
    });
  });

  describe("WHEN a page is submitted", () => {
    it("THEN should navigate on Enter", () => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      type(desktopInput() as HTMLInputElement, "12");
      fireEvent.keyDown(desktopInput() as HTMLInputElement, { key: "Enter" });
      expect(mockedOnPageChange).toHaveBeenCalledTimes(1);
      expect(mockedOnPageChange).toHaveBeenCalledWith(12);
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
    });

    it("AND should not navigate when blurred without typing", () => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      fireEvent.focus(desktopInput() as HTMLInputElement);
      fireEvent.blur(desktopInput() as HTMLInputElement);
      expect(mockedOnPageChange).not.toHaveBeenCalled();
    });

    it("AND should not navigate to the page that is already active", () => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      type(desktopInput() as HTMLInputElement, "3");
      fireEvent.keyDown(desktopInput() as HTMLInputElement, { key: "Enter" });
      expect(mockedOnPageChange).not.toHaveBeenCalled();
    });
  });

  describe("WHEN the entry is invalid", () => {
    it.each(["0", "21", "-3", "2.5", ""])(
      "THEN should reject %p, show the error and not navigate",
      (entry) => {
        renderPagination({ activePage: 3, pageCount: 20, showInput: true });
        const input = desktopInput() as HTMLInputElement;
        type(input, entry);
        fireEvent.keyDown(input, { key: "Enter" });
        expect(mockedOnPageChange).not.toHaveBeenCalled();
        expect(
          screen.getByText("Enter a page between 1 and 20.")
        ).toBeDefined();
        expect(input.getAttribute("aria-invalid")).toBe("true");
      }
    );

    it("AND should keep the invalid text and the error after blur", () => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      const input = desktopInput() as HTMLInputElement;
      type(input, "99");
      fireEvent.blur(input);
      expect(input.value).toBe("99");
      expect(screen.getByText("Enter a page between 1 and 20.")).toBeDefined();
      expect(mockedOnPageChange).not.toHaveBeenCalled();
    });

    it("AND should keep the invalid text when focusing and blurring again without typing", () => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      const input = desktopInput() as HTMLInputElement;
      type(input, "99");
      fireEvent.blur(input);
      fireEvent.focus(input);
      fireEvent.blur(input);
      expect(input.value).toBe("99");
      expect(screen.getByText("Enter a page between 1 and 20.")).toBeDefined();
    });

    it("AND should wire the error to the input description", () => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      const input = desktopInput() as HTMLInputElement;
      type(input, "99");
      fireEvent.blur(input);
      const ids = (input.getAttribute("aria-describedby") as string).split(" ");
      const texts = ids.map((id) => document.getElementById(id)?.textContent);
      expect(texts).toContain("Enter a page between 1 and 20.");
    });

    it("AND should announce the error as an alert", () => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      const input = desktopInput() as HTMLInputElement;
      type(input, "99");
      fireEvent.blur(input);
      expect(screen.getByRole("alert").textContent).toBe(
        "Enter a page between 1 and 20."
      );
    });

    it("AND should reject scientific notation", () => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      const input = desktopInput() as HTMLInputElement;
      type(input, "1e1");
      fireEvent.keyDown(input, { key: "Enter" });
      expect(mockedOnPageChange).not.toHaveBeenCalled();
      expect(screen.getByRole("alert")).toBeDefined();
    });

    it("AND should clear the error on the next keystroke", () => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      const input = desktopInput() as HTMLInputElement;
      type(input, "99");
      fireEvent.blur(input);
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: "9" } });
      expect(screen.queryByText("Enter a page between 1 and 20.")).toBeNull();
      expect(input.getAttribute("aria-invalid")).toBeNull();
    });

    it("AND should clear the error on a successful submit", () => {
      renderPagination({ activePage: 3, pageCount: 20, showInput: true });
      const input = desktopInput() as HTMLInputElement;
      type(input, "99");
      fireEvent.keyDown(input, { key: "Enter" });
      fireEvent.change(input, { target: { value: "9" } });
      fireEvent.keyDown(input, { key: "Enter" });
      expect(screen.queryByText("Enter a page between 1 and 20.")).toBeNull();
      expect(mockedOnPageChange).toHaveBeenCalledWith(9);
    });

    it("AND should clear a stale error when activePage changes from another control", () => {
      const { update } = renderPagination({
        activePage: 3,
        pageCount: 20,
        showInput: true,
      });
      const input = desktopInput() as HTMLInputElement;
      type(input, "99");
      fireEvent.blur(input);
      expect(screen.getByText("Enter a page between 1 and 20.")).toBeDefined();
      update({ activePage: 4, pageCount: 20, showInput: true });
      expect(screen.queryByText("Enter a page between 1 and 20.")).toBeNull();
      expect(input.value).toBe("4");
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
      expect((desktopInput() as HTMLInputElement).value).toBe("8");
      expect(compactInput().value).toBe("8");
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
      expect(input.value).toBe("1");
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
      expect(input.value).toBe("3");
      fireEvent.blur(input);
      expect(input.value).toBe("8");
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
});
