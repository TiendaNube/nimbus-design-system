import React from "react";
import { render, screen } from "@testing-library/react";

import { SidebarHeader } from "./SidebarHeader";
import { SidebarHeaderProps } from "./sidebarHeader.types";

const makeSut = (props?: SidebarHeaderProps) => {
  render(<SidebarHeader {...props} data-testid="header-element" />);
};

describe("GIVEN <Sidebar.Header />", () => {
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
