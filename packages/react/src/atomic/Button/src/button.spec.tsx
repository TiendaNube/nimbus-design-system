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
  });

  describe("WHEN maxWidth prop is used", () => {
    it("THEN should not apply maxWidth class when maxWidth is false", () => {
      makeSut({ children: "button", maxWidth: false });
      expect(
        screen.getByRole("button").getAttribute("class")
      ).not.toContain("maxWidth");
    });

    it("THEN should not apply maxWidth class when maxWidth is not provided", () => {
      makeSut({ children: "button" });
      expect(
        screen.getByRole("button").getAttribute("class")
      ).not.toContain("maxWidth");
    });

    it("THEN should apply maxWidth class when maxWidth is true", () => {
      makeSut({ children: "button", maxWidth: true });
      expect(screen.getByRole("button").getAttribute("class")).toContain(
        "maxWidth"
      );
    });

    it("THEN should apply both appearance and maxWidth classes when both are provided", () => {
      makeSut({ children: "button", appearance: "primary", maxWidth: true });
      const buttonClass = screen.getByRole("button").getAttribute("class");
      expect(buttonClass).toContain("appearance_primary");
      expect(buttonClass).toContain("maxWidth");
    });
  });
});
