import React from "react";
import { render, screen } from "@testing-library/react";

import { Box } from "./Box";
import { BoxProps } from "./box.types";

const makeSut = (props: BoxProps) => {
  render(<Box {...props} data-testid="box-element" />);
};

describe("GIVEN <Box />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render default responsive styles", () => {
      makeSut({
        height: "10rem",
        width: "50rem",
      });
      const box = screen.getByTestId("box-element");
      expect(box.getAttribute("style")).toMatch(/--width-xs__\w{0,9}: 50rem;/);
      expect(box.getAttribute("style")).toMatch(/--height-xs__\w{0,9}: 10rem;/);
    });

    it("THEN should render responsive styles correctly", () => {
      makeSut({
        height: { lg: "10rem", md: "8rem", xs: "2rem" },
      });
      const box = screen.getByTestId("box-element");
      expect(box.getAttribute("style")).toMatch(/--height-xs__\w{0,9}: 2rem;/);
      expect(box.getAttribute("style")).toMatch(/--height-md__\w{0,9}: 8rem;/);
      expect(box.getAttribute("style")).toMatch(/--height-lg__\w{0,9}: 10rem;/);
    });
  });
});
