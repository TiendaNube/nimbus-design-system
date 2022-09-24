import React from "react";
import { render, screen } from "@testing-library/react";

import { Text } from "./Text";
import { TextProps } from "./text.types";

const content = "myText";

const makeSut = (rest?: Omit<TextProps, "children">, children = content) => {
  render(
    <Text {...rest} data-testid="text-element">
      {children}
    </Text>
  );
};

describe("GIVEN <Text />", () => {
  describe("WHEN rendered", () => {
    it("THEN should default render element type", () => {
      makeSut();
      expect(screen.getByTestId("text-element").nodeName).toEqual("P");
    });

    it('THEN should render element type="span"', () => {
      makeSut({ as: "span" });
      expect(screen.getByTestId("text-element").nodeName).toEqual("SPAN");
    });
  });

  describe("THEN should correctly render the text", () => {
    it("THEN should correctly render the text on the left", () => {
      makeSut({ textAlign: "left" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("textAlign_left");
    });

    it("THEN should correctly render the text on the center", () => {
      makeSut({ textAlign: "center" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("textAlign_center");
    });

    it("THEN should correctly render the text on the right", () => {
      makeSut({ textAlign: "right" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("textAlign_right");
    });

    it("THEN should correctly render the text on the justify", () => {
      makeSut({ textAlign: "justify" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("textAlign_justify");
    });
  });

  describe("THEN should correctly render a fontWeight", () => {
    it("THEN should correctly render a bold", () => {
      makeSut({ fontWeight: "bold" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("fontWeight_bold");
    });

    it("THEN should correctly render a regular", () => {
      makeSut({ fontWeight: "regular" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("fontWeight_regular");
    });
  });

  describe("THEN should correctly render the size", () => {
    it("THEN should correctly render the size caption", () => {
      makeSut({ fontSize: "caption" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("fontSize_caption");
    });

    it("THEN should correctly render the size base", () => {
      makeSut({ fontSize: "base" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("fontSize_base");
    });

    it("THEN should correctly render the size highlight", () => {
      makeSut({ fontSize: "highlight" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("fontSize_highlight");
    });
  });

  describe("THEN should correctly render the submitted color", () => {
    it("THEN should correctly render the color primary.background", () => {
      makeSut({ color: "primary.background" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("text.sprinkle_color_primary.background");
    });

    it("THEN should correctly render the color primary.textLow", () => {
      makeSut({ color: "primary.textLow" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("text.sprinkle_color_primary.textLow");
    });

    it("THEN should correctly render the color primary.textHigh", () => {
      makeSut({ color: "primary.textHigh" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("text.sprinkle_color_primary.textHigh");
    });

    it("THEN should correctly render the color primary.interactive", () => {
      makeSut({ color: "primary.interactive" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("text.sprinkle_color_primary.interactive");
    });

    it("THEN should correctly render the color success.background", () => {
      makeSut({ color: "success.background" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("text.sprinkle_color_success.background");
    });

    it("THEN should correctly render the color success.textLow", () => {
      makeSut({ color: "success.textLow" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("text.sprinkle_color_success.textLow");
    });

    it("THEN should correctly render the color success.textHigh", () => {
      makeSut({ color: "success.textHigh" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("text.sprinkle_color_success.textHigh");
    });

    it("THEN should correctly render the color success.interactive", () => {
      makeSut({ color: "success.interactive" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("text.sprinkle_color_success.interactive");
    });

    it("THEN should correctly render the color warning.background", () => {
      makeSut({ color: "warning.background" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("text.sprinkle_color_warning.background");
    });

    it("THEN should correctly render the color warning.textLow", () => {
      makeSut({ color: "warning.textLow" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("text.sprinkle_color_warning.textLow");
    });

    it("THEN should correctly render the color warning.textHigh", () => {
      makeSut({ color: "warning.textHigh" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("text.sprinkle_color_warning.textHigh");
    });

    it("THEN should correctly render the color warning.interactive", () => {
      makeSut({ color: "warning.interactive" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("text.sprinkle_color_warning.interactive");
    });

    it("THEN should correctly render the color danger.background", () => {
      makeSut({ color: "danger.background" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("text.sprinkle_color_danger.background");
    });

    it("THEN should correctly render the color danger.textLow", () => {
      makeSut({ color: "danger.textLow" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("text.sprinkle_color_danger.textLow");
    });

    it("THEN should correctly render the color danger.textHigh", () => {
      makeSut({ color: "danger.textHigh" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("text.sprinkle_color_danger.textHigh");
    });

    it("THEN should correctly render the color danger.interactive", () => {
      makeSut({ color: "danger.interactive" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("text.sprinkle_color_danger.interactive");
    });

    it("THEN should correctly render the color neutral.background", () => {
      makeSut({ color: "neutral.background" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("text.sprinkle_color_neutral.background");
    });

    it("THEN should correctly render the color neutral.textLow", () => {
      makeSut({ color: "neutral.textLow" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("text.sprinkle_color_neutral.textLow");
    });

    it("THEN should correctly render the color neutral.textHigh", () => {
      makeSut({ color: "neutral.textHigh" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("text.sprinkle_color_neutral.textHigh");
    });

    it("THEN should correctly render the color neutral.interactive", () => {
      makeSut({ color: "neutral.interactive" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("text.sprinkle_color_neutral.interactive");
    });
  });

  describe("THEN should correctly render the line height", () => {
    it("THEN should correctly render the line height caption", () => {
      makeSut({ lineHeight: "caption" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("lineHeight_caption");
    });

    it("THEN should correctly render the line height base", () => {
      makeSut({ lineHeight: "base" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("lineHeight_base");
    });

    it("THEN should correctly render the line height highlight", () => {
      makeSut({ lineHeight: "highlight" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("lineHeight_highlight");
    });
  });
});
