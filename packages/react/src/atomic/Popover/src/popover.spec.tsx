import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";

import { Popover } from "./Popover";
import { PopoverProps } from "./popover.types";

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
      makeSut({ content: <p>string</p>, enabledHover: true });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("popover-container"));
      });
      const popover = screen.getByTestId("popover-element");
      expect(popover).toBeDefined();
    });

    it("THEN should not render popover arrow", async () => {
      makeSut({ content: <p>string</p>, arrow: false });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("popover-container"));
      });
      expect(screen.queryByTestId("arrow-element")).toBeNull();
    });

    it('THEN should display popover in "top" position', async () => {
      makeSut({ content: <p>string</p>, position: "top", enabledHover: true });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("popover-container"));
      });
      const popover = screen.getByTestId("popover-element");
      const arrow = screen.getByTestId("arrow-element");
      expect(popover).toBeDefined();

      expect(popover.style.top).toEqual("-10px");
      expect(popover.style.left).toEqual("-5px");
      expect(popover.style.position).toEqual("fixed");

      expect(arrow.style.bottom).toEqual("0px");
      expect(arrow.style.left).toEqual("5px");
      expect(arrow.style.position).toEqual("absolute");
    });

    it('THEN should display popover in "bottom" position', async () => {
      makeSut({
        content: <p>string</p>,
        position: "bottom",
        enabledHover: true,
      });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("popover-container"));
      });
      const popover = screen.getByTestId("popover-element");
      const arrow = screen.getByTestId("arrow-element");
      expect(popover).toBeDefined();

      expect(popover.style.top).toEqual("10px");
      expect(popover.style.left).toEqual("-5px");
      expect(popover.style.position).toEqual("fixed");

      expect(arrow.style.top).toEqual("0px");
      expect(arrow.style.left).toEqual("5px");
      expect(arrow.style.position).toEqual("absolute");
    });

    it('THEN should display popover in "left" position', async () => {
      makeSut({ content: <p>string</p>, position: "left", enabledHover: true });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("popover-container"));
      });
      const popover = screen.getByTestId("popover-element");
      const arrow = screen.getByTestId("arrow-element");
      expect(popover).toBeDefined();

      expect(popover.style.top).toEqual("-5px");
      expect(popover.style.left).toEqual("-10px");
      expect(popover.style.position).toEqual("fixed");

      expect(arrow.style.top).toEqual("5px");
      expect(arrow.style.right).toEqual("0px");
      expect(arrow.style.position).toEqual("absolute");
    });

    it('THEN should display popover in "right" position', async () => {
      makeSut({
        content: <p>string</p>,
        position: "right",
        enabledHover: true,
      });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("popover-container"));
      });
      const popover = screen.getByTestId("popover-element");
      const arrow = screen.getByTestId("arrow-element");
      expect(popover).toBeDefined();

      expect(popover.style.top).toEqual("-5px");
      expect(popover.style.left).toEqual("10px");
      expect(popover.style.position).toEqual("fixed");

      expect(arrow.style.top).toEqual("5px");
      expect(arrow.style.left).toEqual("0px");
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

  describe("THEN should correctly render the submitted appearance", () => {
    it("THEN should correctly render the appearance default", async () => {
      makeSut({ content: <p>string</p>, enabledHover: true });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("popover-container"));
      });
      expect(
        screen.getByTestId("popover-element").getAttribute("class")
      ).toContain("light");
    });

    it("THEN should correctly render the appearance light", async () => {
      makeSut({
        content: <p>string</p>,
        appearance: "light",
        enabledHover: true,
      });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("popover-container"));
      });
      expect(
        screen.getByTestId("popover-element").getAttribute("class")
      ).toContain("light");
    });

    it("THEN should correctly render the appearance primary", async () => {
      makeSut({
        content: <p>string</p>,
        appearance: "primary",
        enabledHover: true,
      });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("popover-container"));
      });
      expect(
        screen.getByTestId("popover-element").getAttribute("class")
      ).toContain("primary");
    });

    it("THEN should correctly render the appearance danger", async () => {
      makeSut({
        content: <p>string</p>,
        appearance: "danger",
        enabledHover: true,
      });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("popover-container"));
      });
      expect(
        screen.getByTestId("popover-element").getAttribute("class")
      ).toContain("danger");
    });

    it("THEN should correctly render the appearance neutral", async () => {
      makeSut({
        content: <p>string</p>,
        appearance: "neutral",
        enabledHover: true,
      });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("popover-container"));
      });
      expect(
        screen.getByTestId("popover-element").getAttribute("class")
      ).toContain("neutral");
    });

    it("THEN should correctly render the appearance success", async () => {
      makeSut({
        content: <p>string</p>,
        appearance: "success",
        enabledHover: true,
      });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("popover-container"));
      });
      expect(
        screen.getByTestId("popover-element").getAttribute("class")
      ).toContain("success");
    });

    it("THEN should correctly render the appearance warning", async () => {
      makeSut({
        content: <p>string</p>,
        appearance: "warning",
        enabledHover: true,
      });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("popover-container"));
      });
      expect(
        screen.getByTestId("popover-element").getAttribute("class")
      ).toContain("warning");
    });
  });

  describe("THEN should correctly render the submitted padding", () => {
    it("THEN should correctly render the padding base", async () => {
      makeSut({ content: <p>string</p>, padding: "base", enabledHover: true });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("popover-container"));
      });
      expect(
        screen.getByTestId("popover-element").getAttribute("class")
      ).toContain("padding_base");
    });

    it("THEN should correctly render the padding none", async () => {
      makeSut({ content: <p>string</p>, padding: "none", enabledHover: true });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("popover-container"));
      });
      expect(
        screen.getByTestId("popover-element").getAttribute("class")
      ).toContain("padding_none");
    });
  });
});
