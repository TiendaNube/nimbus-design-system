import React from "react";
import { render, screen } from "@testing-library/react";

import { CardHeader } from "./CardHeader";
import { CardHeaderProps } from "./cardHeader.types";

const makeSut = (props?: CardHeaderProps) => {
  render(<CardHeader {...props} data-testid="header-element" />);
};

describe("GIVEN <Card.Header />", () => {
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
