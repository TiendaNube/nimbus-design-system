import React from "react";
import { render, screen } from "@testing-library/react";

import { Group } from "./Group";
import { GroupProps } from "./group.types";

const makeSut = (rest: GroupProps) => {
  render(<Group {...rest} data-testid="group-element" />);
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
      render(<Group label={optGroupLabel}>{optGroupChildren}</Group>);
      expect(screen.getByText(optGroupChildren)).toBeTruthy();
    });
  });
});
