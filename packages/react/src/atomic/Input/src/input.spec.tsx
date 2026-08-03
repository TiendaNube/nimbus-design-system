import React from "react";
import { render, screen } from "@testing-library/react";

import { Input, type InputProps } from "./Input";

const makeSut = (rest?: Omit<InputProps, "children">) => {
  render(<Input {...rest} data-testid="input-element" />);
};

describe("GIVEN <Input />", () => {
  describe("WHEN rendered", () => {
    it("THEN should properly disable the component", () => {
      makeSut({ disabled: true });
      expect(
        screen.getByRole<HTMLInputElement>("textbox").disabled
      ).toBeTruthy();
    });
  });

  describe("THEN should correctly render the submitted position and icon", () => {
    it("should render the submitted icon", () => {
      makeSut({ disabled: true, append: <svg data-testid="my-icon" /> });
      expect(screen.getByTestId("my-icon")).toBeDefined();
    });

    it("should render the icon sent to the start", () => {
      makeSut({
        disabled: true,
        append: <svg data-testid="my-icon" />,
        appendPosition: "start",
      });
      expect(screen.getByTestId("my-icon")).toBeDefined();
      expect(
        screen.getByTestId("input-element-icon").getAttribute("class")
      ).toContain("append_start");
    });

    it("should render the icon sent to the end", () => {
      makeSut({
        disabled: true,
        append: <svg data-testid="my-icon" />,
        appendPosition: "end",
      });
      expect(screen.getByTestId("my-icon")).toBeDefined();
      expect(
        screen.getByTestId("input-element-icon").getAttribute("class")
      ).toContain("append_end");
    });
  });

  describe("THEN should correctly render the submitted appearance", () => {
    it("THEN should correctly render the appearance default", () => {
      makeSut();
      expect(
        screen.getByTestId("input-element-container").getAttribute("class")
      ).toContain("appearance_neutral");
    });

    it("THEN should correctly render the appearance neutral", () => {
      makeSut({ appearance: "neutral" });
      expect(
        screen.getByTestId("input-element-container").getAttribute("class")
      ).toContain("appearance_neutral");
    });

    it("THEN should correctly render the appearance success", () => {
      makeSut({ appearance: "success" });
      expect(
        screen.getByTestId("input-element-container").getAttribute("class")
      ).toContain("appearance_success");
    });

    it("THEN should correctly render the appearance warning", () => {
      makeSut({ appearance: "warning" });
      expect(
        screen.getByTestId("input-element-container").getAttribute("class")
      ).toContain("appearance_warning");
    });

    it("THEN should correctly render the appearance danger", () => {
      makeSut({ appearance: "danger" });
      expect(
        screen.getByTestId("input-element-container").getAttribute("class")
      ).toContain("appearance_danger");
    });

    it("THEN should correctly render the appearance ai-generative", () => {
      makeSut({ appearance: "ai-generative" });
      expect(
        screen.getByTestId("input-element-container").getAttribute("class")
      ).toContain("appearance_ai-generative");
    });

    it("THEN should correctly render the aiGenerated prop as ai-generative appearance", () => {
      makeSut({ aiGenerated: true });
      expect(
        screen.getByTestId("input-element-container").getAttribute("class")
      ).toContain("appearance_ai-generative");
    });

    it("THEN aiGenerated should take precedence when appearance is also provided", () => {
      makeSut({ appearance: "danger", aiGenerated: true });
      const className = screen
        .getByTestId("input-element-container")
        .getAttribute("class");
      expect(className).toContain("appearance_ai-generative");
    });
  });

  describe("THEN should correctly render the submitted prefix and suffix", () => {
    it("should render the prefix as static text before the input", () => {
      makeSut({ prefix: "$" });
      const prefix = screen.getByTestId("input-element-prefix");
      expect(prefix).toHaveTextContent("$");
      expect(prefix.tagName).toBe("SPAN");
    });

    it("should render the suffix as static text after the input", () => {
      makeSut({ suffix: "kg" });
      const suffix = screen.getByTestId("input-element-suffix");
      expect(suffix).toHaveTextContent("kg");
      expect(suffix.tagName).toBe("SPAN");
    });

    it("should render both prefix and suffix at the same time", () => {
      makeSut({ prefix: "$", suffix: "USD" });
      expect(screen.getByTestId("input-element-prefix")).toHaveTextContent(
        "$"
      );
      expect(screen.getByTestId("input-element-suffix")).toHaveTextContent(
        "USD"
      );
    });

    it("should not render prefix/suffix as a button and should not expose a button role", () => {
      makeSut({ prefix: "$", suffix: "kg" });
      const prefix = screen.getByTestId("input-element-prefix");
      const suffix = screen.getByTestId("input-element-suffix");

      expect(prefix.tagName).not.toBe("BUTTON");
      expect(suffix.tagName).not.toBe("BUTTON");
      expect(screen.queryByRole("button")).toBeNull();
    });

    it("should render prefix/suffix together with an append icon without conflicting", () => {
      makeSut({
        prefix: "$",
        suffix: "kg",
        append: <svg data-testid="my-icon" />,
        appendPosition: "start",
      });

      expect(screen.getByTestId("input-element-prefix")).toBeDefined();
      expect(screen.getByTestId("input-element-suffix")).toBeDefined();
      expect(screen.getByTestId("input-element-icon")).toBeDefined();
      expect(screen.getByTestId("my-icon")).toBeDefined();
      expect(screen.getByRole("button")).toBeDefined();
    });

    it("should not render prefix/suffix elements when not provided", () => {
      makeSut();
      expect(screen.queryByTestId("input-element-prefix")).toBeNull();
      expect(screen.queryByTestId("input-element-suffix")).toBeNull();
    });
  });
});
