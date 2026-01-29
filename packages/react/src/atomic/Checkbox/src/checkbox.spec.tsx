import React from "react";
import { render, screen } from "@testing-library/react";

import { Checkbox } from "./Checkbox";
import { type CheckboxProps } from "./checkbox.types";

jest.mock("./checkbox-check.svg", () => () => <svg />);

const makeSut = (props: CheckboxProps) => {
  render(<Checkbox {...props} data-testid="chekbox-input" />);
};

describe("GIVEN <Checkbox />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render the sent text", () => {
      makeSut({ name: "checkbox", label: "My Checkbox" });
      expect(screen.getByText("My Checkbox")).toBeDefined();
      expect(screen.queryByTestId("icon-indeterminate")).toBeNull();
    });

    it("THEN should check the checkbox correctly", () => {
      makeSut({ name: "checkbox", label: "My Checkbox" });
      expect(
        screen.getByTestId<HTMLInputElement>("chekbox-input").checked
      ).toBeFalsy();
      screen.getByText("My Checkbox").click();
      expect(
        screen.getByTestId<HTMLInputElement>("chekbox-input").checked
      ).toBeTruthy();
    });
  });

  describe("THEN should correctly render the appearance", () => {
    it("THEN should correctly render the appearance disabled", () => {
      makeSut({ name: "checkbox", label: "My Checkbox", disabled: true });
      expect(
        screen.getByTestId<HTMLInputElement>("chekbox-input").disabled
      ).toBeTruthy();
      expect(screen.getByTestId("checkmark").getAttribute("class")).toContain(
        "borderColor_neutral-interactive"
      );
      expect(screen.getByTestId("text").getAttribute("class")).toContain(
        "color-neutral-textDisabled"
      );
    });

    it("THEN should correctly render the appearance indeterminate", () => {
      makeSut({ name: "checkbox", label: "My Checkbox", indeterminate: true });
      expect(screen.getByTestId("icon-indeterminate")).toBeDefined();
      expect(screen.getByTestId("checkmark").getAttribute("class")).toContain(
        "borderColor_primary-interactive"
      );
    });

    it("THEN should correctly render the appearance primary", () => {
      makeSut({
        name: "checkbox",
        label: "My Checkbox",
        appearance: "primary",
      });
      expect(screen.getByTestId("checkmark").getAttribute("class")).toContain(
        "borderColor_neutral-interactive"
      );
      expect(screen.getByTestId("text").getAttribute("class")).toContain(
        "color-neutral-textHigh"
      );
      expect(screen.getByText("My Checkbox")).toBeDefined();
    });

    it("THEN should correctly render the appearance danger", () => {
      makeSut({ name: "checkbox", label: "My Checkbox", appearance: "danger" });
      expect(screen.getByTestId("checkmark").getAttribute("class")).toContain(
        "borderColor_danger-interactive"
      );
      expect(screen.getByTestId("text").getAttribute("class")).toContain(
        "color-danger-textLow"
      );
      expect(screen.getByText("My Checkbox")).toBeDefined();
    });
  });
});
