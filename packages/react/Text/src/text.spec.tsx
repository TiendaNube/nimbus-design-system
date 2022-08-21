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

  describe("THEN should correctly render a bold", () => {
    it("THEN should correctly render a bold true", () => {
      makeSut({ bold: true });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("bold_true");
    });
  });

  describe("THEN should correctly render the size", () => {
    it("THEN should correctly render the size base", () => {
      makeSut({ size: "base" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("size_base");
    });

    it("THEN should correctly render the size caption", () => {
      makeSut({ size: "caption" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("size_caption");
    });

    it("THEN should correctly render the size small", () => {
      makeSut({ size: "small" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("size_small");
    });
  });

  describe("THEN should render the appearance correctly", () => {
    it("THEN should render the primary appearance correctly", () => {
      makeSut({ appearance: "primary" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("appearance_primary");
    });

    it("THEN should render the success appearance correctly", () => {
      makeSut({ appearance: "success" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("appearance_success");
    });

    it("THEN should render the warning appearance correctly", () => {
      makeSut({ appearance: "warning" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("appearance_warning");
    });

    it("THEN should render the danger appearance correctly", () => {
      makeSut({ appearance: "danger" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("appearance_danger");
    });

    it("THEN should render the neutral appearance correctly", () => {
      makeSut({ appearance: "neutral" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("appearance_neutral");
    });
  });

  describe("THEN should correctly render the line height", () => {
    it("THEN should correctly render the line height base", () => {
      makeSut({ lineHeight: "base" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("lineHeight_base");
    });

    it("THEN should correctly render the line height caption", () => {
      makeSut({ lineHeight: "caption" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("lineHeight_caption");
    });

    it("THEN should correctly render the line height small", () => {
      makeSut({ lineHeight: "small" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("lineHeight_small");
    });
  });
});
