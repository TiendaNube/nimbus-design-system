import React from "react";
import { render, screen } from "@testing-library/react";

import { IconButton } from "./IconButton";
import type { IconButtonProps } from "./iconButton.types";

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
      ).toContain("color_neutral-textHigh");
    });

    it("THEN should render provided icon color", () => {
      makeSut({ as: "div", source: <div />, color: "primary-textHigh" });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_primary-textHigh");
    });
  });

  describe("WHEN rendered with ai-generative appearance", () => {
    it("THEN should render ai-generative appearance class", () => {
      makeSut({ appearance: "ai-generative", source: <div /> });
      expect(
        screen.getByTestId("icon-button-element").getAttribute("class")
      ).toContain("appearance_ai-generative");
    });
  });
});
