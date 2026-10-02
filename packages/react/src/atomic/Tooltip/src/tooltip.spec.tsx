import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

type Layout = "nested-after-anchor" | "nested-before-anchor" | "sibling-before";
type Name = "inner" | "outer";

const PROVIDER_P = "provider-p";
const PROVIDER_Q = "provider-q";
const WRAPPER_ID = "nimbus-tooltip-floating";

const makeTooltip = (name: Name) => (
  <Tooltip content={`${name} content`} data-testid={`${name}-tooltip`}>
    <p>{`${name} anchor`}</p>
  </Tooltip>
);

/**
 * P (base) is the origin of the "outer" tooltip, Q (dark) holds the "inner"
 * tooltip (a themed side area). `layout` places Q relative to the outer anchor.
 * A tooltip is mounted only while its name is in `mounted`, so the second one
 * can be mounted after the first has already created its floating wrapper.
 */
const makeScene = (layout: Layout, mounted: Name[]) => {
  const inner = (
    <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
      {mounted.includes("inner") && makeTooltip("inner")}
    </ThemeProvider>
  );
  const outer = mounted.includes("outer") && makeTooltip("outer");

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
      {layout === "nested-before-anchor" && inner}
      {outer}
      {layout === "nested-after-anchor" && inner}
    </ThemeProvider>
  );
};

const hoverAnchor = async (
  user: ReturnType<typeof userEvent.setup>,
  name: Name
) => {
  const anchor = screen.getByText(`${name} anchor`).closest("div");
  await user.hover(anchor as HTMLElement);
  return waitFor(() => screen.getByTestId(`${name}-tooltip`));
};

describe("GIVEN <Tooltip /> inside theme providers", () => {
  beforeEach(() => {
    // Tooltips rendered outside any provider leave their identified wrapper in
    // the body after unmount; remove it so each scenario starts from a clean document.
    document
      .querySelectorAll(`#${WRAPPER_ID}`)
      .forEach((element) => element.remove());
  });

  describe("WHEN it is displayed inside a single theme provider", () => {
    it("THEN should render its content inside the provider element", async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
          {makeTooltip("inner")}
        </ThemeProvider>
      );
      const content = await hoverAnchor(user, "inner");
      expect(screen.getByTestId(PROVIDER_Q).contains(content)).toBe(true);
    });
  });

  describe("WHEN it is displayed outside any theme provider", () => {
    it("THEN should still display its content, without a theme scope", async () => {
      const user = userEvent.setup();
      render(makeTooltip("outer"));
      const content = await hoverAnchor(user, "outer");
      expect(content.closest(`[data-testid="${PROVIDER_P}"]`)).toBeNull();
      expect(document.body.contains(content)).toBe(true);
    });
  });

  describe.each<Layout>([
    "nested-after-anchor",
    "nested-before-anchor",
    "sibling-before",
  ])("AND the dark provider Q is placed as %s", (layout) => {
    it("THEN the tooltip of P mounted after Q displayed its own is inside P and not inside Q", async () => {
      const user = userEvent.setup();
      const { rerender } = render(makeScene(layout, ["inner"]));
      const p = screen.getByTestId(PROVIDER_P);
      const q = screen.getByTestId(PROVIDER_Q);

      const innerContent = await hoverAnchor(user, "inner");
      expect(q.contains(innerContent)).toBe(true);

      rerender(makeScene(layout, ["inner", "outer"]));
      const outerContent = await hoverAnchor(user, "outer");
      expect(p.contains(outerContent)).toBe(true);
      expect(q.contains(outerContent)).toBe(false);
    });

    it("THEN the tooltip of Q mounted after P displayed its own is inside Q", async () => {
      const user = userEvent.setup();
      const { rerender } = render(makeScene(layout, ["outer"]));
      const p = screen.getByTestId(PROVIDER_P);
      const q = screen.getByTestId(PROVIDER_Q);

      const outerContent = await hoverAnchor(user, "outer");
      expect(p.contains(outerContent)).toBe(true);

      rerender(makeScene(layout, ["outer", "inner"]));
      const innerContent = await hoverAnchor(user, "inner");
      expect(q.contains(innerContent)).toBe(true);
      expect(innerContent.closest(`#${WRAPPER_ID}`)?.parentElement).toBe(q);
    });
  });
});

