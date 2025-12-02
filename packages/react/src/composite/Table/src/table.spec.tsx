import React from "react";
import { render, screen } from "@testing-library/react";

import { Table } from "./Table";
import { TableProps } from "./table.types";

const makeSut = (rest: TableProps) => {
  render(<Table {...rest} data-testid="table-element" />);
};

describe("GIVEN <Table />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render the submitted content", () => {
      makeSut({
        children: (
          <tbody>
            <tr>
              <td>My content</td>
            </tr>
          </tbody>
        ),
      });
      expect(screen.getByText("My content")).toBeDefined();
    });
  });

  describe("WHEN columnLayout is provided", () => {
    it("THEN should render a colgroup with calculated widths", () => {
      render(
        <Table
          data-testid="table-element"
          columnLayout={[
            { width: "120px" },
            { grow: 2, minWidth: "160px" },
            { grow: 1, maxWidth: "320px" },
          ]}
        >
          <tbody>
            <tr>
              <td>One</td>
              <td>Two</td>
              <td>Three</td>
            </tr>
          </tbody>
        </Table>
      );

      const columns =
        screen.getByTestId("table-element").querySelectorAll("col");

      expect(columns).toHaveLength(3);
      expect(columns[0]).toHaveStyle({ width: "120px" });
      expect(columns[1]).toHaveStyle({
        width: "calc((100% - (120px)) * 0.6667)",
        minWidth: "160px",
      });
      expect(columns[2]).toHaveStyle({
        width: "calc((100% - (120px)) * 0.3333)",
        maxWidth: "320px",
      });
    });
  });
});
