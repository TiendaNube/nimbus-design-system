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

const HOST_ID = "nimbus-popover-floating";

const providerOf = (element: HTMLElement): string | null =>
  element.closest("[data-provider]")?.getAttribute("data-provider") ?? null;

const hostsInDocument = (): HTMLElement[] =>
  Array.from(document.querySelectorAll<HTMLElement>(`[id="${HOST_ID}"]`));

interface OriginProps {
  name: string;
  visible: boolean;
  renderOverlay: boolean;
}

const Origin: React.FC<OriginProps> = ({ name, visible, renderOverlay }) => (
  <Popover
    visible={visible}
    renderOverlay={renderOverlay}
    content={<p>{`content ${name}`}</p>}
    data-testid={`content-${name}`}
  >
    <p>{name}</p>
  </Popover>
);

describe("GIVEN <Popover /> displayed inside theme providers", () => {
  beforeEach(() => {
    // Hosts created by earlier tests live in document.body; start clean.
    document.body.innerHTML = "";
  });

  describe("WHEN it is rendered inside a dark theme provider or outside any provider", () => {
    it("THEN should render the content inside the dark provider element (AC-010)", async () => {
      render(
        <ThemeProvider theme="dark" data-provider="Q">
          <Origin name="q" visible renderOverlay={false} />
        </ThemeProvider>
      );
      const content = await screen.findByTestId("content-q");
      expect(providerOf(content)).toBe("Q");
      expect(content.closest(`[id="${HOST_ID}"]`)?.parentElement).toBe(
        document.querySelector('[data-provider="Q"]')
      );
    });

    it("THEN should render the content in the document body without a provider (AC-010)", async () => {
      render(<Origin name="none" visible renderOverlay={false} />);
      const content = await screen.findByTestId("content-none");
      expect(providerOf(content)).toBeNull();
      expect(content.closest(`[id="${HOST_ID}"]`)?.parentElement).toBe(
        document.body
      );
    });
  });

  describe("WHEN another provider already hosts a popover with the same identifier", () => {
    const nestedBefore = (withP: boolean) => (
      <ThemeProvider data-provider="P">
        <ThemeProvider theme="dark" data-provider="Q">
          <Origin name="q" visible renderOverlay={false} />
        </ThemeProvider>
        {withP && <Origin name="p" visible renderOverlay={false} />}
      </ThemeProvider>
    );

    const nestedAfter = (withP: boolean) => (
      <ThemeProvider data-provider="P">
        {withP && <Origin name="p" visible renderOverlay={false} />}
        <ThemeProvider theme="dark" data-provider="Q">
          <Origin name="q" visible renderOverlay={false} />
        </ThemeProvider>
      </ThemeProvider>
    );

    const sibling = (withP: boolean) => (
      <>
        <ThemeProvider theme="dark" data-provider="Q">
          <Origin name="q" visible renderOverlay={false} />
        </ThemeProvider>
        <ThemeProvider data-provider="P">
          {withP && <Origin name="p" visible renderOverlay={false} />}
        </ThemeProvider>
      </>
    );

    it.each([
      ["nested provider before the origin", nestedBefore],
      ["nested provider after the origin", nestedAfter],
      ["sibling provider before the origin", sibling],
    ])(
      "THEN should render the content in its own provider, mounted later, with a %s (AC-011)",
      async (_label, tree) => {
        const { rerender } = render(tree(false));
        const inQ = await screen.findByTestId("content-q");
        expect(providerOf(inQ)).toBe("Q");
        rerender(tree(true));
        const inP = await screen.findByTestId("content-p");
        expect(providerOf(inP)).toBe("P");
      }
    );

    it("THEN should render a popover without provider, mounted later, in the body (AC-011)", async () => {
      const tree = (withOutside: boolean) => (
        <>
          <ThemeProvider theme="dark" data-provider="Q">
            <Origin name="q" visible renderOverlay={false} />
          </ThemeProvider>
          {withOutside && <Origin name="none" visible renderOverlay={false} />}
        </>
      );
      const { rerender } = render(tree(false));
      await screen.findByTestId("content-q");
      rerender(tree(true));
      const outside = await screen.findByTestId("content-none");
      expect(providerOf(outside)).toBeNull();
    });
  });

  describe("WHEN the overlay is rendered", () => {
    it("THEN should render the overlay and the content in the same host of its own provider (AC-011)", async () => {
      const tree = (withP: boolean) => (
        <ThemeProvider data-provider="P">
          <ThemeProvider theme="dark" data-provider="Q">
            <Origin name="q" visible renderOverlay={false} />
          </ThemeProvider>
          {withP && <Origin name="p" visible renderOverlay />}
        </ThemeProvider>
      );
      const { rerender } = render(tree(false));
      await screen.findByTestId("content-q");
      rerender(tree(true));
      const content = await screen.findByTestId("content-p");
      const overlay = screen.getByTestId("popover-overlay");
      expect(providerOf(content)).toBe("P");
      expect(providerOf(overlay)).toBe("P");
      expect(overlay.closest(`[id="${HOST_ID}"]`)).toBe(
        content.closest(`[id="${HOST_ID}"]`)
      );
    });
  });

  describe("WHEN several popovers are open in the same provider", () => {
    it("THEN should create a single host with the identifier", async () => {
      render(
        <ThemeProvider data-provider="P">
          <Origin name="one" visible renderOverlay={false} />
          <Origin name="two" visible renderOverlay={false} />
        </ThemeProvider>
      );
      await screen.findByTestId("content-one");
      await screen.findByTestId("content-two");
      expect(hostsInDocument()).toHaveLength(1);
    });
  });
});
