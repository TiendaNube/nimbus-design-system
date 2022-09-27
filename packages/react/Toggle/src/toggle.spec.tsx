import React from "react";
import { render, screen } from "@testing-library/react";

import { Toggle } from "./Toggle";
import { ToggleProps } from "./toggle.types";

const makeSut = (props: ToggleProps) => {
  render(<Toggle {...props} data-testid="toggle-input" />);
};

describe("GIVEN <Toggle />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render the sent text", () => {
      makeSut({ name: "toggle", label: "My Toggle" });
      expect(screen.getByText("My Toggle")).toBeDefined();
    });

    it("THEN should active the toggle correctly", () => {
      makeSut({ name: "toggle", label: "My Toggle" });
      expect(
        screen.getByTestId<HTMLInputElement>("toggle-input").checked
      ).toBeFalsy();
      screen.getByText("My Toggle").click();
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
  });
});
