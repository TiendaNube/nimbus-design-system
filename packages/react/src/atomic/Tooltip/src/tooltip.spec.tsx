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

  describe("WHEN another tooltip was first mounted inside a ThemeProvider", () => {
    // Portal nodes outlive each test's container; a leftover one on body would hide the bug.
    beforeEach(() => {
      document
        .querySelectorAll("#nimbus-tooltip-floating")
        .forEach((node) => node.remove());
    });

    it("THEN it still renders outside that provider's node", async () => {
      const user = userEvent.setup();
      const makeTree = (withSecondTooltip: boolean) => (
        <>
          <ThemeProvider theme="next" data-testid="theme-provider">
            <Tooltip content="themed">
              <p>themed anchor</p>
            </Tooltip>
          </ThemeProvider>
          {withSecondTooltip && (
            <Tooltip content="string" data-testid="tooltip-element">
              <p data-testid="anchor-element">hover</p>
            </Tooltip>
          )}
        </>
      );
      const { rerender } = render(makeTree(false));
      rerender(makeTree(true));
      await user.hover(screen.getByTestId("anchor-element"));
      await waitFor(() => {
        expect(screen.getByTestId("tooltip-element")).toBeDefined();
      });

      expect(
        screen
          .getByTestId("theme-provider")
          .contains(screen.getByTestId("tooltip-element"))
      ).toBe(false);
    });
  });

  describe("WHEN rendered inside a ThemeProvider", () => {
    it("THEN the floating element carries the theme class", async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider theme="next" data-testid="theme-provider">
          <Tooltip content="string" data-testid="tooltip-element">
            <p data-testid="anchor-element">hover</p>
          </Tooltip>
        </ThemeProvider>
      );
      await user.hover(screen.getByTestId("anchor-element"));
      await waitFor(() => {
        expect(screen.getByTestId("tooltip-element")).toBeDefined();
      });

      const themeClassName = screen.getByTestId("theme-provider").className;
      expect(themeClassName).not.toEqual("");
      expect(screen.getByTestId("tooltip-element").className).toContain(
        themeClassName
      );
    });
  });
});
