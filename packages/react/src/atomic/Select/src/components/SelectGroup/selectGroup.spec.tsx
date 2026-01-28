import React from "react";
import { render, screen } from "@testing-library/react";

import { SelectGroup } from "./SelectGroup";
import type { SelectGroupProps } from "./selectGroup.types";

const makeSut = (rest: SelectGroupProps) => {
  render(<SelectGroup {...rest} data-testid="group-element" />);
};

const optGroupLabel = "myLabel";
const optGroupChildren = "myText";

describe("GIVEN <Group />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render the label", () => {
      makeSut({ label: optGroupLabel, children: optGroupChildren });
      expect(screen.getByRole<HTMLOptGroupElement>("group").label).toContain(
        optGroupLabel
      );
    });

    it("THEN should render the children", () => {
      render(
        <SelectGroup label={optGroupLabel}>{optGroupChildren}</SelectGroup>
      );
      expect(screen.getByText(optGroupChildren)).toBeTruthy();
    });
  });
});
