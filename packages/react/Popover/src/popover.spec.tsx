import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";

import { Popover } from "./Popover";
import { PopoverProps } from "./popover.types";

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
      makeSut({ content: <p>string</p> });
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
      makeSut({ content: <p>string</p>, position: "top" });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("popover-container"));
      });
      const popover = screen.getByTestId("popover-element");
      const arrow = screen.getByTestId("arrow-element");
      expect(popover).toBeDefined();

      expect(popover.style.top).toEqual("-8px");
      expect(popover.style.left).toEqual("0px");
      expect(popover.style.position).toEqual("fixed");

      expect(arrow.style.bottom).toEqual("0px");
      expect(arrow.style.left).toEqual("0px");
      expect(arrow.style.position).toEqual("absolute");
    });

    it('THEN should display popover in "bottom" position', async () => {
      makeSut({ content: <p>string</p>, position: "bottom" });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("popover-container"));
      });
      const popover = screen.getByTestId("popover-element");
      const arrow = screen.getByTestId("arrow-element");
      expect(popover).toBeDefined();

      expect(popover.style.top).toEqual("8px");
      expect(popover.style.left).toEqual("0px");
      expect(popover.style.position).toEqual("fixed");

      expect(arrow.style.top).toEqual("0px");
      expect(arrow.style.left).toEqual("0px");
      expect(arrow.style.position).toEqual("absolute");
    });

    it('THEN should display popover in "left" position', async () => {
      makeSut({ content: <p>string</p>, position: "left" });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("popover-container"));
      });
      const popover = screen.getByTestId("popover-element");
      const arrow = screen.getByTestId("arrow-element");
      expect(popover).toBeDefined();

      expect(popover.style.top).toEqual("0px");
      expect(popover.style.left).toEqual("-8px");
      expect(popover.style.position).toEqual("fixed");

      expect(arrow.style.top).toEqual("0px");
      expect(arrow.style.right).toEqual("0px");
      expect(arrow.style.position).toEqual("absolute");
    });

    it('THEN should display popover in "right" position', async () => {
      makeSut({ content: <p>string</p>, position: "right" });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("popover-container"));
      });
      const popover = screen.getByTestId("popover-element");
      const arrow = screen.getByTestId("arrow-element");
      expect(popover).toBeDefined();

      expect(popover.style.top).toEqual("0px");
      expect(popover.style.left).toEqual("8px");
      expect(popover.style.position).toEqual("fixed");

      expect(arrow.style.top).toEqual("0px");
      expect(arrow.style.left).toEqual("0px");
      expect(arrow.style.position).toEqual("absolute");
    });
  });

  describe("THEN should correctly render the submitted appearance", () => {
    it("THEN should correctly render the appearance default", async () => {
      makeSut({ content: <p>string</p> });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("popover-container"));
      });
      expect(
        screen.getByTestId("popover-element").getAttribute("class")
      ).toContain("light");
    });

    it("THEN should correctly render the appearance light", async () => {
      makeSut({ content: <p>string</p>, appearance: "light" });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("popover-container"));
      });
      expect(
        screen.getByTestId("popover-element").getAttribute("class")
      ).toContain("light");
    });

    it("THEN should correctly render the appearance primary", async () => {
      makeSut({ content: <p>string</p>, appearance: "primary" });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("popover-container"));
      });
      expect(
        screen.getByTestId("popover-element").getAttribute("class")
      ).toContain("primary");
    });

    it("THEN should correctly render the appearance danger", async () => {
      makeSut({ content: <p>string</p>, appearance: "danger" });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("popover-container"));
      });
      expect(
        screen.getByTestId("popover-element").getAttribute("class")
      ).toContain("danger");
    });

    it("THEN should correctly render the appearance neutral", async () => {
      makeSut({ content: <p>string</p>, appearance: "neutral" });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("popover-container"));
      });
      expect(
        screen.getByTestId("popover-element").getAttribute("class")
      ).toContain("neutral");
    });

    it("THEN should correctly render the appearance success", async () => {
      makeSut({ content: <p>string</p>, appearance: "success" });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("popover-container"));
      });
      expect(
        screen.getByTestId("popover-element").getAttribute("class")
      ).toContain("success");
    });

    it("THEN should correctly render the appearance warning", async () => {
      makeSut({ content: <p>string</p>, appearance: "warning" });
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
      makeSut({ content: <p>string</p>, padding: "base" });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("popover-container"));
      });
      expect(
        screen.getByTestId("popover-element").getAttribute("class")
      ).toContain("padding_base");
    });

    it("THEN should correctly render the padding none", async () => {
      makeSut({ content: <p>string</p>, padding: "none" });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("popover-container"));
      });
      expect(
        screen.getByTestId("popover-element").getAttribute("class")
      ).toContain("padding_none");
    });
  });
});
