import React from "react";
import { render, screen } from "@testing-library/react";

import { Body } from "./Body";
import { BodyProps } from "./body.types";

const makeSut = (props: BodyProps) => {
  render(<Body {...props} data-testid="body-element" />);
};

describe("GIVEN <Body />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render the submitted content", () => {
      makeSut({ children: "My content" });
      expect(screen.getByText("My content")).toBeDefined();
    });
  });

  describe("THEN should correctly render the submitted padding", () => {
    it("THEN should correctly render the padding default", () => {
      makeSut({ children: "My content" });
      expect(
        screen.getByTestId("body-element").getAttribute("class")
      ).toContain("");
    });

    it("THEN should correctly render the padding none", () => {
      makeSut({ padding: "none", children: "My content" });
      expect(screen.getByTestId("body-element").getAttribute("style")).toMatch(
        /--padding-xs__\w{0,9}: 0;/
      );
    });

    it("THEN should correctly render the padding base", () => {
      makeSut({ padding: "base", children: "My content" });
      expect(screen.getByTestId("body-element").getAttribute("style")).toMatch(
        /--padding-xs__\w{0,9}: var\(--spacing-4__\w{0,8}\);/
      );
    });
  });
});
