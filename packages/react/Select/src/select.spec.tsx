import React from "react";
import { render, screen } from "@testing-library/react";

import { Select } from "./Select";
import { SelectProps } from "./select.types";

const makeSut = (rest: SelectProps) => {
  render(<Select {...rest} data-testid="select-element" />);
};

const selectName = "myName";
const selectId = "myId";
const selectChildren = "myText";

describe("GIVEN <Select />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render the name", () => {
      makeSut({
        name: selectName,
        id: selectId,
        children: selectChildren,
      });
      expect(screen.getByRole<HTMLSelectElement>("combobox").name).toContain(
        selectName
      );
    });

    it("THEN should render the id", () => {
      makeSut({
        name: selectName,
        id: selectId,
        children: selectChildren,
      });
      expect(screen.getByRole<HTMLSelectElement>("combobox").id).toContain(
        selectId
      );
    });

    it("THEN should render the children", () => {
      render(
        <Select name={selectName} id={selectId}>
          {selectChildren}
        </Select>
      );
      expect(screen.getByText(selectChildren)).toBeTruthy();
    });
  });
});
