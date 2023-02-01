import React from "react";
import { render, screen } from "@testing-library/react";

import { TableBody } from "./TableBody";
import { TableBodyProps } from "./tableBody.types";

const makeSut = (rest: TableBodyProps) => {
  render(
    <table>
      <TableBody {...rest} data-testid="table-element" />
    </table>
  );
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
