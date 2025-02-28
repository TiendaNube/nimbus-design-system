import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { tooltip as tooltipStyles } from "@nimbus-ds/styles";

import { Tooltip } from "./Tooltip";
import { TooltipProps } from "./tooltip.types";

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
      makeSut({ content: "string" });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("tooltip-container"));
      });
      const tooltip = screen.getByTestId("tooltip-element");
      expect(tooltip).toBeDefined();
    });

    it('THEN should display tooltip in "top" position', async () => {
      makeSut({ content: "string", position: "top", arrow: true });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("tooltip-container"));
      });
      const tooltip = screen.getByTestId("tooltip-element");
      const arrow = screen.getByTestId("arrow-element");
      expect(tooltip).toBeDefined();

      expect(tooltip.style.top).toEqual("0px");
      expect(tooltip.style.left).toEqual("0px");
      expect(tooltip.style.position).toEqual("fixed");

      expect(arrow.style.top).toEqual("100%");
      expect(arrow.style.position).toEqual("absolute");
    });

    it('THEN should display tooltip in "bottom" position', async () => {
      makeSut({ content: "string", position: "bottom", arrow: true });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("tooltip-container"));
      });

      const tooltip = screen.getByTestId("tooltip-element");
      const arrow = screen.getByTestId("arrow-element");
      expect(tooltip).toBeDefined();

      expect(tooltip.style.top).toEqual("0px");
      expect(tooltip.style.left).toEqual("0px");
      expect(tooltip.style.position).toEqual("fixed");

      expect(arrow.style.bottom).toEqual("100%");
      expect(arrow.style.transform).toBe("rotate(180deg)");
      expect(arrow.style.position).toEqual("absolute");
    });

    it('THEN should display tooltip in "left" position', async () => {
      makeSut({ content: "string", position: "left", arrow: true });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("tooltip-container"));
      });

      const tooltip = screen.getByTestId("tooltip-element");
      const arrow = screen.getByTestId("arrow-element");
      expect(tooltip).toBeDefined();

      expect(tooltip.style.top).toEqual("0px");
      expect(tooltip.style.left).toEqual("0px");
      expect(tooltip.style.position).toEqual("fixed");

      expect(arrow.style.left).toEqual("calc(100% - 0px)");
      expect(arrow.style.transform).toBe("rotate(-90deg)");
      expect(arrow.style.position).toEqual("absolute");
    });

    it('THEN should display tooltip in "right" position', async () => {
      makeSut({ content: "string", position: "right", arrow: true });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("tooltip-container"));
      });
      const tooltip = screen.getByTestId("tooltip-element");
      const arrow = screen.getByTestId("arrow-element");
      expect(tooltip).toBeDefined();

      expect(tooltip.style.top).toEqual("0px");
      expect(tooltip.style.left).toEqual("0px");
      expect(tooltip.style.position).toEqual("fixed");

      expect(arrow.style.right).toEqual("calc(100% - 0px)");
      expect(arrow.style.transform).toBe("rotate(90deg)");
      expect(arrow.style.position).toEqual("absolute");
    });

    it('should not display arrow if "arrow" is not passed', async () => {
      makeSut({ content: "string" });

      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("tooltip-container"));
      });

      const tooltip = screen.getByTestId("tooltip-element");
      const arrow = screen.queryByTestId("arrow-element");

      expect(tooltip).toBeDefined();
      expect(arrow).toBeNull();
    });

    it("should call tooltip.sprinkle with the merged props", () => {
      const maxWidth = "400px";
      const rest = { customProp: "value" };

      // Set up a spy on tooltip.sprinkle.
      const sprinkleSpy = jest
        .spyOn(tooltipStyles, "sprinkle")
        .mockReturnValue({
          className: "mock-class",
          style: { maxWidth },
          otherProps: { "data-test": "value" },
        });

      // Render the component with both maxWidth and the rest props.
      makeSut({ content: "string", maxWidth, ...rest });

      //  Verify that tooltip.sprinkle was called with the expected merged object.
      expect(sprinkleSpy).toHaveBeenCalledWith({
        ...rest,
        maxWidth,
        "data-testid": "tooltip-element",
      });

      // Cleanup
      sprinkleSpy.mockRestore();
    });
  });
});
