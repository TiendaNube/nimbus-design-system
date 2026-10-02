import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@nimbus-ds/styles";

import { Sidebar } from "./Sidebar";
import { type SidebarProps } from "./sidebar.types";

const makeSut = (rest: SidebarProps) => {
  render(<Sidebar {...rest} data-testid="sidebar-element" />);
};

type ProviderSlots = { base?: React.ReactNode; dark?: React.ReactNode };

const renderProviders = ({ base, dark }: ProviderSlots) => (
  <>
    <ThemeProvider theme="base" data-testid="provider-base">
      {base}
    </ThemeProvider>
    <ThemeProvider theme="next-dark" data-testid="provider-dark">
      {dark}
    </ThemeProvider>
  </>
);

const namedSidebar = (name: string, open = true) => (
  <Sidebar data-testid={`sidebar-${name}`} open={open}>
    {name}
  </Sidebar>
);

const getPortalWrapper = (content: HTMLElement) =>
  content.closest("[data-floating-ui-portal]")?.parentElement ?? null;

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

  describe("WHEN rendered inside ThemeProviders", () => {
    beforeEach(() => {
      document.body.innerHTML = "";
    });

    it("THEN content mounts in its own provider after another provider's sidebar mounted first", () => {
      const { rerender } = render(renderProviders({}));
      rerender(renderProviders({ dark: namedSidebar("dark") }));
      expect(screen.getByTestId("sidebar-dark")).toBeDefined();
      rerender(
        renderProviders({
          dark: namedSidebar("dark"),
          base: namedSidebar("base")
        })
      );

      const wrapper = getPortalWrapper(screen.getByTestId("sidebar-base"));
      expect(wrapper?.id).toEqual("nimbus-sidebar");
      expect(wrapper?.parentElement).toBe(screen.getByTestId("provider-base"));
    });

    it("AND content mounts in its own provider when the providers are used in reverse order", () => {
      const { rerender } = render(renderProviders({}));
      rerender(renderProviders({ base: namedSidebar("base") }));
      expect(screen.getByTestId("sidebar-base")).toBeDefined();
      rerender(
        renderProviders({
          base: namedSidebar("base"),
          dark: namedSidebar("dark")
        })
      );

      const wrapper = getPortalWrapper(screen.getByTestId("sidebar-dark"));
      expect(wrapper?.id).toEqual("nimbus-sidebar");
      expect(wrapper?.parentElement).toBe(screen.getByTestId("provider-dark"));
    });

    it("AND content without a provider mounts in a body wrapper after a provider's sidebar mounted first", () => {
      const { rerender } = render(renderProviders({}));
      rerender(renderProviders({ base: namedSidebar("base") }));
      expect(screen.getByTestId("sidebar-base")).toBeDefined();
      render(namedSidebar("plain"));

      const wrapper = getPortalWrapper(screen.getByTestId("sidebar-plain"));
      expect(wrapper?.id).toEqual("nimbus-sidebar");
      expect(wrapper?.parentElement).toBe(document.body);
    });

    it("AND content stays in its provider when it is closed and reopened", () => {
      const { rerender } = render(renderProviders({}));
      rerender(renderProviders({ base: namedSidebar("base") }));
      rerender(renderProviders({ base: namedSidebar("base", false) }));
      expect(screen.queryByTestId("sidebar-base")).toBeNull();
      rerender(renderProviders({ base: namedSidebar("base") }));

      const wrapper = getPortalWrapper(screen.getByTestId("sidebar-base"));
      expect(wrapper?.id).toEqual("nimbus-sidebar");
      expect(wrapper?.parentElement).toBe(screen.getByTestId("provider-base"));
    });

    it("AND a closed sidebar creates no portal wrapper", () => {
      render(renderProviders({ base: namedSidebar("base", false) }));

      expect(document.getElementById("nimbus-sidebar")).toBeNull();
    });
  });
});
