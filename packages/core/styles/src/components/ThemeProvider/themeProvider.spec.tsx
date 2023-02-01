import React from "react";
import { render, screen } from "@testing-library/react";

import { ThemeProvider } from ".";
import { ThemeProviderProps } from "./themeProvider.types";

const makeSut = (props: ThemeProviderProps) => {
  render(<ThemeProvider {...props} data-testid="theme-provider-element" />);
};

describe("GIVEN <ThemeProvider />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render the submitted children", () => {
      makeSut({ children: "My children" });
      expect(screen.getByText("My children")).toBeDefined();
    });
  });

  describe("THEN should correctly render the submitted theme", () => {
    it("THEN should correctly render the padding default", () => {
      makeSut({ children: "My children" });
      expect(
        screen.getByTestId("theme-provider-element").getAttribute("class")
      ).toEqual("");
    });

    it("THEN should correctly render the padding base", () => {
      makeSut({ children: "My children", theme: "base" });
      expect(
        screen.getByTestId("theme-provider-element").getAttribute("class")
      ).toEqual("");
    });

    it("THEN should correctly render the padding dark", () => {
      makeSut({ children: "My children", theme: "dark" });
      expect(
        screen.getByTestId("theme-provider-element").getAttribute("class")
      ).toContain("dark");
    });
  });
});