describe("GIVEN the floating host lifecycle of <Tooltip />", () => {
  const hosts = () => document.querySelectorAll(`#${WRAPPER_ID}`);

  beforeEach(() => {
    hosts().forEach((element) => element.remove());
  });

  const openByMouse = async (name: Name) => {
    fireEvent.mouseMove(
      screen.getByText(`${name} anchor`).closest("div") as HTMLElement
    );
    return waitFor(() => screen.getByTestId(`${name}-tooltip`));
  };

  it("THEN should not create a host while it is closed", () => {
    render(
      <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
        {makeTooltip("inner")}
      </ThemeProvider>
    );
    expect(hosts()).toHaveLength(0);
  });

  it("THEN should host content outside any provider as a direct child of the body", async () => {
    const user = userEvent.setup();
    render(makeTooltip("outer"));
    const content = await hoverAnchor(user, "outer");
    expect(content.closest(`#${WRAPPER_ID}`)?.parentElement).toBe(
      document.body
    );
  });

  it("THEN two displayed tooltips share one host per provider and closing one keeps the other", async () => {
    const { rerender } = render(
      <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
        {makeTooltip("inner")}
        {makeTooltip("outer")}
      </ThemeProvider>
    );
    await openByMouse("inner");
    await openByMouse("outer");
    const q = screen.getByTestId(PROVIDER_Q);
    expect(q.querySelectorAll(`#${WRAPPER_ID}`)).toHaveLength(1);

    rerender(
      <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
        {makeTooltip("outer")}
      </ThemeProvider>
    );
    expect(screen.getByTestId("outer-tooltip")).toBeTruthy();
    expect(q.querySelectorAll(`#${WRAPPER_ID}`)).toHaveLength(1);
  });

  it("THEN should remove its owned host once its content is unmounted", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
        {makeTooltip("inner")}
      </ThemeProvider>
    );
    await hoverAnchor(user, "inner");
    expect(hosts()).toHaveLength(1);

    rerender(<ThemeProvider theme="dark" data-testid={PROVIDER_Q} />);
    expect(hosts()).toHaveLength(0);
  });

  it("THEN should reuse a host placed by the consumer inside the provider and never remove it", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
        {makeTooltip("inner")}
      </ThemeProvider>
    );
    const q = screen.getByTestId(PROVIDER_Q);
    const own = document.createElement("div");
    own.id = WRAPPER_ID;
    q.appendChild(own);

    const content = await hoverAnchor(user, "inner");
    expect(own.contains(content)).toBe(true);
    expect(hosts()).toHaveLength(1);

    rerender(<ThemeProvider theme="dark" data-testid={PROVIDER_Q} />);
    expect(q.contains(own)).toBe(true);
  });

  it("THEN should display its content again inside an attached provider host after being closed and reopened", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
        {makeTooltip("inner")}
      </ThemeProvider>
    );
    const q = screen.getByTestId(PROVIDER_Q);
    await hoverAnchor(user, "inner");

    await user.unhover(
      screen.getByText("inner anchor").closest("div") as HTMLElement
    );
    await waitFor(() =>
      expect(screen.queryByTestId("inner-tooltip")).toBeNull()
    );

    const content = await hoverAnchor(user, "inner");
    const host = content.closest(`#${WRAPPER_ID}`);
    expect(host?.parentElement).toBe(q);
    expect(document.body.contains(content)).toBe(true);
    expect(hosts()).toHaveLength(1);
  });

  it("THEN should render its content once, in the provider host, under StrictMode", async () => {
    const user = userEvent.setup();
    render(
      <React.StrictMode>
        <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
          {makeTooltip("inner")}
        </ThemeProvider>
      </React.StrictMode>
    );
    const content = await hoverAnchor(user, "inner");
    expect(screen.getAllByTestId("inner-tooltip")).toHaveLength(1);
    expect(content.closest(`#${WRAPPER_ID}`)?.parentElement).toBe(
      screen.getByTestId(PROVIDER_Q)
    );
  });
});
