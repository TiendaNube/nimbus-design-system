import React from "react";
import { render, screen } from "@testing-library/react";

import { TableCell } from "./TableCell";
import { TableCellProps } from "./tableCell.types";

const cellContent = "My content";

const makeSut = (
  rest?: Omit<TableCellProps, "children">,
  children = cellContent
) => {
  render(
    <TableCell {...rest} data-testid="table-element">
      {children}
    </TableCell>
  );
};

describe("GIVEN <TableCell />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render the submitted content", () => {
      makeSut();
      expect(screen.getByText("My content")).toBeDefined();
    });
  });

  describe("THEN should correctly render the submitted padding", () => {
    it("THEN should correctly render the padding default", () => {
      makeSut();
      expect(
        screen.getByRole<HTMLTableCellElement>("cell").getAttribute("class")
      ).toContain("");
    });

    it("THEN should correctly render the padding base", () => {
      makeSut({ padding: "base" });
      expect(
        screen.getByRole<HTMLTableCellElement>("cell").getAttribute("class")
      ).toMatch("padding-base");
    });

    it("THEN should correctly render the padding none", () => {
      makeSut({ padding: "none" });
      expect(
        screen.getByRole<HTMLTableCellElement>("cell").getAttribute("class")
      ).toMatch("padding-none");
    });
  });
});
