import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@nimbus-ds/styles";
import { Modal } from "@nimbus-ds/modal";

import { Popover } from "./Popover";
import { type PopoverProps } from "./popover.types";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const makeSut = (rest: Omit<PopoverProps, "children">) => {
  render(
    <Popover {...rest} data-testid="popover-element">
      <p data-testid="anchor-element">hover</p>
    </Popover>
  );
};

describe("GIVEN <Popover />", () => {
  describe("WHEN rendered", () => {
    it("THEN should display popover if anchor receives hover event", async () => {
      const user = userEvent.setup();
      makeSut({
        content: <p>string</p>,
        enabledHover: true,
      });
      await user.hover(screen.getByTestId("popover-container"));
      await waitFor(() => {
        expect(screen.getByTestId("popover-element")).toBeDefined();
      });
    });

    it("THEN should display popover if anchor receives click event", async () => {
      makeSut({
        content: <p>string</p>,
        enabledClick: true,
      });
      await act(() => {
        fireEvent.click(screen.getByTestId("popover-container"));
      });
      await waitFor(() => {
        expect(screen.getByTestId("popover-element")).toBeDefined();
      });
    });

    it("THEN should not display popover if anchor does not receive hover event", async () => {
      const user = userEvent.setup();
      makeSut({
        content: <p>string</p>,
        enabledHover: false,
      });
      await user.hover(screen.getByTestId("popover-container"));
      expect(screen.queryByTestId("popover-element")).toBeNull();
    });

    it("THEN should not display popover if anchor does not receive click event", async () => {
      makeSut({
        content: <p>string</p>,
        enabledClick: false,
      });
      await act(() => {
        fireEvent.click(screen.getByTestId("popover-container"));
      });
      expect(screen.queryByTestId("popover-element")).toBeNull();
    });

    it("THEN should display popover in correct position", async () => {
      const user = userEvent.setup();
      makeSut({
        content: <p>string</p>,
        position: "top",
        enabledHover: true,
      });
      await user.hover(screen.getByTestId("popover-container"));
      await waitFor(() => {
        expect(screen.getByTestId("popover-element")).toBeDefined();
      });
      const popover = screen.getByTestId("popover-element");
      const arrow = screen.getByTestId("arrow-element");

      expect(popover.style.top).toEqual("0px");
      expect(popover.style.left).toEqual("0px");
      expect(popover.style.transform).toEqual("translate(0px, -10px)");
      expect(popover.style.position).toEqual("fixed");

      expect(arrow.style.top).toEqual("100%");
      expect(arrow.style.position).toEqual("absolute");
    });

    it('THEN should display popover in "right" position', async () => {
      const user = userEvent.setup();
      makeSut({
        content: <p>string</p>,
        position: "right",
        enabledHover: true,
      });
      await user.hover(screen.getByTestId("popover-container"));
      await waitFor(() => {
        expect(screen.getByTestId("popover-element")).toBeDefined();
      });
      const popover = screen.getByTestId("popover-element");
      const arrow = screen.getByTestId("arrow-element");

      expect(popover.style.top).toEqual("0px");
      expect(popover.style.left).toEqual("0px");
      expect(popover.style.transform).toEqual("translate(-10px, 0px)");
      expect(popover.style.position).toEqual("fixed");

      expect(arrow.style.left).toEqual("calc(100% - 0px)");
      expect(arrow.style.transform).toBe("rotate(-90deg)");
      expect(arrow.style.position).toEqual("absolute");
    });

    it("THEN should render the popover open by default", async () => {
      await act(() => {
        makeSut({
          content: <p>string</p>,
          visible: true,
        });
      });
      const popover = screen.getByTestId("popover-element");
      expect(popover).toBeDefined();
    });

    it("THEN should control the operation by the onVisibility function sent and with popover open", async () => {
      const mockedOnVisibility = jest.fn();
      await act(() => {
        makeSut({
          content: <p>string</p>,
          visible: true,
          onVisibility: mockedOnVisibility,
        });
      });
      const popover = screen.getByTestId("popover-element");
      expect(popover).toBeDefined();
      fireEvent.click(screen.getByTestId("popover-container"));
      expect(mockedOnVisibility).toHaveBeenCalledWith(false);
    });

    it("THEN should render popover with transparent overlay when renderOverlay prop is true", async () => {
      await act(() => {
        makeSut({
          content: <p>string</p>,
          visible: true,
          renderOverlay: true,
        });
      });
      const popover = screen.getByTestId("popover-element");
      const overlay = screen.getByTestId("popover-overlay");
      expect(popover).toBeDefined();
      expect(overlay).toBeDefined();
      // Verify that the overlay has the correct popover overlay styles
      expect(overlay.className).toContain("overlay");
      expect(overlay.className).not.toContain("modal");
    });

    it("THEN should not render popover arrow", async () => {
      const user = userEvent.setup();
      makeSut({ content: <p>string</p>, arrow: false, enabledHover: true });
      await user.hover(screen.getByTestId("popover-container"));
      await waitFor(() => {
        expect(screen.getByTestId("popover-element")).toBeDefined();
      });
      expect(screen.queryByTestId("arrow-element")).toBeNull();
    });

    it('THEN should display popover in "top" position', async () => {
      const user = userEvent.setup();
      makeSut({ content: <p>string</p>, position: "top", enabledHover: true });
      await user.hover(screen.getByTestId("popover-container"));
      await waitFor(() => {
        expect(screen.getByTestId("popover-element")).toBeDefined();
      });
      const popover = screen.getByTestId("popover-element");
      const arrow = screen.getByTestId("arrow-element");

      expect(popover.style.top).toEqual("0px");
      expect(popover.style.left).toEqual("0px");
      expect(popover.style.transform).toEqual("translate(0px, -10px)");
      expect(popover.style.position).toEqual("fixed");

      expect(arrow.style.top).toEqual("100%");
      expect(arrow.style.position).toEqual("absolute");
    });

    it('THEN should display popover in "bottom" position', async () => {
      const user = userEvent.setup();
      makeSut({
        content: <p>string</p>,
        position: "bottom",
        enabledHover: true,
      });
      await user.hover(screen.getByTestId("popover-container"));
      await waitFor(() => {
        expect(screen.getByTestId("popover-element")).toBeDefined();
      });
      const popover = screen.getByTestId("popover-element");
      const arrow = screen.getByTestId("arrow-element");

      expect(popover.style.top).toEqual("0px");
      expect(popover.style.left).toEqual("0px");
      expect(popover.style.transform).toEqual("translate(0px, 10px)");
      expect(popover.style.position).toEqual("fixed");

      expect(arrow.style.bottom).toEqual("100%");
      expect(arrow.style.transform).toBe("rotate(180deg)");
      expect(arrow.style.position).toEqual("absolute");
    });

    it('THEN should display popover in "left" position', async () => {
      const user = userEvent.setup();
      makeSut({ content: <p>string</p>, position: "left", enabledHover: true });
      await user.hover(screen.getByTestId("popover-container"));
      await waitFor(() => {
        expect(screen.getByTestId("popover-element")).toBeDefined();
      });
      const popover = screen.getByTestId("popover-element");
      const arrow = screen.getByTestId("arrow-element");

      expect(popover.style.top).toEqual("0px");
      expect(popover.style.left).toEqual("0px");
      expect(popover.style.transform).toEqual("translate(-10px, 0px)");
      expect(popover.style.position).toEqual("fixed");

      expect(arrow.style.left).toEqual("calc(100% - 0px)");
      expect(arrow.style.transform).toBe("rotate(-90deg)");
      expect(arrow.style.position).toEqual("absolute");
    });

    it("THEN should control the operation by the onVisibility function sent and with popover close", async () => {
      const mockedOnVisibility = jest.fn();
      await act(() => {
        makeSut({
          content: <p>string</p>,
          visible: false,
          onVisibility: mockedOnVisibility,
        });
      });
      const popover = screen.queryByTestId("popover-element");
      expect(popover).toBeNull();
      fireEvent.click(screen.getByTestId("popover-container"));

      expect(mockedOnVisibility).toHaveBeenCalledWith(true);
    });
  });

  describe("THEN should correctly render the submitted backgroundColor", () => {
    const verifyBackgroundColor = async (
      backgroundColor: string | undefined,
      expectedClass: string
    ) => {
      const user = userEvent.setup();
      makeSut({
        content: <p>string</p>,
        backgroundColor: backgroundColor as PopoverProps["backgroundColor"],
        enabledHover: true,
      });
      await user.hover(screen.getByTestId("popover-container"));
      await waitFor(() => {
        expect(
          screen.getByTestId("popover-element").getAttribute("class")
        ).toContain(expectedClass);
      });
    };

    it("THEN should correctly render the backgroundColor default", async () => {
      await verifyBackgroundColor(undefined, "neutral-background");
    });

    it("THEN should correctly render the backgroundColor neutral-background", async () => {
      await verifyBackgroundColor("neutral-background", "neutral-background");
    });

    it("THEN should correctly render the backgroundColor primary-surfaceHighlight", async () => {
      const user = userEvent.setup();
      makeSut({
        content: <p>string</p>,
        backgroundColor: "primary-surfaceHighlight",
        enabledHover: true,
      });
      await user.hover(screen.getByTestId("popover-container"));
      await waitFor(() => {
        expect(
          screen.getByTestId("popover-element").getAttribute("class")
        ).toContain("primary-surfaceHighlight");
      });
    });

    it("THEN should correctly render the backgroundColor primary-interactiveHover", async () => {
      const user = userEvent.setup();
      makeSut({
        content: <p>string</p>,
        backgroundColor: "primary-interactiveHover",
        enabledHover: true,
      });
      await user.hover(screen.getByTestId("popover-container"));
      await waitFor(() => {
        expect(
          screen.getByTestId("popover-element").getAttribute("class")
        ).toContain("primary-interactiveHover");
      });
    });

    it("THEN should correctly render the backgroundColor danger-surfaceHighlight", async () => {
      const user = userEvent.setup();
      makeSut({
        content: <p>string</p>,
        backgroundColor: "danger-surfaceHighlight",
        enabledHover: true,
      });
      await user.hover(screen.getByTestId("popover-container"));
      await waitFor(() => {
        expect(
          screen.getByTestId("popover-element").getAttribute("class")
        ).toContain("danger-surfaceHighlight");
      });
    });

    it("THEN should correctly render the backgroundColor neutral-surfaceHighlight", async () => {
      const user = userEvent.setup();
      makeSut({
        content: <p>string</p>,
        backgroundColor: "neutral-surfaceHighlight",
        enabledHover: true,
      });
      await user.hover(screen.getByTestId("popover-container"));
      await waitFor(() => {
        expect(
          screen.getByTestId("popover-element").getAttribute("class")
        ).toContain("neutral-surfaceHighlight");
      });
    });

    it("THEN should correctly render the backgroundColor success-surfaceHighlight", async () => {
      const user = userEvent.setup();
      makeSut({
        content: <p>string</p>,
        backgroundColor: "success-surfaceHighlight",
        enabledHover: true,
      });
      await user.hover(screen.getByTestId("popover-container"));
      await waitFor(() => {
        expect(
          screen.getByTestId("popover-element").getAttribute("class")
        ).toContain("success-surfaceHighlight");
      });
    });

    it("THEN should correctly render the backgroundColor warning-surfaceHighlight", async () => {
      const user = userEvent.setup();
      makeSut({
        content: <p>string</p>,
        backgroundColor: "warning-surfaceHighlight",
        enabledHover: true,
      });
      await user.hover(screen.getByTestId("popover-container"));
      await waitFor(() => {
        expect(
          screen.getByTestId("popover-element").getAttribute("class")
        ).toContain("warning-surfaceHighlight");
      });
    });
  });

  describe("THEN should correctly render the submitted padding", () => {
    it("THEN should correctly render the padding base", async () => {
      const user = userEvent.setup();
      makeSut({ content: <p>string</p>, padding: "base", enabledHover: true });
      await user.hover(screen.getByTestId("popover-container"));
      await waitFor(() => {
        expect(
          screen.getByTestId("popover-element").getAttribute("class")
        ).toContain("padding-base");
      });
    });

    it("THEN should correctly render the padding none", async () => {
      const user = userEvent.setup();
      makeSut({ content: <p>string</p>, padding: "none", enabledHover: true });
      await user.hover(screen.getByTestId("popover-container"));
      await waitFor(() => {
        expect(
          screen.getByTestId("popover-element").getAttribute("class")
        ).toContain("padding-none");
      });
    });

    it("THEN should correctly render the padding small", async () => {
      const user = userEvent.setup();
      makeSut({ content: <p>string</p>, padding: "small", enabledHover: true });
      await user.hover(screen.getByTestId("popover-container"));
      await waitFor(() => {
        expect(
          screen.getByTestId("popover-element").getAttribute("class")
        ).toContain("padding-small");
      });
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
const LateMount: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = React.useState(false);
  return (
    <>
      <button type="button" onClick={() => setMounted(true)}>
        mount-late
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

type User = ReturnType<typeof userEvent.setup>;

const makeTrigger = (name: string, renderOverlay = false) => (
  <Popover content={<p>content-{name}</p>} renderOverlay={renderOverlay}>
    <button type="button" data-testid={`trigger-${name}`}>
      {name}
    </button>
  </Popover>
);

const openPopover = async (user: User, name: string): Promise<HTMLElement> => {
  await user.click(screen.getByTestId(`trigger-${name}`));
  return screen.findByText(`content-${name}`);
};

describe("GIVEN <Popover /> inside theme providers", () => {
  beforeEach(removeBodyPortalHosts);

  describe("WHEN opened inside a dark provider or outside any provider", () => {
    it("THEN should render the panel inside its dark provider", async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider theme="dark" data-provider="Q">
          {makeTrigger("q")}
        </ThemeProvider>
      );
      expect(providerOf(await openPopover(user, "q"))).toBe("Q");
    });

    it("THEN should render the panel outside every provider element when there is none", async () => {
      const user = userEvent.setup();
      render(
        <>
          <ThemeProvider data-provider="P">
            <p>unrelated</p>
          </ThemeProvider>
          {makeTrigger("none")}
        </>
      );
      const content = await openPopover(user, "none");
      expect(content).toBeVisible();
      expect(providerOf(content)).toBeNull();
    });
  });

  describe.each(LAYOUT_KINDS)(
    "WHEN Q already opened a popover and a popover mounts later in P (%s)",
    (kind) => {
      it("THEN should keep each panel and overlay inside its own nearest provider", async () => {
        const user = userEvent.setup();
        render(
          buildLayout(
            kind,
            makeTrigger("q"),
            <LateMount>{makeTrigger("p", true)}</LateMount>
          )
        );

        expect(providerOf(await openPopover(user, "q"))).toBe("Q");
        await user.click(screen.getByText("mount-late"));
        expect(providerOf(await openPopover(user, "p"))).toBe("P");
        expect(providerOf(screen.getByTestId("popover-overlay"))).toBe("P");
      });
    }
  );

  describe("WHEN a base Modal in P holds a popover with overlay and Q already opened a popover", () => {
    it("THEN should keep the overlay and the panel inside P and none inside Q", async () => {
      const user = userEvent.setup();
      render(
        buildLayout(
          "q-nested-before",
          makeTrigger("q"),
          <LateMount>
            <Modal open zIndex="base" data-testid="modal-container">
              {makeTrigger("modal", true)}
            </Modal>
          </LateMount>
        )
      );

      expect(providerOf(await openPopover(user, "q"))).toBe("Q");
      await user.click(screen.getByText("mount-late"));

      const panel = await openPopover(user, "modal");
      expect(providerOf(screen.getByTestId("modal-container"))).toBe("P");
      expect(providerOf(panel)).toBe("P");
      expect(providerOf(screen.getByTestId("popover-overlay"))).toBe("P");
    });
  });
});
