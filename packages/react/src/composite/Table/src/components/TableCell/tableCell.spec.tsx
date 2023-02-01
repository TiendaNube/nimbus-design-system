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
    <table>
      <tbody>
        <tr>
          <TableCell {...rest} data-testid="table-element">
            {children}
          </TableCell>
        </tr>
      </tbody>
    </table>
  );
};

describe("GIVEN <TableCell />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render the submitted content", () => {
      makeSut();
      expect(screen.getByText("My content")).toBeDefined();
    });
  });
});
