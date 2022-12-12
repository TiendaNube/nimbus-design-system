import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { Sidebar } from "./Sidebar";
import { SidebarProps } from "./sidebar.types";

const mockedRemoveAlert = jest.fn();

const makeSut = (rest: SidebarProps) => {
  render(<Sidebar {...rest} data-testid="sidebar-element" />);
};

describe("GIVEN <Sidebar />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render the submitted content", () => {
      makeSut({ children: <div>My content</div> });
      expect(screen.getByText("My content")).toBeDefined();
    });

    it("THEN should correctly execute the onRemove function", () => {
      makeSut({
        children: <div>My content</div>,
        open: true,
        onRemove: mockedRemoveAlert,
      });
      const dismissButton = screen.getByTestId("overlay-sidebar-button");
      fireEvent.click(dismissButton);
      expect(mockedRemoveAlert).toBeCalled();
    });
  });

  describe("THEN should correctly render or not based on the open property", () => {
    it("THEN should correctly render if open is true", () => {
      makeSut({ children: <div>My content</div>, open: true });
      expect(screen.getByTestId("overlay-sidebar-button")).toBeTruthy();
      expect(
        screen.getByTestId("sidebar-element").getAttribute("class")
      ).toContain("isVisible");
    });

    it("THEN should not render if open is false", () => {
      makeSut({ children: <div>My content</div>, open: false });
      expect(screen.queryByTestId("overlay-sidebar-button")).toBeNull();
    });
  });
});
