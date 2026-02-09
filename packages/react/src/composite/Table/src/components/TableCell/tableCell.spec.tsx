import React from "react";
import { render, screen } from "@testing-library/react";

import { TableCell } from "./TableCell";
import { type TableCellProps } from "./tableCell.types";
import { TableContext } from "../../contexts";

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

  describe("WHEN rendered with column prop inside Table context", () => {
    it("THEN should apply minWidth from columnLayout", () => {
      render(
        <TableContext.Provider
          value={{
            columnLayout: [
              { id: "column-1", width: "100px" },
              { id: "column-2", grow: 1, minWidth: "200px" },
            ],
          }}
        >
          <table>
            <tbody>
              <tr>
                <TableCell column={1} data-testid="cell-with-min">
                  Content
                </TableCell>
              </tr>
            </tbody>
          </table>
        </TableContext.Provider>
      );

      expect(screen.getByTestId("cell-with-min")).toHaveStyle({
        minWidth: "200px",
      });
    });

    it("THEN should not apply constraints when column prop is not provided", () => {
      render(
        <TableContext.Provider
          value={{
            columnLayout: [{ id: "column-1", grow: 1, minWidth: "200px" }],
          }}
        >
          <table>
            <tbody>
              <tr>
                <TableCell data-testid="cell-no-column">Content</TableCell>
              </tr>
            </tbody>
          </table>
        </TableContext.Provider>
      );

      const cell = screen.getByTestId("cell-no-column");
      expect(cell).not.toHaveStyle({ minWidth: "200px" });
    });
  });
});
