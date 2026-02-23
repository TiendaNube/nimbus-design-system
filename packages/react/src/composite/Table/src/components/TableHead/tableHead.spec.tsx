import React from "react";
import { render, screen } from "@testing-library/react";

import { TableHead } from "./TableHead";
import { type TableHeadProps } from "./tableHead.types";

const makeSut = (rest: TableHeadProps) => {
  render(
    <table>
      <TableHead {...rest} data-testid="table-element" />
    </table>
  );
};

describe("GIVEN <TableHead />", () => {
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
