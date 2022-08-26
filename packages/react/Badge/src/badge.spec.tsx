import React from "react";
import { render, screen } from "@testing-library/react";

import { Badge } from "./Badge";
import { BadgeProps } from "./badge.types";

const makeSut = (rest: BadgeProps) => {
  render(<Badge {...rest} data-testid="badge-element" />);
};

describe("GIVEN <Badge />", () => {
  describe("THEN should correctly render the appearance", () => {
    it("THEN should correctly render the appearance base", () => {
      makeSut({ count: 99 });
      expect(
        screen.getByTestId("badge-element").getAttribute("class")
      ).toContain("appearance_neutral");
    });

    it("THEN should correctly render the appearance primary", () => {
      makeSut({ count: 99, appearance: "primary" });
      expect(
        screen.getByTestId("badge-element").getAttribute("class")
      ).toContain("appearance_primary");
    });

    it("THEN should correctly render the appearance success", () => {
      makeSut({ count: 99, appearance: "success" });
      expect(
        screen.getByTestId("badge-element").getAttribute("class")
      ).toContain("appearance_success");
    });

    it("THEN should correctly render the appearance warning", () => {
      makeSut({ count: 99, appearance: "warning" });
      expect(
        screen.getByTestId("badge-element").getAttribute("class")
      ).toContain("appearance_warning");
    });

    it("THEN should correctly render the appearance danger", () => {
      makeSut({ count: 99, appearance: "danger" });
      expect(
        screen.getByTestId("badge-element").getAttribute("class")
      ).toContain("appearance_danger");
    });

    it("THEN should correctly render the appearance neutral", () => {
      makeSut({ count: 99, appearance: "neutral" });
      expect(
        screen.getByTestId("badge-element").getAttribute("class")
      ).toContain("appearance_neutral");
    });
  });
});
