import React from "react";
import { render, screen } from "@testing-library/react";

import { TableBody } from "./TableBody";
import { TableBodyProps } from "./tableBody.types";

const makeSut = (rest: TableBodyProps) => {
  render(<TableBody {...rest} data-testid="table-element" />);
};

describe("GIVEN <TableBody />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render the submitted content", () => {
      makeSut({
        children: (
          <tr>
            <td>My content</td>
          </tr>
        ),
      });
      expect(screen.getByText("My content")).toBeDefined();
    });
  });
});
