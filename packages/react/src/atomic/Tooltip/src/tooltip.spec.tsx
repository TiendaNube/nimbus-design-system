import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { tooltip as tooltipStyles, ThemeProvider } from "@nimbus-ds/styles";

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

const HOST_ID = "nimbus-tooltip-floating";

const providerOf = (element: HTMLElement): string | null =>
  element.closest("[data-provider]")?.getAttribute("data-provider") ?? null;

const hostsInDocument = (): HTMLElement[] =>
  Array.from(document.querySelectorAll<HTMLElement>(`[id="${HOST_ID}"]`));

const showTooltip = async (
  user: ReturnType<typeof userEvent.setup>,
  anchorTestId: string,
  contentTestId: string
): Promise<HTMLElement> => {
  await user.hover(screen.getByTestId(anchorTestId));
  await waitFor(() => {
    expect(screen.getByTestId(contentTestId)).toBeDefined();
  });
  return screen.getByTestId(contentTestId);
};

const Origin: React.FC<{ name: string }> = ({ name }) => (
  <Tooltip content={`content ${name}`} data-testid={`content-${name}`}>
    <p data-testid={`anchor-${name}`}>{name}</p>
  </Tooltip>
);

describe("GIVEN <Tooltip /> displayed inside theme providers", () => {
  beforeEach(() => {
    // Hosts created by earlier tests live in document.body; start clean.
    document.body.innerHTML = "";
  });

  describe("WHEN it is rendered inside a dark theme provider or outside any provider", () => {
    it("THEN should render the content inside the dark provider element (AC-005)", async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider theme="dark" data-provider="Q">
          <Origin name="q" />
        </ThemeProvider>
      );
      const content = await showTooltip(user, "anchor-q", "content-q");
      expect(providerOf(content)).toBe("Q");
      expect(content.closest(`[id="${HOST_ID}"]`)?.parentElement).toBe(
        document.querySelector('[data-provider="Q"]')
      );
    });

    it("THEN should render the content in the document body without a provider (AC-005)", async () => {
      const user = userEvent.setup();
      render(<Origin name="none" />);
      const content = await showTooltip(user, "anchor-none", "content-none");
      expect(providerOf(content)).toBeNull();
      expect(content.closest(`[id="${HOST_ID}"]`)?.parentElement).toBe(
        document.body
      );
    });
  });

  describe("WHEN another provider already hosts a tooltip with the same identifier", () => {
    const nestedBefore = (withP: boolean) => (
      <ThemeProvider data-provider="P">
        <ThemeProvider theme="dark" data-provider="Q">
          <Origin name="q" />
        </ThemeProvider>
        {withP && <Origin name="p" />}
      </ThemeProvider>
    );

    const nestedAfter = (withP: boolean) => (
      <ThemeProvider data-provider="P">
        {withP && <Origin name="p" />}
        <ThemeProvider theme="dark" data-provider="Q">
          <Origin name="q" />
        </ThemeProvider>
      </ThemeProvider>
    );

    const sibling = (withP: boolean) => (
      <>
        <ThemeProvider theme="dark" data-provider="Q">
          <Origin name="q" />
        </ThemeProvider>
        <ThemeProvider data-provider="P">
          {withP && <Origin name="p" />}
        </ThemeProvider>
      </>
    );

    it.each([
      ["nested provider before the origin", nestedBefore],
      ["nested provider after the origin", nestedAfter],
      ["sibling provider before the origin", sibling],
    ])(
      "THEN should render the content in its own provider, mounted later, with a %s (AC-006)",
      async (_label, tree) => {
        const user = userEvent.setup();
        const { rerender } = render(tree(false));
        const inQ = await showTooltip(user, "anchor-q", "content-q");
        expect(providerOf(inQ)).toBe("Q");
        rerender(tree(true));
        const inP = await showTooltip(user, "anchor-p", "content-p");
        expect(providerOf(inP)).toBe("P");
      }
    );

    it("THEN should render a tooltip without provider, mounted later, in the body (AC-006)", async () => {
      const user = userEvent.setup();
      const tree = (withOutside: boolean) => (
        <>
          <ThemeProvider theme="dark" data-provider="Q">
            <Origin name="q" />
          </ThemeProvider>
          {withOutside && <Origin name="none" />}
        </>
      );
      const { rerender } = render(tree(false));
      const inQ = await showTooltip(user, "anchor-q", "content-q");
      expect(providerOf(inQ)).toBe("Q");
      rerender(tree(true));
      const outside = await showTooltip(user, "anchor-none", "content-none");
      expect(providerOf(outside)).toBeNull();
    });
  });

  describe("WHEN several tooltips are displayed in the same provider", () => {
    it("THEN should create a single host with the identifier", async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider data-provider="P">
          <Origin name="one" />
          <Origin name="two" />
        </ThemeProvider>
      );
      await showTooltip(user, "anchor-one", "content-one");
      await showTooltip(user, "anchor-two", "content-two");
      expect(hostsInDocument()).toHaveLength(1);
    });
  });
});
