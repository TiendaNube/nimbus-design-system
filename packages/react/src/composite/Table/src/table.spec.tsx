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
});
