import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@nimbus-ds/button/src";

import { Pagination } from "./Pagination";
import { PaginationProps } from "./pagination.types";

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
});
