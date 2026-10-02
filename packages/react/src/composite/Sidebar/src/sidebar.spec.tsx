import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@nimbus-ds/styles";

import { Sidebar } from "./Sidebar";
import { type SidebarProps } from "./sidebar.types";

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

type Layout = "nested-after-origin" | "nested-before-origin" | "sibling-before";
type Name = "inner" | "outer";

const PROVIDER_P = "provider-p";
const PROVIDER_Q = "provider-q";
const WRAPPER_ID = "nimbus-sidebar";

const makeSidebar = (name: Name, open: boolean) => (
  <Sidebar open={open} data-testid={`${name}-sidebar`}>
    <div>{`${name} sidebar`}</div>
  </Sidebar>
);

/**
 * P (base) declares the "outer" Sidebar, Q (dark) is a themed side area that
 * declares the "inner" Sidebar. `layout` places Q relative to the outer Sidebar.
 * Each Sidebar is open only while its name is in `opened`, so the second one
 * opens after the first has already created its floating wrapper.
 */
const makeScene = (layout: Layout, opened: Name[]) => {
  const inner = (
    <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
      {makeSidebar("inner", opened.includes("inner"))}
    </ThemeProvider>
  );
  const outer = makeSidebar("outer", opened.includes("outer"));

  if (layout === "sibling-before") {
    return (
      <>
        {inner}
        <ThemeProvider theme="base" data-testid={PROVIDER_P}>
          {outer}
        </ThemeProvider>
      </>
    );
  }

  return (
    <ThemeProvider theme="base" data-testid={PROVIDER_P}>
      {layout === "nested-before-origin" && inner}
      {outer}
      {layout === "nested-after-origin" && inner}
    </ThemeProvider>
  );
};

describe("GIVEN <Sidebar /> inside theme providers", () => {
  beforeEach(() => {
    // Sidebars rendered outside any provider leave their identified wrapper in
    // the body after unmount; remove it so each scenario starts from a clean document.
    document
      .querySelectorAll(`#${WRAPPER_ID}`)
      .forEach((element) => element.remove());
  });

  describe("WHEN it is open inside a single theme provider", () => {
    const getProviderAndContainer = () => ({
      provider: screen.getByTestId(PROVIDER_Q),
      container: screen.getByTestId("inner-sidebar"),
    });

    const makeSingle = (open: boolean) => (
      <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
        {makeSidebar("inner", open)}
      </ThemeProvider>
    );

    it("THEN should render overlay and container inside the provider when opened after mount", () => {
      const { rerender } = render(makeSingle(false));
      rerender(makeSingle(true));
      const { provider, container } = getProviderAndContainer();
      expect(provider.contains(container)).toBe(true);
      expect(container.closest(`#${WRAPPER_ID}`)?.parentElement).toBe(provider);
    });

    it("THEN should render overlay and container inside the provider when open on first render", () => {
      render(makeSingle(true));
      const { provider, container } = getProviderAndContainer();
      expect(provider.contains(container)).toBe(true);
      expect(container.closest(`#${WRAPPER_ID}`)?.parentElement).toBe(provider);
    });
  });

  describe("WHEN it is open outside any theme provider", () => {
    it("THEN should still be displayed, without a theme scope", () => {
      render(makeSidebar("outer", true));
      const container = screen.getByTestId("outer-sidebar");
      expect(container.closest(`[data-testid="${PROVIDER_P}"]`)).toBeNull();
      expect(container.closest(`#${WRAPPER_ID}`)).not.toBeNull();
    });
  });

  describe.each<Layout>([
    "nested-after-origin",
    "nested-before-origin",
    "sibling-before",
  ])("AND the dark provider Q is placed as %s", (layout) => {
    it("THEN the Sidebar of P opened after Q opened its own is inside P and not inside Q", () => {
      const { rerender } = render(makeScene(layout, []));
      const p = screen.getByTestId(PROVIDER_P);
      const q = screen.getByTestId(PROVIDER_Q);

      rerender(makeScene(layout, ["inner"]));
      expect(q.contains(screen.getByTestId("inner-sidebar"))).toBe(true);

      rerender(makeScene(layout, ["inner", "outer"]));
      const outerContainer = screen.getByTestId("outer-sidebar");
      expect(p.contains(outerContainer)).toBe(true);
      expect(q.contains(outerContainer)).toBe(false);
    });

    it("THEN the Sidebar of Q opened after P opened its own is inside Q", () => {
      const { rerender } = render(makeScene(layout, []));
      const p = screen.getByTestId(PROVIDER_P);
      const q = screen.getByTestId(PROVIDER_Q);

      rerender(makeScene(layout, ["outer"]));
      expect(p.contains(screen.getByTestId("outer-sidebar"))).toBe(true);

      rerender(makeScene(layout, ["outer", "inner"]));
      expect(q.contains(screen.getByTestId("inner-sidebar"))).toBe(true);
    });
  });
});
