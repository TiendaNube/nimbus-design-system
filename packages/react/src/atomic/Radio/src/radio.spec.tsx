import React from "react";
import { render, screen } from "@testing-library/react";

import { Radio } from "./Radio";
import { RadioProps } from "./radio.types";

const makeSut = (props: RadioProps) => {
  render(<Radio {...props} data-testid="radio-input" />);
};

describe("GIVEN <Radio />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render the sent text", () => {
      makeSut({ name: "radio", label: "My Radio" });
      expect(screen.getByText("My Radio")).toBeDefined();
    });

    it("THEN should check the checkbox correctly", () => {
      makeSut({ name: "radio", label: "My Radio" });
      expect(
        screen.getByTestId<HTMLInputElement>("radio-input").checked
      ).toBeFalsy();
      screen.getByText("My Radio").click();
      expect(
        screen.getByTestId<HTMLInputElement>("radio-input").checked
      ).toBeTruthy();
    });
  });

  describe('THEN should correctly render the appearance "link"', () => {
    it("THEN should correctly render the appearance default", () => {
      makeSut({ name: "checkbox", label: "My Checkbox" });
      expect(screen.getByTestId("checkmark-element")).toBeDefined();
      expect(
        screen.getByTestId("content-element").getAttribute("class")
      ).toContain("radio.style_content_radio");
    });

    it("THEN should correctly render the appearance disabled", () => {
      makeSut({ name: "checkbox", label: "My Checkbox", disabled: true });
      expect(
        screen.getByTestId<HTMLInputElement>("radio-input").disabled
      ).toBeTruthy();
      expect(screen.getByTestId("checkmark-element")).toBeDefined();
      expect(
        screen.getByTestId("content-element").getAttribute("class")
      ).toContain("radio.style_content_radio");
    });
  });

  describe('THEN should correctly render the appearance "button"', () => {
    it("THEN should correctly render the appearance default", () => {
      makeSut({ name: "checkbox", label: "My Checkbox", as: "button" });
      expect(screen.queryByTestId("checkmark-element")).toBeNull();
      expect(
        screen.getByTestId("content-element").getAttribute("class")
      ).toContain("radio.style_content_button");
    });

    it("THEN should correctly render the appearance disabled", () => {
      makeSut({
        name: "checkbox",
        label: "My Checkbox",
        disabled: true,
        as: "button",
      });
      expect(
        screen.getByTestId<HTMLInputElement>("radio-input").disabled
      ).toBeTruthy();
      expect(
        screen.getByTestId("content-element").getAttribute("class")
      ).toContain("radio.style_content_disabled");
    });
  });
});
