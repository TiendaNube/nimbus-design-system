import React from "react";
import { render, screen } from "@testing-library/react";

import { Input, InputProps } from "./Input";

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
  });
});
