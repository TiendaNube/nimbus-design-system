import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

type LayoutKind =
  | "q-nested-before"
  | "q-nested-after"
  | "q-sibling-before"
  | "q-sibling-after";

const LAYOUT_KINDS: LayoutKind[] = [
  "q-nested-before",
  "q-nested-after",
  "q-sibling-before",
  "q-sibling-after",
];

/** Builds P and a dark Q in the given document order; `outer` belongs to P and `inner` to Q. */
const buildLayout = (
  kind: LayoutKind,
  inner: React.ReactNode,
  outer: React.ReactNode
): React.ReactElement => {
  const q = (
    <ThemeProvider theme="dark" data-provider="Q">
      {inner}
    </ThemeProvider>
  );
  switch (kind) {
    case "q-nested-before":
      return (
        <ThemeProvider data-provider="P">
          {q}
          {outer}
        </ThemeProvider>
      );
    case "q-nested-after":
      return (
        <ThemeProvider data-provider="P">
          {outer}
          {q}
        </ThemeProvider>
      );
    case "q-sibling-before":
      return (
        <>
          {q}
          <ThemeProvider data-provider="P">{outer}</ThemeProvider>
        </>
      );
    default:
      return (
        <>
          <ThemeProvider data-provider="P">{outer}</ThemeProvider>
          {q}
        </>
      );
  }
};

/** Mounts its children only after the button is pressed, so they mount after earlier floating content. */
const LateMount: React.FC<{ children: React.ReactNode; label: string }> = ({
  children,
  label,
}) => {
  const [mounted, setMounted] = React.useState(false);
  return (
    <>
      <button type="button" onClick={() => setMounted(true)}>
        {label}
      </button>
      {mounted && children}
    </>
  );
};

const PROVIDER_ATTRIBUTE = "data-provider";

const providerOf = (element: HTMLElement): string | null =>
  element
    .closest(`[${PROVIDER_ATTRIBUTE}]`)
    ?.getAttribute(PROVIDER_ATTRIBUTE) ?? null;

/** Resets body-level portal hosts left by earlier tests so each scenario starts from a clean document. */
const removeBodyPortalHosts = (): void => {
  document.querySelectorAll("body > [id]").forEach((host) => host.remove());
};

describe("GIVEN <Sidebar /> inside theme providers", () => {
  beforeEach(removeBodyPortalHosts);

  describe("WHEN opened inside a dark provider or outside any provider", () => {
    it("THEN should render inside its dark provider", () => {
      render(
        <ThemeProvider theme="dark" data-provider="Q">
          <Sidebar open data-testid="sidebar-element">
            <div>content</div>
          </Sidebar>
        </ThemeProvider>
      );
      expect(providerOf(screen.getByTestId("sidebar-element"))).toBe("Q");
    });

    it("THEN should render outside every provider element when there is none", () => {
      render(
        <>
          <ThemeProvider data-provider="P">
            <p>unrelated</p>
          </ThemeProvider>
          <Sidebar open data-testid="sidebar-element">
            <div>content</div>
          </Sidebar>
        </>
      );
      const element = screen.getByTestId("sidebar-element");
      expect(element).toBeVisible();
      expect(providerOf(element)).toBeNull();
    });
  });

  describe.each(LAYOUT_KINDS)(
    "WHEN Q already opened a Sidebar and a Sidebar mounts later in P (%s)",
    (kind) => {
      it("THEN should render the Sidebar inside P", async () => {
        const user = userEvent.setup();
        render(
          buildLayout(
            kind,
            <LateMount label="mount-q">
              <Sidebar open data-testid="sidebar-q">
                <div>content</div>
              </Sidebar>
            </LateMount>,
            <LateMount label="mount-p">
              <Sidebar open data-testid="sidebar-p">
                <div>content</div>
              </Sidebar>
            </LateMount>
          )
        );
        await user.click(screen.getByText("mount-q"));
        expect(providerOf(screen.getByTestId("sidebar-q"))).toBe("Q");
        await user.click(screen.getByText("mount-p"));
        expect(providerOf(screen.getByTestId("sidebar-p"))).toBe("P");
      });
    }
  );

  describe("WHEN root is provided inside a provider", () => {
    it("THEN should render inside root and create no portal host", () => {
      const hostCount = (): number =>
        document.querySelectorAll("#nimbus-sidebar").length;
      const before = hostCount();
      const root = document.createElement("div");
      document.body.appendChild(root);
      render(
        <ThemeProvider data-provider="P">
          <Sidebar open root={root} data-testid="sidebar-element">
            <div>content</div>
          </Sidebar>
        </ThemeProvider>
      );
      expect(root.contains(screen.getByTestId("sidebar-element"))).toBe(true);
      expect(hostCount()).toBe(before);
      document.body.removeChild(root);
    });
  });
});
