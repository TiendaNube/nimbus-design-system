import React from "react";
import { render, screen } from "@testing-library/react";

import { IconButton } from "./IconButton";
import { IconButtonProps } from "./iconButton.types";

const makeSut = (rest: IconButtonProps) => {
  render(<IconButton {...rest} data-testid="icon-button-element" />);
};

describe("GIVEN <IconButton />", () => {
  describe("WHEN rendered", () => {
    it("THEN should default render element type", () => {
      makeSut({ source: <div /> });
      expect(screen.getByRole("button")).toBeDefined();
    });

    it('THEN should render element type="div"', () => {
      makeSut({ as: "div", source: <div /> });
      expect(screen.getByTestId("icon-button-element").nodeName).toEqual("DIV");
    });

    it("THEN should render icon color correctly", () => {
      makeSut({ as: "div", source: <div /> });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_primary.interactive");
    });
  });
});
