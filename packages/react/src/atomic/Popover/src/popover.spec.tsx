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

type Layout = "nested-after-anchor" | "nested-before-anchor" | "sibling-before";
type Name = "inner" | "outer";

const PROVIDER_P = "provider-p";
const PROVIDER_Q = "provider-q";
const WRAPPER_ID = "nimbus-popover-floating";

const makePopover = (name: Name) => (
  <Popover content={<p>{`${name} content`}</p>} data-testid={`${name}-popover`}>
    <p>{`${name} anchor`}</p>
  </Popover>
);

/**
 * P (base) is the origin of the "outer" popover, Q (dark) holds the "inner"
 * popover (a themed side area). `layout` places Q relative to the outer anchor.
 * A popover is mounted only while its name is in `mounted`, so the second one
 * can be mounted after the first has already created its floating wrapper.
 */
const makeScene = (layout: Layout, mounted: Name[]) => {
  const inner = (
    <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
      {mounted.includes("inner") && makePopover("inner")}
    </ThemeProvider>
  );
  const outer = mounted.includes("outer") && makePopover("outer");

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

const openPopover = async (
  user: ReturnType<typeof userEvent.setup>,
  name: Name
) => {
  const anchor = screen.getByText(`${name} anchor`).closest("div");
  await user.click(anchor as HTMLElement);
  return waitFor(() => screen.getByTestId(`${name}-popover`));
};

describe("GIVEN <Popover /> inside theme providers", () => {
  beforeEach(() => {
    // Popovers rendered outside any provider leave their identified wrapper in
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
          {makePopover("inner")}
        </ThemeProvider>
      );
      const content = await openPopover(user, "inner");
      expect(screen.getByTestId(PROVIDER_Q).contains(content)).toBe(true);
    });
  });

  describe("WHEN it is displayed outside any theme provider", () => {
    it("THEN should still display its content, without a theme scope", async () => {
      const user = userEvent.setup();
      render(makePopover("outer"));
      const content = await openPopover(user, "outer");
      expect(content.closest(`[data-testid="${PROVIDER_P}"]`)).toBeNull();
      expect(document.body.contains(content)).toBe(true);
    });
  });

  describe.each<Layout>([
    "nested-after-anchor",
    "nested-before-anchor",
    "sibling-before",
  ])("AND the dark provider Q is placed as %s", (layout) => {
    it("THEN the popover of P mounted after Q displayed its own is inside P and not inside Q", async () => {
      const user = userEvent.setup();
      const { rerender } = render(makeScene(layout, ["inner"]));
      const p = screen.getByTestId(PROVIDER_P);
      const q = screen.getByTestId(PROVIDER_Q);

      const innerContent = await openPopover(user, "inner");
      expect(q.contains(innerContent)).toBe(true);

      rerender(makeScene(layout, ["inner", "outer"]));
      const outerContent = await openPopover(user, "outer");
      expect(p.contains(outerContent)).toBe(true);
      expect(q.contains(outerContent)).toBe(false);
    });

    it("THEN the popover of Q mounted after P displayed its own is inside Q", async () => {
      const user = userEvent.setup();
      const { rerender } = render(makeScene(layout, ["outer"]));
      const p = screen.getByTestId(PROVIDER_P);
      const q = screen.getByTestId(PROVIDER_Q);

      const outerContent = await openPopover(user, "outer");
      expect(p.contains(outerContent)).toBe(true);

      rerender(makeScene(layout, ["outer", "inner"]));
      const innerContent = await openPopover(user, "inner");
      expect(q.contains(innerContent)).toBe(true);
      expect(innerContent.closest(`#${WRAPPER_ID}`)?.parentElement).toBe(q);
    });
  });
});

describe("GIVEN the floating host lifecycle of <Popover />", () => {
  const hosts = () => document.querySelectorAll(`#${WRAPPER_ID}`);

  beforeEach(() => {
    hosts().forEach((element) => element.remove());
  });

  const makeControlled = (names: Name[], visible: Name[]) => (
    <ThemeProvider theme="dark" data-testid={PROVIDER_Q}>
      {names.map((name) => (
        <Popover
          key={name}
          visible={visible.includes(name)}
          content={<p>{`${name} content`}</p>}
          data-testid={`${name}-popover`}
        >
          <p>{`${name} anchor`}</p>
        </Popover>
      ))}
    </ThemeProvider>
  );

  it("THEN should not create a host while it is closed", () => {
    render(makeControlled(["inner"], []));
    expect(hosts()).toHaveLength(0);
  });

  it("THEN should host content outside any provider as a direct child of the body", async () => {
    const user = userEvent.setup();
    render(makePopover("outer"));
    const content = await openPopover(user, "outer");
    expect(content.closest(`#${WRAPPER_ID}`)?.parentElement).toBe(
      document.body
    );
  });

  it("THEN two displayed popovers share one host per provider and closing one keeps the other", () => {
    const { rerender } = render(
      makeControlled(["inner", "outer"], ["inner", "outer"])
    );
    const q = screen.getByTestId(PROVIDER_Q);
    expect(q.querySelectorAll(`#${WRAPPER_ID}`)).toHaveLength(1);
    expect(screen.getByTestId("inner-popover")).toBeTruthy();
    expect(screen.getByTestId("outer-popover")).toBeTruthy();

    rerender(makeControlled(["inner", "outer"], ["outer"]));
    expect(screen.queryByTestId("inner-popover")).toBeNull();
    expect(screen.getByTestId("outer-popover")).toBeTruthy();
    expect(q.querySelectorAll(`#${WRAPPER_ID}`)).toHaveLength(1);
  });

  it("THEN should remove its owned host once closed or unmounted", () => {
    const { rerender } = render(makeControlled(["inner"], ["inner"]));
    expect(hosts()).toHaveLength(1);

    rerender(makeControlled(["inner"], []));
    expect(hosts()).toHaveLength(0);

    rerender(makeControlled(["inner"], ["inner"]));
    expect(hosts()).toHaveLength(1);
    rerender(makeControlled([], []));
    expect(hosts()).toHaveLength(0);
  });

  it("THEN should reuse a host placed by the consumer inside the provider and never remove it", () => {
    const { rerender } = render(makeControlled(["inner"], []));
    const q = screen.getByTestId(PROVIDER_Q);
    const own = document.createElement("div");
    own.id = WRAPPER_ID;
    q.appendChild(own);

    rerender(makeControlled(["inner"], ["inner"]));
    expect(own.contains(screen.getByTestId("inner-popover"))).toBe(true);
    expect(hosts()).toHaveLength(1);

    rerender(makeControlled(["inner"], []));
    expect(q.contains(own)).toBe(true);
  });

  it("THEN should render its content once, in the provider host, under StrictMode", () => {
    render(
      <React.StrictMode>
        {makeControlled(["inner"], ["inner"])}
      </React.StrictMode>
    );
    expect(screen.getAllByTestId("inner-popover")).toHaveLength(1);
    expect(
      screen.getByTestId("inner-popover").closest(`#${WRAPPER_ID}`)
        ?.parentElement
    ).toBe(screen.getByTestId(PROVIDER_Q));
  });
});
