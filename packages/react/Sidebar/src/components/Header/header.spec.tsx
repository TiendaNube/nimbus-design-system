import React from "react";
import { render, screen } from "@testing-library/react";

import { Header } from "./Header";
import { HeaderProps } from "./header.types";

const makeSut = (props?: HeaderProps) => {
  render(<Header {...props} data-testid="header-element" />);
};

describe("GIVEN <Header />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render the submitted title", () => {
      makeSut({ title: "My Title" });
      expect(screen.getByText("My Title")).toBeDefined();
      expect(screen.getByTestId("header-title")).toBeDefined();
    });
    it("THEN should not render the submitted title", () => {
      makeSut();
      expect(screen.queryByTestId("header-title")).toBeNull();
    });
  });

  describe("THEN should correctly render the submitted padding", () => {
    it("THEN should correctly render the padding default", () => {
      makeSut({ children: "My content" });
      expect(
        screen.getByTestId("header-element").getAttribute("class")
      ).toContain("");
    });

    it("THEN should correctly render the padding none", () => {
      makeSut({ padding: "none", children: "My content" });
      expect(
        screen.getByTestId("header-element").getAttribute("class")
      ).toMatch("padding-none");
    });

    it("THEN should correctly render the padding base", () => {
      makeSut({ padding: "base", children: "My content" });
      expect(
        screen.getByTestId("header-element").getAttribute("class")
      ).toMatch("padding-base");
    });
  });
});
