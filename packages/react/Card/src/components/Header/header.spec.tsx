import React from "react";
import { render, screen } from "@testing-library/react";

import { Header } from "./Header";
import { HeaderProps } from "./header.types";

const makeSut = (props?: HeaderProps) => {
  render(<Header {...props} data-testid="skeleton-element" />);
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
});
