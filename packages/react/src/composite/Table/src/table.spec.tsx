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
          columnLayout={[{ width: "120px" }, { grow: 2 }, { grow: 1 }]}
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
    });

    it("THEN should apply minWidth and maxWidth to cells via column prop", () => {
      render(
        <Table
          data-testid="table-element"
          columnLayout={[
            { width: "100px" },
            { grow: 1, minWidth: "200px" },
            { grow: 1, maxWidth: "150px" },
          ]}
        >
          <Table.Head>
            <Table.Row>
              <Table.Cell as="th" column={0} data-testid="header-0">
                Header 1
              </Table.Cell>
              <Table.Cell as="th" column={1} data-testid="header-1">
                Header 2
              </Table.Cell>
              <Table.Cell as="th" column={2} data-testid="header-2">
                Header 3
              </Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell column={0} data-testid="cell-0">
                Cell 1
              </Table.Cell>
              <Table.Cell column={1} data-testid="cell-1">
                Cell 2
              </Table.Cell>
              <Table.Cell column={2} data-testid="cell-2">
                Cell 3
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );

      expect(screen.getByTestId("header-1")).toHaveStyle({ minWidth: "200px" });
      expect(screen.getByTestId("header-2")).toHaveStyle({ maxWidth: "150px" });
      expect(screen.getByTestId("cell-1")).toHaveStyle({ minWidth: "200px" });
      expect(screen.getByTestId("cell-2")).toHaveStyle({ maxWidth: "150px" });
    });
  });
});
