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

    test.each(appearances)("THEN should render %s appearance", (appearance) => {
      makeSut({ appearance });
      const fill = screen.getByTestId("slider-fill");
      expect(fill.className).toContain(appearance);
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

  describe("WHEN individual callbacks are provided", () => {
    it("THEN should call onMinChange when min value changes via keyboard", () => {
      const onMinChange = jest.fn();
      makeSut({ onMinChange, step: 10 });

      const minThumb = screen.getByTestId("slider-min-thumb");
      minThumb.focus();
      fireEvent.keyDown(minThumb, { key: "ArrowRight" });

      expect(onMinChange).toHaveBeenCalledWith(35);
    });

    it("THEN should call onMaxChange when max value changes via keyboard", () => {
      const onMaxChange = jest.fn();
      makeSut({ onMaxChange, step: 10 });

      const maxThumb = screen.getByTestId("slider-max-thumb");
      maxThumb.focus();
      fireEvent.keyDown(maxThumb, { key: "ArrowRight" });

      expect(onMaxChange).toHaveBeenCalledWith(85);
    });

    it("THEN should call onChangeEnd when interaction ends via keyboard", () => {
      const onChangeEnd = jest.fn();
      makeSut({ onChangeEnd, step: 10 });

      const minThumb = screen.getByTestId("slider-min-thumb");
      minThumb.focus();
      fireEvent.keyDown(minThumb, { key: "ArrowRight" });

      expect(onChangeEnd).toHaveBeenCalledWith(35, 75);
    });
  });

  describe("WHEN using input fields", () => {
    it("THEN should update min value when min input changes", async () => {
      const onChange = jest.fn();
      makeSut({ onChange });

      const minInput = screen.getByTestId("slider-min-input");
      fireEvent.change(minInput, { target: { value: "30" } });

      expect(onChange).toHaveBeenCalledWith(30, 75);
    });

    it("THEN should update max value when max input changes", async () => {
      const onChange = jest.fn();
      makeSut({ onChange });

      const maxInput = screen.getByTestId("slider-max-input");
      fireEvent.change(maxInput, { target: { value: "80" } });

      expect(onChange).toHaveBeenCalledWith(25, 80);
    });

    it("THEN should clamp min input value to not exceed max", async () => {
      const onChange = jest.fn();
      makeSut({ onChange, step: 1 });

      const minInput = screen.getByTestId("slider-min-input");
      fireEvent.change(minInput, { target: { value: "80" } });

      expect(onChange).toHaveBeenCalled();
      const [calledMin] = onChange.mock.calls[0];
      expect(calledMin).toBeLessThan(75);
    });

    it("THEN should clamp max input value to not go below min", async () => {
      const onChange = jest.fn();
      makeSut({ onChange, step: 1 });

      const maxInput = screen.getByTestId("slider-max-input");
      fireEvent.change(maxInput, { target: { value: "10" } });

      expect(onChange).toHaveBeenCalled();
      const [, calledMax] = onChange.mock.calls[0];
      expect(calledMax).toBeGreaterThan(25);
    });

    it("THEN should clamp empty input to minimum value", async () => {
      const onChange = jest.fn();
      makeSut({ onChange, min: 0 });

      const minInput = screen.getByTestId("slider-min-input");
      fireEvent.change(minInput, { target: { value: "" } });

      expect(onChange).toHaveBeenCalledWith(0, 75);
    });
  });

  describe("WHEN using additional keyboard navigation", () => {
    it("THEN should increase min value with ArrowUp", () => {
      const onChange = jest.fn();
      makeSut({ onChange, step: 10 });

      const minThumb = screen.getByTestId("slider-min-thumb");
      minThumb.focus();
      fireEvent.keyDown(minThumb, { key: "ArrowUp" });

      expect(onChange).toHaveBeenCalledWith(35, 75);
    });

    it("THEN should decrease max value with ArrowDown", () => {
      const onChange = jest.fn();
      makeSut({ onChange, step: 10 });

      const maxThumb = screen.getByTestId("slider-max-thumb");
      maxThumb.focus();
      fireEvent.keyDown(maxThumb, { key: "ArrowDown" });

      expect(onChange).toHaveBeenCalledWith(25, 65);
    });

    it("THEN should set max to minimum + step with Home key on max thumb", () => {
      const onChange = jest.fn();
      makeSut({ onChange, step: 1 });

      const maxThumb = screen.getByTestId("slider-max-thumb");
      maxThumb.focus();
      fireEvent.keyDown(maxThumb, { key: "Home" });

      expect(onChange).toHaveBeenCalledWith(25, 26);
    });

    it("THEN should set min to maximum - step with End key on min thumb", () => {
      const onChange = jest.fn();
      makeSut({ onChange, step: 1 });

      const minThumb = screen.getByTestId("slider-min-thumb");
      minThumb.focus();
      fireEvent.keyDown(minThumb, { key: "End" });

      expect(onChange).toHaveBeenCalledWith(74, 75);
    });

    it("THEN should not respond to unsupported keys", () => {
      const onChange = jest.fn();
      makeSut({ onChange });

      const minThumb = screen.getByTestId("slider-min-thumb");
      minThumb.focus();
      fireEvent.keyDown(minThumb, { key: "Enter" });

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("WHEN disabled and interacting", () => {
    it("THEN should not respond to keyboard navigation when disabled", () => {
      const onChange = jest.fn();
      makeSut({ onChange, disabled: true });

      const minThumb = screen.getByTestId("slider-min-thumb");
      minThumb.focus();
      fireEvent.keyDown(minThumb, { key: "ArrowRight" });

      expect(onChange).not.toHaveBeenCalled();
    });

    it("THEN should not respond to track click when disabled", () => {
      const onChange = jest.fn();
      makeSut({ onChange, disabled: true });

      const track = screen.getByTestId("slider-track");
      fireEvent.mouseDown(track, { clientX: 50 });

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("WHEN clicking on track", () => {
    const mockRect = {
      left: 0,
      right: 100,
      width: 100,
      top: 0,
      bottom: 10,
      height: 10,
      x: 0,
      y: 0,
      toJSON: jest.fn(),
    };

    beforeEach(() => {
      Element.prototype.getBoundingClientRect = jest.fn(() => mockRect);
    });

    it("THEN should move min thumb when clicking closer to min value", () => {
      const onChange = jest.fn();
      makeSut({ onChange, minValue: 20, maxValue: 80 });

      const track = screen.getByTestId("slider-track");
      const trackContainer = track.parentElement;
      expect(trackContainer).toBeInTheDocument();
      fireEvent.mouseDown(trackContainer!, { clientX: 10 });
      expect(onChange).toHaveBeenCalled();

      expect(onChange).toHaveBeenCalled();
    });

    it("THEN should move max thumb when clicking closer to max value", () => {
      const onChange = jest.fn();
      makeSut({ onChange, minValue: 20, maxValue: 80 });

      const track = screen.getByTestId("slider-track");
      const trackContainer = track.parentElement;

      if (trackContainer) {
        fireEvent.mouseDown(trackContainer, { clientX: 90 });
      }

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe("WHEN dragging thumbs", () => {
    const mockRect = {
      left: 0,
      right: 100,
      width: 100,
      top: 0,
      bottom: 10,
      height: 10,
      x: 0,
      y: 0,
      toJSON: jest.fn(),
    };

    beforeEach(() => {
      Element.prototype.getBoundingClientRect = jest.fn(() => mockRect);
    });

    it("THEN should update min value during drag", () => {
      const onChange = jest.fn();
      const onChangeEnd = jest.fn();
      makeSut({ onChange, onChangeEnd });

      const minThumb = screen.getByTestId("slider-min-thumb");

      fireEvent.mouseDown(minThumb);
      fireEvent.mouseMove(document, { clientX: 30 });
      fireEvent.mouseUp(document);

      expect(onChange).toHaveBeenCalled();
      expect(onChangeEnd).toHaveBeenCalled();
    });

    it("THEN should update max value during drag", () => {
      const onChange = jest.fn();
      const onChangeEnd = jest.fn();
      makeSut({ onChange, onChangeEnd });

      const maxThumb = screen.getByTestId("slider-max-thumb");

      fireEvent.mouseDown(maxThumb);
      fireEvent.mouseMove(document, { clientX: 80 });
      fireEvent.mouseUp(document);

      expect(onChange).toHaveBeenCalled();
      expect(onChangeEnd).toHaveBeenCalled();
    });

    it("THEN should handle touch events for min thumb", () => {
      const onChange = jest.fn();
      makeSut({ onChange });

      const minThumb = screen.getByTestId("slider-min-thumb");

      fireEvent.touchStart(minThumb);
      fireEvent.touchMove(document, { touches: [{ clientX: 30 }] });
      fireEvent.touchEnd(document);

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe("WHEN custom className and style are provided", () => {
    it("THEN should apply custom className", () => {
      makeSut({ className: "custom-class" });

      const container = screen.getByTestId("slider");
      expect(container.className).toContain("custom-class");
    });

    it("THEN should apply custom style", () => {
      makeSut({ style: { marginTop: "20px" } });

      const container = screen.getByTestId("slider");
      expect(container).toHaveStyle({ marginTop: "20px" });
    });
  });

  describe("WHEN values update externally (controlled component)", () => {
    it("THEN should sync local state when minValue prop changes", () => {
      const { rerender } = render(
        <Slider {...defaultProps} minValue={25} maxValue={75} />
      );

      rerender(<Slider {...defaultProps} minValue={40} maxValue={75} />);

      const minThumb = screen.getByTestId("slider-min-thumb");
      expect(minThumb).toHaveAttribute("aria-valuenow", "40");
    });

    it("THEN should sync local state when maxValue prop changes", () => {
      const { rerender } = render(
        <Slider {...defaultProps} minValue={25} maxValue={75} />
      );

      rerender(<Slider {...defaultProps} minValue={25} maxValue={90} />);

      const maxThumb = screen.getByTestId("slider-max-thumb");
      expect(maxThumb).toHaveAttribute("aria-valuenow", "90");
    });
  });

  describe("WHEN step is configured", () => {
    it("THEN should increment by step value", () => {
      const onChange = jest.fn();
      makeSut({ onChange, step: 5 });

      const minThumb = screen.getByTestId("slider-min-thumb");
      minThumb.focus();
      fireEvent.keyDown(minThumb, { key: "ArrowRight" });

      expect(onChange).toHaveBeenCalledWith(30, 75);
    });

    it("THEN should decrement by step value", () => {
      const onChange = jest.fn();
      makeSut({ onChange, step: 5 });

      const maxThumb = screen.getByTestId("slider-max-thumb");
      maxThumb.focus();
      fireEvent.keyDown(maxThumb, { key: "ArrowLeft" });

      expect(onChange).toHaveBeenCalledWith(25, 70);
    });
  });

  describe("WHEN ref is provided", () => {
    it("THEN should forward ref to container element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Slider {...defaultProps} ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute("data-testid", "slider");
    });
  });

  describe("WHEN no data-testid is provided", () => {
    it("THEN should not render data-testid attributes on subcomponents", () => {
      render(<Slider min={0} max={100} minValue={25} maxValue={75} />);

      expect(screen.queryByTestId("slider-min-thumb")).not.toBeInTheDocument();
      expect(screen.queryByTestId("slider-max-thumb")).not.toBeInTheDocument();
    });
  });

  describe("WHEN inputs have aria-labels", () => {
    it("THEN should use default aria-labels when no custom labels provided", () => {
      makeSut();

      const minInput = screen.getByTestId("slider-min-input");
      const maxInput = screen.getByTestId("slider-max-input");

      expect(minInput).toHaveAttribute("aria-label", "Minimum value");
      expect(maxInput).toHaveAttribute("aria-label", "Maximum value");
    });

    it("THEN should use custom labels as aria-labels when provided", () => {
      makeSut({ minLabel: "Preço mínimo", maxLabel: "Preço máximo" });

      const minInput = screen.getByTestId("slider-min-input");
      const maxInput = screen.getByTestId("slider-max-input");

      expect(minInput).toHaveAttribute("aria-label", "Preço mínimo");
      expect(maxInput).toHaveAttribute("aria-label", "Preço máximo");
    });
  });
});
