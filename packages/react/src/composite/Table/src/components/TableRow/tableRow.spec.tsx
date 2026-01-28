import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { TableRow } from "./TableRow";
import type { TableRowProps } from "./tableRow.types";

const mockedClickFunction = jest.fn();

const cellChildren = <td>My content</td>;

const makeSut = (
  rest?: Omit<TableRowProps, "children">,
  children = cellChildren
) => {
  render(
    <table>
      <tbody>
        <TableRow {...rest} data-testid="table-element">
          {children}
        </TableRow>
      </tbody>
    </table>
  );
};

describe("GIVEN <TableRow />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render the submitted content", () => {
      makeSut();
      expect(screen.getByText("My content")).toBeDefined();
    });

    it("THEN should correctly execute the onClick function", () => {
      makeSut({
        onClick: mockedClickFunction,
      });
      const rowClick = screen.getByRole<HTMLTableRowElement>("row");
      fireEvent.click(rowClick);
      expect(mockedClickFunction).toBeCalled();
    });

    it("THEN should correctly render the id", () => {
      makeSut({
        id: "myId",
      });
      expect(screen.getByRole<HTMLTableRowElement>("row").id).toContain("myId");
    });
  });
});
