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

const HOST_ID = "nimbus-sidebar";

const providerOf = (element: HTMLElement): string | null =>
  element.closest("[data-provider]")?.getAttribute("data-provider") ?? null;

const hostOf = (element: HTMLElement): HTMLElement | null =>
  element.closest<HTMLElement>(`[id="${HOST_ID}"]`);

const ScopedSidebar: React.FC<{ name: string; open: boolean }> = ({
  name,
  open,
}) => (
  <Sidebar open={open} data-testid={`sidebar-${name}`}>
    <div>{`body ${name}`}</div>
  </Sidebar>
);

/**
 * Stage 0 mounts the providers with every sidebar closed, stage 1 opens the
 * nested provider sidebar and stage 2 opens the origin sidebar afterwards.
 */
type Stage = 0 | 1 | 2;

describe("GIVEN <Sidebar /> displayed inside theme providers", () => {
  beforeEach(() => {
    // Hosts created by earlier tests live in document.body; start clean.
    document.body.innerHTML = "";
  });

  describe("WHEN it opens inside a dark theme provider or outside any provider", () => {
    it("THEN should render inside the dark provider (AC-006)", async () => {
      const tree = (open: boolean) => (
        <ThemeProvider theme="dark" data-provider="Q">
          <ScopedSidebar name="q" open={open} />
        </ThemeProvider>
      );
      const { rerender } = render(tree(false));
      rerender(tree(true));
      const element = await screen.findByTestId("sidebar-q");
      expect(providerOf(element)).toBe("Q");
      expect(hostOf(element)?.parentElement).toBe(
        document.querySelector('[data-provider="Q"]')
      );
    });

    it("THEN should render in the document body without a provider (AC-006)", async () => {
      const { rerender } = render(<ScopedSidebar name="none" open={false} />);
      rerender(<ScopedSidebar name="none" open />);
      const element = await screen.findByTestId("sidebar-none");
      expect(providerOf(element)).toBeNull();
      expect(hostOf(element)?.parentElement).toBe(document.body);
    });
  });

  describe("WHEN another provider already hosts a sidebar", () => {
    const nestedBefore = (stage: Stage) => (
      <ThemeProvider data-provider="P">
        <ThemeProvider theme="dark" data-provider="Q">
          <ScopedSidebar name="q" open={stage >= 1} />
        </ThemeProvider>
        <ScopedSidebar name="p" open={stage >= 2} />
      </ThemeProvider>
    );

    const nestedAfter = (stage: Stage) => (
      <ThemeProvider data-provider="P">
        <ScopedSidebar name="p" open={stage >= 2} />
        <ThemeProvider theme="dark" data-provider="Q">
          <ScopedSidebar name="q" open={stage >= 1} />
        </ThemeProvider>
      </ThemeProvider>
    );

    const sibling = (stage: Stage) => (
      <>
        <ThemeProvider theme="dark" data-provider="Q">
          <ScopedSidebar name="q" open={stage >= 1} />
        </ThemeProvider>
        <ThemeProvider data-provider="P">
          <ScopedSidebar name="p" open={stage >= 2} />
        </ThemeProvider>
      </>
    );

    it.each([
      ["nested provider before the origin", nestedBefore],
      ["nested provider after the origin", nestedAfter],
      ["sibling provider before the origin", sibling],
    ])(
      "THEN should open later in its own provider with a %s (AC-007)",
      async (_label, tree) => {
        const { rerender } = render(tree(0));
        rerender(tree(1));
        expect(providerOf(await screen.findByTestId("sidebar-q"))).toBe("Q");
        rerender(tree(2));
        expect(providerOf(await screen.findByTestId("sidebar-p"))).toBe("P");
      }
    );
  });

  describe("WHEN it uses the root input", () => {
    it("THEN should keep rendering into the root and create no default host", () => {
      const root = document.createElement("div");
      document.body.appendChild(root);
      render(
        <ThemeProvider theme="dark" data-provider="Q">
          <Sidebar root={root} open data-testid="sidebar-root">
            <div>Scoped</div>
          </Sidebar>
        </ThemeProvider>
      );
      expect(root).toContainElement(screen.getByTestId("sidebar-root"));
      expect(document.getElementById(HOST_ID)).toBeNull();
    });
  });
});
