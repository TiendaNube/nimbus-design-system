import React from "react";
import { render, screen } from "@testing-library/react";

import { SidebarBody } from "./SidebarBody";
import type { SidebarBodyProps } from "./sidebarBody.types";

const makeSut = (props: SidebarBodyProps) => {
  render(<SidebarBody {...props} data-testid="body-element" />);
};

describe("GIVEN <Sidebar.Body />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render the submitted content", () => {
      makeSut({ children: "My content" });
      expect(screen.getByText("My content")).toBeDefined();
    });
  });

  describe("THEN should correctly render the submitted padding", () => {
    it("THEN should correctly render the padding default", () => {
      makeSut({ children: "My content" });
      expect(
        screen.getByTestId("body-element").getAttribute("class")
      ).toContain("");
    });

    it("THEN should correctly render the padding none", () => {
      makeSut({ padding: "none", children: "My content" });
      expect(screen.getByTestId("body-element").getAttribute("class")).toMatch(
        "padding-none"
      );
    });

    it("THEN should correctly render the padding base", () => {
      makeSut({ padding: "base", children: "My content" });
      expect(screen.getByTestId("body-element").getAttribute("class")).toMatch(
        "padding-base"
      );
    });
  });
});
