import React from "react";
import { render, screen } from "@testing-library/react";

import { TableHead } from "./TableHead";
import { TableHeadProps } from "./tableHead.types";

const makeSut = (rest: TableHeadProps) => {
  render(<TableHead {...rest} data-testid="table-element" />);
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
