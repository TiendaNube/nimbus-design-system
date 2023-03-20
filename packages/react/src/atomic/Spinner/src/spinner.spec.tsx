import React from "react";
import { render, screen } from "@testing-library/react";

import { Spinner } from "./Spinner";
import { SpinnerProps } from "./spinner.types";

const makeSut = (rest?: SpinnerProps) => {
  render(<Spinner {...rest} data-testid="spinner-element" />);
};

describe("GIVEN <Spinner />", () => {
  describe("THEN should correctly render the submitted color", () => {
    it("THEN should correctly render the color primary-interactive", () => {
      makeSut({ color: "primary-interactive" });
      expect(
        screen.getByTestId("spinner-element").getAttribute("class")
      ).toContain("color_primary-interactive");
    });

    it("THEN should correctly render the color primary-textLow", () => {
      makeSut({ color: "primary-textLow" });
      expect(
        screen.getByTestId("spinner-element").getAttribute("class")
      ).toContain("color_primary-textLow");
    });

    it("THEN should correctly render the color success-interactive", () => {
      makeSut({ color: "success-interactive" });
      expect(
        screen.getByTestId("spinner-element").getAttribute("class")
      ).toContain("color_success-interactive");
    });

    it("THEN should correctly render the color success-textLow", () => {
      makeSut({ color: "success-textLow" });
      expect(
        screen.getByTestId("spinner-element").getAttribute("class")
      ).toContain("color_success-textLow");
    });

    it("THEN should correctly render the color danger-interactive", () => {
      makeSut({ color: "danger-interactive" });
      expect(
        screen.getByTestId("spinner-element").getAttribute("class")
      ).toContain("color_danger-interactive");
    });

    it("THEN should correctly render the color danger-textLow", () => {
      makeSut({ color: "danger-textLow" });
      expect(
        screen.getByTestId("spinner-element").getAttribute("class")
      ).toContain("color_danger-textLow");
    });

    it("THEN should correctly render the color neutral-interactive", () => {
      makeSut({ color: "neutral-interactive" });
      expect(
        screen.getByTestId("spinner-element").getAttribute("class")
      ).toContain("color_neutral-interactive");
    });

    it("THEN should correctly render the color neutral-textLow", () => {
      makeSut({ color: "neutral-textLow" });
      expect(
        screen.getByTestId("spinner-element").getAttribute("class")
      ).toContain("color_neutral-textLow");
    });
  });

  describe("THEN should correctly render the submitted size", () => {
    it("THEN should correctly render the size default", () => {
      makeSut();
      const spinner = screen.getByTestId("spinner-element");
      expect(spinner.getAttribute("style")).toMatch(/--width__\w{0,9}: 32px;/);
      expect(spinner.getAttribute("style")).toMatch(/--height__\w{0,9}: 32px;/);
    });

    it("THEN should correctly render the size large", () => {
      makeSut({ size: "large" });
      const spinner = screen.getByTestId("spinner-element");
      expect(spinner.getAttribute("style")).toMatch(/--width__\w{0,9}: 32px;/);
      expect(spinner.getAttribute("style")).toMatch(/--height__\w{0,9}: 32px;/);
    });

    it("THEN should correctly render the size medium", () => {
      makeSut({ size: "medium" });
      const spinner = screen.getByTestId("spinner-element");
      expect(spinner.getAttribute("style")).toMatch(/--width__\w{0,9}: 24px;/);
      expect(spinner.getAttribute("style")).toMatch(/--height__\w{0,9}: 24px;/);
    });

    it("THEN should correctly render the size small", () => {
      makeSut({ size: "small" });
      const spinner = screen.getByTestId("spinner-element");
      expect(spinner.getAttribute("style")).toMatch(/--width__\w{0,9}: 16px;/);
      expect(spinner.getAttribute("style")).toMatch(/--height__\w{0,9}: 16px;/);
    });

    it("THEN should correctly render the size custom", () => {
      makeSut({ size: 64 });
      const spinner = screen.getByTestId("spinner-element");
      expect(spinner.getAttribute("style")).toMatch(/--width__\w{0,9}: 64px;/);
      expect(spinner.getAttribute("style")).toMatch(/--height__\w{0,9}: 64px;/);
    });

    it("THEN should return the default size if the size sent does not exist", () => {
      // eslint-disable-next-line
      // @ts-ignore
      makeSut({ size: "test" });
      const spinner = screen.getByTestId("spinner-element");
      expect(spinner.getAttribute("style")).toMatch(/--width__\w{0,9}: 32px;/);
      expect(spinner.getAttribute("style")).toMatch(/--height__\w{0,9}: 32px;/);
    });
  });
});
