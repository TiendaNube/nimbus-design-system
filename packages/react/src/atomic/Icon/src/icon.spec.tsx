import React from "react";
import { render, screen } from "@testing-library/react";

import { Icon } from "./Icon";
import { IconProps } from "./icon.types";

const makeSut = (rest: IconProps) => {
  render(<Icon {...rest} data-testid="icon-element" />);
};

describe("GIVEN <Icon />", () => {
  describe("THEN should correctly render the submitted color", () => {
    it("THEN should correctly render the color default", () => {
      makeSut({ source: <svg /> });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_neutral-textLow");
    });

    it("THEN should correctly render the color primary-textLow", () => {
      makeSut({ source: <svg />, color: "primary-textLow" });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_primary-textLow");
    });

    it("THEN should correctly render the color primary-textHigh", () => {
      makeSut({ source: <svg />, color: "primary-textHigh" });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_primary-textHigh");
    });

    it("THEN should correctly render the color success-textLow", () => {
      makeSut({ source: <svg />, color: "success-textLow" });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_success-textLow");
    });

    it("THEN should correctly render the color success-textHigh", () => {
      makeSut({ source: <svg />, color: "success-textHigh" });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_success-textHigh");
    });

    it("THEN should correctly render the color warning-textLow", () => {
      makeSut({ source: <svg />, color: "warning-textLow" });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_warning-textLow");
    });

    it("THEN should correctly render the color warning-textHigh", () => {
      makeSut({ source: <svg />, color: "warning-textHigh" });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_warning-textHigh");
    });

    it("THEN should correctly render the color danger-textLow", () => {
      makeSut({ source: <svg />, color: "danger-textLow" });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_danger-textLow");
    });

    it("THEN should correctly render the color danger-textHigh", () => {
      makeSut({ source: <svg />, color: "danger-textHigh" });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_danger-textHigh");
    });

    it("THEN should correctly render the color neutral-textLow", () => {
      makeSut({ source: <svg />, color: "neutral-textLow" });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_neutral-textLow");
    });

    it("THEN should correctly render the color neutral-textHigh", () => {
      makeSut({ source: <svg />, color: "neutral-textHigh" });
      expect(
        screen.getByTestId("icon-element").getAttribute("class")
      ).toContain("color_neutral-textHigh");
    });
  });
});
