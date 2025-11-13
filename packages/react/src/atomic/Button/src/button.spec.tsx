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

  describe("WHEN fullWidth prop is used", () => {
    it("THEN should not apply fullWidth class when fullWidth is not provided", () => {
      makeSut({ children: "button" });
      expect(screen.getByRole("button").getAttribute("class")).not.toContain(
        "fullWidth"
      );
    });

    it("THEN should apply fullWidth class when fullWidth is true", () => {
      makeSut({ children: "button", fullWidth: true });
      expect(screen.getByRole("button").getAttribute("class")).toContain(
        "fullWidth"
      );
    });

    it("THEN should apply both appearance and fullWidth classes when both are provided", () => {
      makeSut({ children: "button", appearance: "primary", fullWidth: true });
      const buttonClass = screen.getByRole("button").getAttribute("class");
      expect(buttonClass).toContain("appearance_primary");
      expect(buttonClass).toContain("fullWidth");
    });
  });

  describe("WHEN size prop is used", () => {
    it("THEN should apply medium size class by default", () => {
      makeSut({ children: "button" });
      expect(screen.getByRole("button").getAttribute("class")).toContain(
        "size_medium"
      );
    });

    it("THEN should apply small size class when size is small", () => {
      makeSut({ children: "button", size: "small" });
      expect(screen.getByRole("button").getAttribute("class")).toContain(
        "size_small"
      );
    });

    it("THEN should apply medium size class when size is medium", () => {
      makeSut({ children: "button", size: "medium" });
      expect(screen.getByRole("button").getAttribute("class")).toContain(
        "size_medium"
      );
    });

    it("THEN should apply large size class when size is large", () => {
      makeSut({ children: "button", size: "large" });
      expect(screen.getByRole("button").getAttribute("class")).toContain(
        "size_large"
      );
    });

    it("THEN should apply both appearance and size classes when both are provided", () => {
      makeSut({ children: "button", appearance: "primary", size: "small" });
      const buttonClass = screen.getByRole("button").getAttribute("class");
      expect(buttonClass).toContain("appearance_primary");
      expect(buttonClass).toContain("size_small");
    });
  });
});
