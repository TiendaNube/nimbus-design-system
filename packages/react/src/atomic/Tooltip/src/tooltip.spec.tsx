import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { tooltip as tooltipStyles, ThemeProvider } from "@nimbus-ds/styles";

import { Tooltip } from "./Tooltip";
import { type TooltipProps } from "./tooltip.types";

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

const namedTooltip = (name: string) => (
  <Tooltip content={name} data-testid={`tooltip-${name}`}>
    <p data-testid={`anchor-${name}`}>{name}</p>
  </Tooltip>
);

const hoverTooltip = async (
  user: ReturnType<typeof userEvent.setup>,
  name: string
) => {
  const anchor = screen.getByTestId(`anchor-${name}`);
  await user.hover(anchor.parentElement as HTMLElement);
  return screen.findByTestId(`tooltip-${name}`);
};

const getPortalWrapper = (content: HTMLElement) =>
  content.closest("[data-floating-ui-portal]")?.parentElement ?? null;

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

  describe("WHEN rendered inside ThemeProviders", () => {
    beforeEach(() => {
      document.body.innerHTML = "";
    });

    it("THEN content mounts in its own provider after another provider's tooltip mounted first", async () => {
      const user = userEvent.setup();
      const { rerender } = render(renderProviders({}));
      rerender(renderProviders({ dark: namedTooltip("dark") }));
      await hoverTooltip(user, "dark");
      rerender(
        renderProviders({
          dark: namedTooltip("dark"),
          base: namedTooltip("base")
        })
      );

      const wrapper = getPortalWrapper(await hoverTooltip(user, "base"));
      expect(wrapper?.id).toEqual("nimbus-tooltip-floating");
      expect(wrapper?.parentElement).toBe(screen.getByTestId("provider-base"));
    });

    it("AND content mounts in its own provider when the providers are used in reverse order", async () => {
      const user = userEvent.setup();
      const { rerender } = render(renderProviders({}));
      rerender(renderProviders({ base: namedTooltip("base") }));
      await hoverTooltip(user, "base");
      rerender(
        renderProviders({
          base: namedTooltip("base"),
          dark: namedTooltip("dark")
        })
      );

      const wrapper = getPortalWrapper(await hoverTooltip(user, "dark"));
      expect(wrapper?.id).toEqual("nimbus-tooltip-floating");
      expect(wrapper?.parentElement).toBe(screen.getByTestId("provider-dark"));
    });

    it("AND content without a provider mounts in a body wrapper after a provider's tooltip mounted first", async () => {
      const user = userEvent.setup();
      render(renderProviders({ base: namedTooltip("base") }));
      await hoverTooltip(user, "base");
      render(namedTooltip("plain"));

      const wrapper = getPortalWrapper(await hoverTooltip(user, "plain"));
      expect(wrapper?.id).toEqual("nimbus-tooltip-floating");
      expect(wrapper?.parentElement).toBe(document.body);
    });

    it("AND content in a provider mounts in that provider after a tooltip without provider mounted first", async () => {
      const user = userEvent.setup();
      render(namedTooltip("plain"));
      await hoverTooltip(user, "plain");
      render(renderProviders({ base: namedTooltip("base") }));

      const wrapper = getPortalWrapper(await hoverTooltip(user, "base"));
      expect(wrapper?.id).toEqual("nimbus-tooltip-floating");
      expect(wrapper?.parentElement).toBe(screen.getByTestId("provider-base"));
    });

    it("AND a sibling tooltip keeps working after another tooltip of the same provider unmounts", async () => {
      const user = userEvent.setup();
      const { rerender } = render(
        renderProviders({
          base: (
            <>
              {namedTooltip("one")}
              {namedTooltip("two")}
            </>
          )
        })
      );
      await hoverTooltip(user, "one");
      rerender(renderProviders({ base: namedTooltip("two") }));

      const wrapper = getPortalWrapper(await hoverTooltip(user, "two"));
      expect(wrapper?.id).toEqual("nimbus-tooltip-floating");
      expect(wrapper?.parentElement).toBe(screen.getByTestId("provider-base"));
    });
  });
});
