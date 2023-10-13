import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";

import { Tooltip } from "./Tooltip";
import { TooltipProps } from "./tooltip.types";

const makeSut = (rest: Omit<TooltipProps, "children">) => {
  render(
    <Tooltip {...rest} data-testid="tooltip-element" arrow>
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
      makeSut({ content: "string", position: "top" });
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
      makeSut({ content: "string", position: "bottom" });
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
      makeSut({ content: "string", position: "left" });
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
      makeSut({ content: "string", position: "right" });
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
  });
});
