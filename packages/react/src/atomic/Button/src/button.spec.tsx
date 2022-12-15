import React from "react";
import { render, screen } from "@testing-library/react";

import { Button } from "./Button";
import { ButtonProps } from "./button.types";

const makeSut = (rest: ButtonProps) => {
  render(<Button {...rest} data-testid="button-element" />);
};

describe("GIVEN <Button />", () => {
  describe("WHEN rendered", () => {
    it("THEN should disable the button", () => {
      makeSut({ disabled: true, children: "button" });
      expect(
        screen.getByRole<HTMLButtonElement>("button").disabled
      ).toBeTruthy();
    });
  });

  describe("THEN should correctly render the submitted appearance", () => {
    it("THEN should correctly render the appearance default", () => {
      makeSut({ children: "button" });
      expect(screen.getByRole("button").getAttribute("class")).toContain(
        "appearance_neutral"
      );
    });

    it("THEN should correctly render the appearance primary", () => {
      makeSut({ appearance: "primary", children: "button" });
      expect(
        screen.getByRole("button", { name: "button" }).getAttribute("class")
      ).toContain("appearance_primary");
    });

    it("THEN should correctly render the appearance danger", () => {
      makeSut({ appearance: "danger", children: "button" });
      expect(
        screen.getByRole("button", { name: "button" }).getAttribute("class")
      ).toContain("appearance_danger");
    });

    it("THEN should correctly render the appearance neutral", () => {
      makeSut({ appearance: "neutral", children: "button" });
      expect(
        screen.getByRole("button", { name: "button" }).getAttribute("class")
      ).toContain("appearance_neutral");
    });
  });
});
