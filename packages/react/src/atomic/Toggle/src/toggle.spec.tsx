import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Toggle } from "./Toggle";
import type { ToggleProps } from "./toggle.types";

const makeSut = (props: ToggleProps) => {
  render(<Toggle {...props} data-testid="toggle-input" />);
};

describe("GIVEN <Toggle />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render the sent text", () => {
      makeSut({ name: "toggle", label: "My Toggle" });
      expect(screen.getByText("My Toggle")).toBeDefined();
    });

    it("THEN should active the toggle correctly", async () => {
      makeSut({ name: "toggle", label: "My Toggle" });
      expect(
        screen.getByTestId<HTMLInputElement>("toggle-input").checked
      ).toBeFalsy();
      await userEvent.click(screen.getByText("My Toggle"));
      expect(
        screen.getByTestId<HTMLInputElement>("toggle-input").checked
      ).toBeTruthy();
    });

    it("THEN should active the toggle correctly for default", () => {
      makeSut({ name: "toggle", active: true });
      expect(
        screen.getByTestId<HTMLInputElement>("toggle-input").checked
      ).toBeTruthy();
    });

    it("THEN should not toggle when disabled", async () => {
      makeSut({ name: "toggle", label: "My Toggle", disabled: true });
      const input = screen.getByTestId<HTMLInputElement>("toggle-input");
      expect(input.disabled).toBeTruthy();
      const label = screen.getByText("My Toggle");
      await userEvent.click(label);
      expect(input.checked).toBeFalsy();
    });
  });
});
