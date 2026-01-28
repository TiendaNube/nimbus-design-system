import React from "react";
import { render, screen } from "@testing-library/react";

import { Badge } from "./Badge";
import { BadgeProps } from "./badge.types";

const makeSut = (rest: BadgeProps) => {
  render(<Badge {...rest} data-testid="badge-element" />);
};

describe("GIVEN <Badge />", () => {
  describe("THEN should correctly render the theme surface", () => {
    it("THEN should correctly render the appearance base", () => {
      makeSut({ count: 99 });
      expect(
        screen.getByTestId("badge-element").getAttribute("class")
      ).toContain("surface_neutral");
    });

    it("THEN should correctly render the appearance primary", () => {
      makeSut({ count: 99, appearance: "primary" });
      expect(
        screen.getByTestId("badge-element").getAttribute("class")
      ).toContain("surface_primary");
    });

    it("THEN should correctly render the appearance success", () => {
      makeSut({ count: 99, appearance: "success" });
      expect(
        screen.getByTestId("badge-element").getAttribute("class")
      ).toContain("surface_success");
    });

    it("THEN should correctly render the appearance warning", () => {
      makeSut({ count: 99, appearance: "warning" });
      expect(
        screen.getByTestId("badge-element").getAttribute("class")
      ).toContain("surface_warning");
    });

    it("THEN should correctly render the appearance danger", () => {
      makeSut({ count: 99, appearance: "danger" });
      expect(
        screen.getByTestId("badge-element").getAttribute("class")
      ).toContain("surface_danger");
    });

    it("THEN should correctly render the appearance neutral", () => {
      makeSut({ count: 99, appearance: "neutral" });
      expect(
        screen.getByTestId("badge-element").getAttribute("class")
      ).toContain("surface_neutral");
    });
  });

  describe("THEN should correctly render the theme light", () => {
    it("THEN should correctly render the appearance base", () => {
      makeSut({ count: 99, theme: "light" });
      expect(
        screen.getByTestId("badge-element").getAttribute("class")
      ).toContain("light_neutral");
    });

    it("THEN should correctly render the appearance primary", () => {
      makeSut({ count: 99, appearance: "primary", theme: "light" });
      expect(
        screen.getByTestId("badge-element").getAttribute("class")
      ).toContain("light_primary");
    });

    it("THEN should correctly render the appearance success", () => {
      makeSut({ count: 99, appearance: "success", theme: "light" });
      expect(
        screen.getByTestId("badge-element").getAttribute("class")
      ).toContain("light_success");
    });

    it("THEN should correctly render the appearance warning", () => {
      makeSut({ count: 99, appearance: "warning", theme: "light" });
      expect(
        screen.getByTestId("badge-element").getAttribute("class")
      ).toContain("light_warning");
    });

    it("THEN should correctly render the appearance danger", () => {
      makeSut({ count: 99, appearance: "danger", theme: "light" });
      expect(
        screen.getByTestId("badge-element").getAttribute("class")
      ).toContain("light_danger");
    });

    it("THEN should correctly render the appearance neutral", () => {
      makeSut({ count: 99, appearance: "neutral", theme: "light" });
      expect(
        screen.getByTestId("badge-element").getAttribute("class")
      ).toContain("light_neutral");
    });
  });
});
