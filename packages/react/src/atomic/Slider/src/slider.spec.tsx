import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { Slider } from "./Slider";
import type { SliderProps } from "./Slider";

const defaultProps: SliderProps = {
  min: 0,
  max: 100,
  minValue: 25,
  maxValue: 75,
  "data-testid": "slider",
};

const makeSut = (props: Partial<SliderProps> = {}) =>
  render(<Slider {...defaultProps} {...props} />);

describe("GIVEN <Slider />", () => {
  describe("WHEN rendered with default props", () => {
    it("THEN should render the slider container", () => {
      makeSut();
      expect(screen.getByTestId("slider")).toBeInTheDocument();
    });

    it("THEN should render the track element", () => {
      makeSut();
      expect(screen.getByTestId("slider-track")).toBeInTheDocument();
    });

    it("THEN should render both thumbs", () => {
      makeSut();
      expect(screen.getByTestId("slider-min-thumb")).toBeInTheDocument();
      expect(screen.getByTestId("slider-max-thumb")).toBeInTheDocument();
    });

    it("THEN should render min and max inputs when showInputs is true", () => {
      makeSut();
      expect(screen.getByTestId("slider-min-input")).toBeInTheDocument();
      expect(screen.getByTestId("slider-max-input")).toBeInTheDocument();
    });

    it("THEN should render range labels when showRangeLabels is true", () => {
      makeSut();
      expect(screen.getByTestId("slider-min-label")).toHaveTextContent("0");
      expect(screen.getByTestId("slider-max-label")).toHaveTextContent("100");
    });
  });

  describe("WHEN showInputs is false", () => {
    it("THEN should not render the inputs", () => {
      makeSut({ showInputs: false });
      expect(screen.queryByTestId("slider-min-input")).not.toBeInTheDocument();
      expect(screen.queryByTestId("slider-max-input")).not.toBeInTheDocument();
    });
  });

  describe("WHEN showRangeLabels is false", () => {
    it("THEN should not render the range labels", () => {
      makeSut({ showRangeLabels: false });
      expect(screen.queryByTestId("slider-min-label")).not.toBeInTheDocument();
      expect(screen.queryByTestId("slider-max-label")).not.toBeInTheDocument();
    });
  });

  describe("WHEN disabled is true", () => {
    it("THEN should disable the inputs", () => {
      makeSut({ disabled: true });
      const minInput = screen.getByTestId("slider-min-input");
      const maxInput = screen.getByTestId("slider-max-input");
      expect(minInput).toBeDisabled();
      expect(maxInput).toBeDisabled();
    });

    it("THEN should disable the thumbs", () => {
      makeSut({ disabled: true });
      expect(screen.getByTestId("slider-min-thumb")).toBeDisabled();
      expect(screen.getByTestId("slider-max-thumb")).toBeDisabled();
    });

    it("THEN should apply disabled styles to thumbs", () => {
      makeSut({ disabled: true });
      expect(screen.getByTestId("slider-min-thumb").className).toContain(
        "thumbDisabled"
      );
      expect(screen.getByTestId("slider-max-thumb").className).toContain(
        "thumbDisabled"
      );
    });
  });

  describe("WHEN using keyboard navigation", () => {
    it("THEN should increase min value with ArrowRight", async () => {
      const onChange = jest.fn();
      makeSut({ onChange, step: 10 });

      const minThumb = screen.getByTestId("slider-min-thumb");
      minThumb.focus();
      fireEvent.keyDown(minThumb, { key: "ArrowRight" });

      expect(onChange).toHaveBeenCalledWith(35, 75);
    });

    it("THEN should decrease min value with ArrowLeft", async () => {
      const onChange = jest.fn();
      makeSut({ onChange, step: 10 });

      const minThumb = screen.getByTestId("slider-min-thumb");
      minThumb.focus();
      fireEvent.keyDown(minThumb, { key: "ArrowLeft" });

      expect(onChange).toHaveBeenCalledWith(15, 75);
    });

    it("THEN should increase max value with ArrowRight", async () => {
      const onChange = jest.fn();
      makeSut({ onChange, step: 10 });

      const maxThumb = screen.getByTestId("slider-max-thumb");
      maxThumb.focus();
      fireEvent.keyDown(maxThumb, { key: "ArrowRight" });

      expect(onChange).toHaveBeenCalledWith(25, 85);
    });

    it("THEN should decrease max value with ArrowLeft", async () => {
      const onChange = jest.fn();
      makeSut({ onChange, step: 10 });

      const maxThumb = screen.getByTestId("slider-max-thumb");
      maxThumb.focus();
      fireEvent.keyDown(maxThumb, { key: "ArrowLeft" });

      expect(onChange).toHaveBeenCalledWith(25, 65);
    });

    it("THEN should set min to minimum with Home key", async () => {
      const onChange = jest.fn();
      makeSut({ onChange });

      const minThumb = screen.getByTestId("slider-min-thumb");
      minThumb.focus();
      fireEvent.keyDown(minThumb, { key: "Home" });

      expect(onChange).toHaveBeenCalledWith(0, 75);
    });

    it("THEN should set max to maximum with End key", async () => {
      const onChange = jest.fn();
      makeSut({ onChange });

      const maxThumb = screen.getByTestId("slider-max-thumb");
      maxThumb.focus();
      fireEvent.keyDown(maxThumb, { key: "End" });

      expect(onChange).toHaveBeenCalledWith(25, 100);
    });
  });

  describe("WHEN input containers are rendered", () => {
    it("THEN should render min input container", () => {
      makeSut();
      expect(screen.getByTestId("slider-min-input")).toBeInTheDocument();
    });

    it("THEN should render max input container", () => {
      makeSut();
      expect(screen.getByTestId("slider-max-input")).toBeInTheDocument();
    });
  });

  describe("WHEN using labelPrefix and labelSuffix", () => {
    it("THEN should render prefix before values", () => {
      makeSut({
        labelPrefix: "R$",
      });

      expect(screen.getByTestId("slider-min-label")).toHaveTextContent("R$0");
      expect(screen.getByTestId("slider-max-label")).toHaveTextContent("R$100");
    });

    it("THEN should render suffix after values", () => {
      makeSut({
        labelSuffix: "kg",
      });

      expect(screen.getByTestId("slider-min-label")).toHaveTextContent("0kg");
      expect(screen.getByTestId("slider-max-label")).toHaveTextContent("100kg");
    });

    it("THEN should render both prefix and suffix", () => {
      makeSut({
        labelPrefix: "$",
        labelSuffix: " USD",
      });

      expect(screen.getByTestId("slider-min-label")).toHaveTextContent(
        "$0 USD"
      );
      expect(screen.getByTestId("slider-max-label")).toHaveTextContent(
        "$100 USD"
      );
    });
  });

  describe("WHEN providing custom labels", () => {
    it("THEN should render minLabel and maxLabel", () => {
      makeSut({
        minLabel: "Min.",
        maxLabel: "Máx.",
      });

      expect(screen.getByText("Min.")).toBeInTheDocument();
      expect(screen.getByText("Máx.")).toBeInTheDocument();
    });
  });

  describe("WHEN providing custom separator", () => {
    it("THEN should render the custom separator", () => {
      makeSut({
        inputSeparator: "to",
      });

      expect(screen.getByText("to")).toBeInTheDocument();
    });
  });

  describe("WHEN checking accessibility", () => {
    it("THEN thumbs should have correct ARIA attributes", () => {
      makeSut();

      const minThumb = screen.getByTestId("slider-min-thumb");
      expect(minThumb).toHaveAttribute("role", "slider");
      expect(minThumb).toHaveAttribute("aria-valuemin", "0");
      expect(minThumb).toHaveAttribute("aria-valuemax", "74");
      expect(minThumb).toHaveAttribute("aria-valuenow", "25");

      const maxThumb = screen.getByTestId("slider-max-thumb");
      expect(maxThumb).toHaveAttribute("role", "slider");
      expect(maxThumb).toHaveAttribute("aria-valuemin", "26");
      expect(maxThumb).toHaveAttribute("aria-valuemax", "100");
      expect(maxThumb).toHaveAttribute("aria-valuenow", "75");
    });

    it("THEN thumbs should have custom aria-labels when provided", () => {
      makeSut({
        minLabel: "Minimum price",
        maxLabel: "Maximum price",
      });

      const minThumb = screen.getByTestId("slider-min-thumb");
      const maxThumb = screen.getByTestId("slider-max-thumb");

      expect(minThumb).toHaveAttribute("aria-label", "Minimum price");
      expect(maxThumb).toHaveAttribute("aria-label", "Maximum price");
    });
  });

  describe("WHEN testing appearance variants", () => {
    const appearances = [
      "primary",
      "success",
      "warning",
      "danger",
      "neutral",
    ] as const;

    appearances.forEach((appearance) => {
      it(`THEN should render ${appearance} appearance`, () => {
        makeSut({ appearance });
        const fill = screen.getByTestId("slider-fill");
        expect(fill.className).toContain(appearance);
      });
    });
  });

  describe("WHEN value constraints are tested", () => {
    it("THEN should not allow min value to exceed max value", () => {
      const onChange = jest.fn();
      makeSut({ onChange, minValue: 70, maxValue: 75, step: 10 });

      const minThumb = screen.getByTestId("slider-min-thumb");
      minThumb.focus();
      fireEvent.keyDown(minThumb, { key: "ArrowRight" });

      expect(onChange).toHaveBeenCalled();
      const [calledMin] = onChange.mock.calls[0];
      expect(calledMin).toBeLessThan(75);
    });

    it("THEN should not allow max value to go below min value", () => {
      const onChange = jest.fn();
      makeSut({ onChange, minValue: 70, maxValue: 75, step: 10 });

      const maxThumb = screen.getByTestId("slider-max-thumb");
      maxThumb.focus();
      fireEvent.keyDown(maxThumb, { key: "ArrowLeft" });

      expect(onChange).toHaveBeenCalled();
      const [, calledMax] = onChange.mock.calls[0];
      expect(calledMax).toBeGreaterThan(70);
    });
  });
});
