import React from "react";
import { render, screen } from "@testing-library/react";

import { Button, ButtonProps } from "./Button";

const makeSut = (
  rest: ButtonProps & { as?: "button" | "a"; href?: string }
) => {
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

    it("THEN should correctly render the button element", () => {
      makeSut({ children: "Link", as: "a", href: "/" });
      expect(screen.getByRole("link")).toBeDefined();
    });
  });

  describe("THEN should correctly render the submitted appearance", () => {
    it("THEN should correctly render the appearance default", () => {
      makeSut({ children: "button" });
      expect(screen.getByRole("button").getAttribute("class")).toContain(
        "appearance_neutral"
      );
    });

    it("AND should correctly render the appearance primary", () => {
      makeSut({ appearance: "primary", children: "button" });
      expect(
        screen.getByRole("button", { name: "button" }).getAttribute("class")
      ).toContain("appearance_primary");
    });

    it("AND should correctly render the appearance danger", () => {
      makeSut({ appearance: "danger", children: "button" });
      expect(
        screen.getByRole("button", { name: "button" }).getAttribute("class")
      ).toContain("appearance_danger");
    });

    it("AND should correctly render the appearance neutral", () => {
      makeSut({ appearance: "neutral", children: "button" });
      expect(
        screen.getByRole("button", { name: "button" }).getAttribute("class")
      ).toContain("appearance_neutral");
    });

    it("AND should correctly render the appearance transparent", () => {
      makeSut({ appearance: "transparent", children: "button" });
      expect(
        screen.getByRole("button", { name: "button" }).getAttribute("class")
      ).toContain("appearance_transparent");
    });

    it("AND should correctly render the appearance ai-gradient", () => {
      makeSut({ appearance: "ai-gradient", children: "button" });
      expect(
        screen.getByRole("button", { name: "button" }).getAttribute("class")
      ).toContain("appearance_ai-gradient");
    });
  });
});
