import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { tooltip as tooltipStyles, ThemeProvider } from "@nimbus-ds/styles";
import { Modal } from "@nimbus-ds/modal";
import { Popover } from "@nimbus-ds/popover";

import { Tooltip } from "./Tooltip";
import { type TooltipProps } from "./tooltip.types";

const makeSut = (rest: Omit<TooltipProps, "children">) => {
  render(
    <Tooltip {...rest} data-testid="tooltip-element">
      <p data-testid="anchor-element">hover</p>
    </Tooltip>
  );
};

describe("GIVEN <Tooltip />", () => {
  describe("WHEN rendered", () => {
    it("THEN should display tooltip if anchor receives hover event", async () => {
      const user = userEvent.setup();
      makeSut({ content: "string" });
      await user.hover(screen.getByTestId("tooltip-container"));
      await waitFor(() => {
        expect(screen.getByTestId("tooltip-element")).toBeDefined();
      });
    });

    it('THEN should display tooltip in "top" position', async () => {
      const user = userEvent.setup();
      makeSut({ content: "string", position: "top", arrow: true });
      await user.hover(screen.getByTestId("tooltip-container"));
      await waitFor(() => {
        expect(screen.getByTestId("tooltip-element")).toBeDefined();
      });

      const tooltip = screen.getByTestId("tooltip-element");
      const arrow = screen.getByTestId("arrow-element");

      expect(tooltip.style.top).toEqual("0px");
      expect(tooltip.style.left).toEqual("0px");
      expect(tooltip.style.position).toEqual("fixed");

      expect(arrow.style.top).toEqual("100%");
      expect(arrow.style.position).toEqual("absolute");
    });

    it('THEN should display tooltip in "bottom" position', async () => {
      const user = userEvent.setup();
      makeSut({ content: "string", position: "bottom", arrow: true });
      await user.hover(screen.getByTestId("tooltip-container"));
      await waitFor(() => {
        expect(screen.getByTestId("tooltip-element")).toBeDefined();
      });

      const tooltip = screen.getByTestId("tooltip-element");
      const arrow = screen.getByTestId("arrow-element");

      expect(tooltip.style.top).toEqual("0px");
      expect(tooltip.style.left).toEqual("0px");
      expect(tooltip.style.position).toEqual("fixed");

      expect(arrow.style.bottom).toEqual("100%");
      expect(arrow.style.transform).toBe("rotate(180deg)");
      expect(arrow.style.position).toEqual("absolute");
    });

    it('THEN should display tooltip in "left" position', async () => {
      const user = userEvent.setup();
      makeSut({ content: "string", position: "left", arrow: true });
      await user.hover(screen.getByTestId("tooltip-container"));
      await waitFor(() => {
        expect(screen.getByTestId("tooltip-element")).toBeDefined();
      });

      const tooltip = screen.getByTestId("tooltip-element");
      const arrow = screen.getByTestId("arrow-element");

      expect(tooltip.style.top).toEqual("0px");
      expect(tooltip.style.left).toEqual("0px");
      expect(tooltip.style.position).toEqual("fixed");

      expect(arrow.style.left).toEqual("calc(100% - 0px)");
      expect(arrow.style.transform).toBe("rotate(-90deg)");
      expect(arrow.style.position).toEqual("absolute");
    });

    it('THEN should display tooltip in "right" position', async () => {
      const user = userEvent.setup();
      makeSut({ content: "string", position: "right", arrow: true });
      await user.hover(screen.getByTestId("tooltip-container"));
      await waitFor(() => {
        expect(screen.getByTestId("tooltip-element")).toBeDefined();
      });

      const tooltip = screen.getByTestId("tooltip-element");
      const arrow = screen.getByTestId("arrow-element");

      expect(tooltip.style.top).toEqual("0px");
      expect(tooltip.style.left).toEqual("0px");
      expect(tooltip.style.position).toEqual("fixed");

      expect(arrow.style.left).toEqual("calc(100% - 0px)");
      expect(arrow.style.transform).toBe("rotate(-90deg)");
      expect(arrow.style.position).toEqual("absolute");
    });

    it('should not display arrow if "arrow" is not passed', async () => {
      const user = userEvent.setup();
      makeSut({ content: "string" });
      await user.hover(screen.getByTestId("tooltip-container"));
      await waitFor(() => {
        expect(screen.getByTestId("tooltip-element")).toBeDefined();
      });

      const arrow = screen.queryByTestId("arrow-element");
      expect(arrow).toBeNull();
    });

    it("should set correctly the className and width using the sprinkle", async () => {
      const user = userEvent.setup();
      const maxWidth = "400px";
      const className = "custom-class";
      const rest = { customProp: "value" };

      const sprinkleSpy = jest
        .spyOn(tooltipStyles, "sprinkle")
        .mockReturnValue({
          className,
          style: { maxWidth },
          otherProps: { "data-test": "value" },
        });

      makeSut({ content: "string", maxWidth, ...rest });

      expect(sprinkleSpy).toHaveBeenCalledWith({
        ...rest,
        maxWidth,
        "data-testid": "tooltip-element",
      });

      await user.hover(screen.getByTestId("tooltip-container"));
      await waitFor(() => {
        expect(screen.getByTestId("tooltip-element")).toBeDefined();
      });

      const tooltip = screen.getByTestId("tooltip-element");
      expect(tooltip.className).toContain(className);
      expect(tooltip.style.maxWidth).toEqual(maxWidth);

      sprinkleSpy.mockRestore();
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

const showTooltip = async (user: User, name: string): Promise<HTMLElement> => {
  await user.hover(screen.getByTestId(`anchor-${name}`));
  return screen.findByText(`content-${name}`);
};

const makeAnchoredTooltip = (name: string) => (
  <Tooltip content={`content-${name}`}>
    <p data-testid={`anchor-${name}`}>{name}</p>
  </Tooltip>
);

describe("GIVEN <Tooltip /> inside theme providers", () => {
  beforeEach(removeBodyPortalHosts);

  describe("WHEN displayed inside a dark provider or outside any provider", () => {
    it("THEN should render the content inside its dark provider", async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider theme="dark" data-provider="Q">
          {makeAnchoredTooltip("q")}
        </ThemeProvider>
      );
      expect(providerOf(await showTooltip(user, "q"))).toBe("Q");
    });

    it("THEN should render the content outside every provider element when there is none", async () => {
      const user = userEvent.setup();
      render(
        <>
          <ThemeProvider data-provider="P">
            <p>unrelated</p>
          </ThemeProvider>
          {makeAnchoredTooltip("none")}
        </>
      );
      const content = await showTooltip(user, "none");
      expect(content).toBeVisible();
      expect(providerOf(content)).toBeNull();
    });
  });

  describe.each(LAYOUT_KINDS)(
    "WHEN Q already displayed a tooltip and a tooltip mounts later in P (%s)",
    (kind) => {
      it("THEN should keep each content inside its own nearest provider", async () => {
        const user = userEvent.setup();
        render(
          buildLayout(
            kind,
            makeAnchoredTooltip("q"),
            <LateMount>{makeAnchoredTooltip("p")}</LateMount>
          )
        );

        expect(providerOf(await showTooltip(user, "q"))).toBe("Q");
        await user.click(screen.getByText("mount-late"));
        expect(providerOf(await showTooltip(user, "p"))).toBe("P");
      });
    }
  );

  describe("WHEN a base Modal in P has a Tooltip and a Popover and Q already displayed a Tooltip", () => {
    it("THEN should keep the overlay, the Tooltip and the Popover inside P and none inside Q", async () => {
      const user = userEvent.setup();
      render(
        buildLayout(
          "q-nested-before",
          makeAnchoredTooltip("q"),
          <LateMount>
            <Modal open zIndex="base" data-testid="modal-container">
              {makeAnchoredTooltip("modal")}
              <Popover content={<p>content-popover</p>} renderOverlay>
                <button type="button">open-popover</button>
              </Popover>
            </Modal>
          </LateMount>
        )
      );

      expect(providerOf(await showTooltip(user, "q"))).toBe("Q");
      await user.click(screen.getByText("mount-late"));
      const contentModal = await showTooltip(user, "modal");
      await user.click(screen.getByText("open-popover"));
      const contentPopover = await screen.findByText("content-popover");

      expect(providerOf(screen.getByTestId("modal-container"))).toBe("P");
      expect(providerOf(contentModal)).toBe("P");
      expect(providerOf(contentPopover)).toBe("P");
      expect(providerOf(screen.getByTestId("popover-overlay"))).toBe("P");
    });
  });
});
