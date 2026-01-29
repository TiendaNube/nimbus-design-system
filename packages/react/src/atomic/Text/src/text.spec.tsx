import React from "react";
import { render, screen } from "@testing-library/react";

import { Text } from ".";
import { type TextProps } from "./text.types";

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
      ).toContain("textAlign-left");
    });

    it("THEN should correctly render the text on the center", () => {
      makeSut({ textAlign: "center" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("textAlign-center");
    });

    it("THEN should correctly render the text on the right", () => {
      makeSut({ textAlign: "right" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("textAlign-right");
    });

    it("THEN should correctly render the text on the justify", () => {
      makeSut({ textAlign: "justify" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("textAlign-justify");
    });
  });

  describe("THEN should correctly render a fontWeight", () => {
    it("THEN should correctly render a bold", () => {
      makeSut({ fontWeight: "bold" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("fontWeight-bold");
    });

    it("THEN should correctly render a medium", () => {
      makeSut({ fontWeight: "medium" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("fontWeight-medium");
    });

    it("THEN should correctly render a regular", () => {
      makeSut({ fontWeight: "regular" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("fontWeight-regular");
    });
  });

  describe("THEN should correctly render the size", () => {
    it("THEN should correctly render the size caption", () => {
      makeSut({ fontSize: "caption" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("fontSize-caption");
    });

    it("THEN should correctly render the size base", () => {
      makeSut({ fontSize: "base" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("fontSize-base");
    });

    it("THEN should correctly render the size highlight", () => {
      makeSut({ fontSize: "highlight" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("fontSize-highlight");
    });
  });

  describe("THEN should correctly render the submitted color", () => {
    it("THEN should correctly render the color primary-textLow", () => {
      makeSut({ color: "primary-textLow" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("color-primary-textLow");
    });

    it("THEN should correctly render the color primary-textHigh", () => {
      makeSut({ color: "primary-textHigh" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("color-primary-textHigh");
    });

    it("THEN should correctly render the color primary-interactive", () => {
      makeSut({ color: "primary-interactive" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("color-primary-interactive");
    });

    it("THEN should correctly render the color success-textLow", () => {
      makeSut({ color: "success-textLow" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("color-success-textLow");
    });

    it("THEN should correctly render the color success-textHigh", () => {
      makeSut({ color: "success-textHigh" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("color-success-textHigh");
    });

    it("THEN should correctly render the color success-interactive", () => {
      makeSut({ color: "success-interactive" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("color-success-interactive");
    });

    it("THEN should correctly render the color warning-textLow", () => {
      makeSut({ color: "warning-textLow" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("color-warning-textLow");
    });

    it("THEN should correctly render the color warning-textHigh", () => {
      makeSut({ color: "warning-textHigh" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("color-warning-textHigh");
    });

    it("THEN should correctly render the color warning-interactive", () => {
      makeSut({ color: "warning-interactive" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("color-warning-interactive");
    });

    it("THEN should correctly render the color danger-textLow", () => {
      makeSut({ color: "danger-textLow" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("color-danger-textLow");
    });

    it("THEN should correctly render the color danger-textHigh", () => {
      makeSut({ color: "danger-textHigh" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("color-danger-textHigh");
    });

    it("THEN should correctly render the color danger-interactive", () => {
      makeSut({ color: "danger-interactive" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("color-danger-interactive");
    });

    it("THEN should correctly render the color neutral-background", () => {
      makeSut({ color: "neutral-background" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("color-neutral-background");
    });

    it("THEN should correctly render the color neutral-textLow", () => {
      makeSut({ color: "neutral-textLow" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("color-neutral-textLow");
    });

    it("THEN should correctly render the color neutral-textHigh", () => {
      makeSut({ color: "neutral-textHigh" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("color-neutral-textHigh");
    });

    it("THEN should correctly render the color neutral-interactive", () => {
      makeSut({ color: "neutral-interactive" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("color-neutral-interactive");
    });
  });

  describe("THEN should correctly render the line height", () => {
    it("THEN should correctly render the line height caption", () => {
      makeSut({ lineHeight: "caption" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("lineHeight-caption");
    });

    it("THEN should correctly render the line height base", () => {
      makeSut({ lineHeight: "base" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("lineHeight-base");
    });

    it("THEN should correctly render the line height highlight", () => {
      makeSut({ lineHeight: "highlight" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("lineHeight-highlight");
    });
  });

  describe("THEN should correctly trim the text when using lineClamp", () => {
    it("THEN should correctly trim the text at one line", () => {
      makeSut({ lineClamp: 1 });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("WebkitLineClamp");
    });
  });

  describe("THEN should correctly render the textDecoration", () => {
    it("THEN should correctly render textDecoration none", () => {
      makeSut({ textDecoration: "none" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("textDecoration-none");
    });

    it("THEN should correctly render textDecoration underline", () => {
      makeSut({ textDecoration: "underline" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("textDecoration-underline");
    });

    it("THEN should correctly render textDecoration line-through", () => {
      makeSut({ textDecoration: "line-through" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("textDecoration-line-through");
    });
  });

  describe("THEN should correctly render ai-generative appearance", () => {
    it("THEN should apply gradient styles when color is ai-generative", () => {
      makeSut({ color: "ai-generative", as: "span" });
      const element = screen.getByTestId("text-element");
      expect(element.getAttribute("class")).toContain("aiGenerative");
    });

    it("THEN should render ai-generative text with proper content", () => {
      makeSut({ color: "ai-generative", as: "span" });
      const element = screen.getByTestId("text-element");
      expect(element.textContent).toBe(content);
      expect(element.getAttribute("class")).toContain("aiGenerative");
    });
  });

  describe("THEN should correctly render textOverflow", () => {
    it("THEN should correctly render textOverflow ellipsis", () => {
      makeSut({ textOverflow: "ellipsis" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("textOverflow-ellipsis");
    });

    it("THEN should correctly render textOverflow clip", () => {
      makeSut({ textOverflow: "clip" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("textOverflow-clip");
    });
  });

  describe("THEN should correctly render whiteSpace", () => {
    it("THEN should correctly render whiteSpace normal", () => {
      makeSut({ whiteSpace: "normal" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("whiteSpace-normal");
    });

    it("THEN should correctly render whiteSpace nowrap", () => {
      makeSut({ whiteSpace: "nowrap" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("whiteSpace-nowrap");
    });

    it("THEN should correctly render whiteSpace pre", () => {
      makeSut({ whiteSpace: "pre" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("whiteSpace-pre");
    });

    it("THEN should correctly render whiteSpace pre-wrap", () => {
      makeSut({ whiteSpace: "pre-wrap" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("whiteSpace-pre-wrap");
    });

    it("THEN should correctly render whiteSpace pre-line", () => {
      makeSut({ whiteSpace: "pre-line" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("whiteSpace-pre-line");
    });

    it("THEN should correctly render whiteSpace break-spaces", () => {
      makeSut({ whiteSpace: "break-spaces" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("whiteSpace-break-spaces");
    });
  });

  describe("THEN should correctly render overflow", () => {
    it("THEN should correctly render overflow hidden", () => {
      makeSut({ overflow: "hidden" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("overflow-hidden");
    });

    it("THEN should correctly render overflow visible", () => {
      makeSut({ overflow: "visible" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("overflow-visible");
    });

    it("THEN should correctly render overflow scroll", () => {
      makeSut({ overflow: "scroll" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("overflow-scroll");
    });

    it("THEN should correctly render overflow auto", () => {
      makeSut({ overflow: "auto" });
      expect(
        screen.getByTestId("text-element").getAttribute("class")
      ).toContain("overflow-auto");
    });
  });
});
