import React from "react";
import { render, screen } from "@testing-library/react";

import { Stack } from "./Stack";
import { StackProps } from "./stack.types";

const makeSut = (props: StackProps) => {
  render(<Stack {...props} data-testid="stack-element" />);
};

describe("GIVEN <Stack />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render default responsive styles", () => {
      makeSut({
        height: "10rem",
        width: "50rem",
      });
      const stack = screen.getByTestId("stack-element");
      expect(stack.getAttribute("style")).toMatch(
        /--width-xs__\w{0,9}: 50rem;/
      );
      expect(stack.getAttribute("style")).toMatch(
        /--height-xs__\w{0,9}: 10rem;/
      );
    });

    it("THEN should render responsive styles correctly", () => {
      makeSut({
        display: { lg: "flex", md: "grid", xs: "block" },
      });
      const stack = screen.getByTestId("stack-element");
      expect(stack.getAttribute("class")).toContain("block-xs");
      expect(stack.getAttribute("class")).toMatch("grid-md");
      expect(stack.getAttribute("class")).toMatch("flex-lg");
    });
  });
});
