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

const namedPopover = (name: string, visible = true) => (
  <Popover
    content={name}
    visible={visible}
    onVisibility={jest.fn()}
    data-testid={`popover-${name}`}
  >
    <p>{`anchor-${name}`}</p>
  </Popover>
);

const getPortalWrapper = (content: HTMLElement) =>
  content.closest("[data-floating-ui-portal]")?.parentElement ?? null;

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

  describe("WHEN rendered inside ThemeProviders", () => {
    beforeEach(() => {
      document.body.innerHTML = "";
    });

    it("THEN content mounts in its own provider after another provider's popover mounted first", async () => {
      const { rerender } = render(renderProviders({}));
      rerender(renderProviders({ dark: namedPopover("dark") }));
      await screen.findByTestId("popover-dark");
      rerender(
        renderProviders({
          dark: namedPopover("dark"),
          base: namedPopover("base")
        })
      );

      const wrapper = getPortalWrapper(
        await screen.findByTestId("popover-base")
      );
      expect(wrapper?.id).toEqual("nimbus-popover-floating");
      expect(wrapper?.parentElement).toBe(screen.getByTestId("provider-base"));
    });

    it("AND content mounts in its own provider when the providers are used in reverse order", async () => {
      const { rerender } = render(renderProviders({}));
      rerender(renderProviders({ base: namedPopover("base") }));
      await screen.findByTestId("popover-base");
      rerender(
        renderProviders({
          base: namedPopover("base"),
          dark: namedPopover("dark")
        })
      );

      const wrapper = getPortalWrapper(
        await screen.findByTestId("popover-dark")
      );
      expect(wrapper?.id).toEqual("nimbus-popover-floating");
      expect(wrapper?.parentElement).toBe(screen.getByTestId("provider-dark"));
    });

    it("AND content without a provider mounts in a body wrapper after a provider's popover mounted first", async () => {
      render(renderProviders({ base: namedPopover("base") }));
      await screen.findByTestId("popover-base");
      render(namedPopover("plain"));

      const wrapper = getPortalWrapper(
        await screen.findByTestId("popover-plain")
      );
      expect(wrapper?.id).toEqual("nimbus-popover-floating");
      expect(wrapper?.parentElement).toBe(document.body);
    });

    it("AND content in a provider mounts in that provider after a popover without provider mounted first", async () => {
      render(namedPopover("plain"));
      await screen.findByTestId("popover-plain");
      render(renderProviders({ base: namedPopover("base") }));

      const wrapper = getPortalWrapper(
        await screen.findByTestId("popover-base")
      );
      expect(wrapper?.id).toEqual("nimbus-popover-floating");
      expect(wrapper?.parentElement).toBe(screen.getByTestId("provider-base"));
    });

    it("AND content stays in its provider when it is closed and reopened", async () => {
      const { rerender } = render(
        renderProviders({ base: namedPopover("base") })
      );
      await screen.findByTestId("popover-base");
      rerender(renderProviders({ base: namedPopover("base", false) }));
      await waitFor(() =>
        expect(screen.queryByTestId("popover-base")).toBeNull()
      );
      rerender(renderProviders({ base: namedPopover("base") }));

      const wrapper = getPortalWrapper(
        await screen.findByTestId("popover-base")
      );
      expect(wrapper?.id).toEqual("nimbus-popover-floating");
      expect(wrapper?.parentElement).toBe(screen.getByTestId("provider-base"));
    });
  });
});
