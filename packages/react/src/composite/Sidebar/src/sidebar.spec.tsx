import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { Sidebar } from "./Sidebar";
import type { SidebarProps } from "./sidebar.types";

const makeSut = (rest: SidebarProps) => {
  render(<Sidebar {...rest} data-testid="sidebar-element" />);
};

describe("GIVEN <Sidebar />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render the submitted content", () => {
      makeSut({ children: <div>My content</div>, open: true });
      expect(screen.getByText("My content")).toBeDefined();
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

  describe("WHEN root is provided", () => {
    it("THEN renders overlay and content inside that container", () => {
      const root = document.createElement("div");
      root.setAttribute("data-testid", "scoped-root");
      root.style.position = "relative";
      document.body.appendChild(root);

      render(
        <Sidebar root={root} open>
          <div>Scoped content</div>
        </Sidebar>
      );

      const scopedRoot = screen.getByTestId("scoped-root");
      expect(scopedRoot).toContainElement(screen.getByText("Scoped content"));
    });

    it("THEN keeps default behavior when root is null", () => {
      render(
        <Sidebar root={null} open>
          <div>Fallback content</div>
        </Sidebar>
      );
      expect(screen.getByText("Fallback content")).toBeDefined();
    });
  });

  describe("WHEN closeOnOutsidePress is a function", () => {
    it("THEN does not remove when function returns false", () => {
      const onRemove = jest.fn();
      const root = document.createElement("div");
      document.body.appendChild(root);

      render(
        <Sidebar
          root={root}
          open
          onRemove={onRemove}
          closeOnOutsidePress={() => false}
        >
          <div>Content</div>
        </Sidebar>
      );

      fireEvent.mouseDown(document.body);
      expect(onRemove).not.toHaveBeenCalled();
    });

    it("THEN does not remove when event hits ignored attribute region", () => {
      const onRemove = jest.fn();
      const root = document.createElement("div");
      document.body.appendChild(root);

      const ignore = document.createElement("div");
      ignore.setAttribute("data-nimbus-outside-press-ignore", "true");
      document.body.appendChild(ignore);

      render(
        <Sidebar
          root={root}
          open
          onRemove={onRemove}
          closeOnOutsidePress={() => true}
        >
          <div>Content</div>
        </Sidebar>
      );

      fireEvent.mouseDown(ignore);
      expect(onRemove).not.toHaveBeenCalled();
    });

    it("THEN removes when function allows and event is not ignored", () => {
      const onRemove = jest.fn();
      const root = document.createElement("div");
      document.body.appendChild(root);

      render(
        <Sidebar
          root={root}
          open
          onRemove={onRemove}
          closeOnOutsidePress={() => true}
        >
          <div>Content</div>
        </Sidebar>
      );

      fireEvent.mouseDown(document.body);
      expect(onRemove).toHaveBeenCalled();
    });
  });
});
