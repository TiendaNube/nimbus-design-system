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
            { id: "column-1", width: "120px" },
            { id: "column-2", grow: 2 },
            { id: "column-3", grow: 1 },
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

      const columns = screen
        .getByTestId("table-element")
        .querySelectorAll("col");

      expect(columns).toHaveLength(3);
      expect(columns[0]).toHaveStyle({ width: "120px" });
    });

    it("THEN should apply minWidth to cells via column prop", () => {
      render(
        <Table
          data-testid="table-element"
          columnLayout={[
            { id: "column-1", width: "100px" },
            { id: "column-2", grow: 1, minWidth: "200px" },
            { id: "column-3", grow: 1 },
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
      expect(screen.getByTestId("cell-1")).toHaveStyle({ minWidth: "200px" });
    });
  });

  describe("WHEN minWidth and maxWidth are provided", () => {
    it("THEN should apply minWidth to the table element", () => {
      makeSut({
        minWidth: "800px",
        children: (
          <tbody>
            <tr>
              <td>My content</td>
            </tr>
          </tbody>
        ),
      });
      expect(screen.getByTestId("table-element")).toHaveStyle({
        minWidth: "800px",
      });
    });

    it("THEN should apply maxWidth to the table element", () => {
      makeSut({
        maxWidth: "1200px",
        children: (
          <tbody>
            <tr>
              <td>My content</td>
            </tr>
          </tbody>
        ),
      });
      expect(screen.getByTestId("table-element")).toHaveStyle({
        maxWidth: "1200px",
      });
    });

    it("THEN should apply both minWidth and maxWidth to the table element", () => {
      makeSut({
        minWidth: "600px",
        maxWidth: "1000px",
        children: (
          <tbody>
            <tr>
              <td>My content</td>
            </tr>
          </tbody>
        ),
      });
      const tableElement = screen.getByTestId("table-element");
      expect(tableElement).toHaveStyle({ minWidth: "600px" });
      expect(tableElement).toHaveStyle({ maxWidth: "1000px" });
    });
  });

  describe("WHEN fixed columns are provided", () => {
    it("THEN should apply sticky positioning with left offset to fixed cells", () => {
      render(
        <Table
          data-testid="table-element"
          columnLayout={[
            { id: "column-1", width: "100px", fixed: true },
            { id: "column-2", width: "150px", fixed: true },
            { id: "column-3", grow: 1 },
          ]}
        >
          <Table.Head>
            <Table.Row>
              <Table.Cell as="th" column={0} data-testid="header-0">
                Fixed Header 1
              </Table.Cell>
              <Table.Cell as="th" column={1} data-testid="header-1">
                Fixed Header 2
              </Table.Cell>
              <Table.Cell as="th" column={2} data-testid="header-2">
                Header 3
              </Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell column={0} data-testid="cell-0">
                Fixed Cell 1
              </Table.Cell>
              <Table.Cell column={1} data-testid="cell-1">
                Fixed Cell 2
              </Table.Cell>
              <Table.Cell column={2} data-testid="cell-2">
                Cell 3
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );

      // First fixed column should have left: 0px
      expect(screen.getByTestId("header-0")).toHaveStyle({ left: "0px" });
      expect(screen.getByTestId("cell-0")).toHaveStyle({ left: "0px" });

      // Second fixed column should have left: 100px (cumulative from first column)
      expect(screen.getByTestId("header-1")).toHaveStyle({ left: "100px" });
      expect(screen.getByTestId("cell-1")).toHaveStyle({ left: "100px" });

      // Non-fixed column should not have left style
      expect(screen.getByTestId("header-2")).not.toHaveStyle({ left: "0px" });
      expect(screen.getByTestId("cell-2")).not.toHaveStyle({ left: "0px" });
    });

    it("THEN should not apply fixed styles when fixed is false or undefined", () => {
      render(
        <Table
          data-testid="table-element"
          columnLayout={[
            { id: "column-1", width: "100px" },
            { id: "column-2", width: "150px", fixed: false },
            { id: "column-3", grow: 1 },
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

      // None of the cells should have left positioning
      expect(screen.getByTestId("header-0")).not.toHaveStyle({ left: "0px" });
      expect(screen.getByTestId("header-1")).not.toHaveStyle({ left: "0px" });
      expect(screen.getByTestId("cell-0")).not.toHaveStyle({ left: "0px" });
      expect(screen.getByTestId("cell-1")).not.toHaveStyle({ left: "0px" });
    });
  });
});
