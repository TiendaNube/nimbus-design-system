import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";

import { Slider } from "./Slider";
import type { SliderRangeBaseProps, SliderBaseProps } from "./Slider";

const defaultRangeProps: SliderRangeBaseProps = {
  min: 0,
  max: 100,
  minValue: 25,
  maxValue: 75,
  "data-testid": "slider",
};

const defaultSingleProps: SliderBaseProps = {
  min: 0,
  max: 100,
  value: 50,
  "data-testid": "slider",
};

const makeSut = (props: Partial<SliderRangeBaseProps> = {}) =>
  render(<Slider.Range {...defaultRangeProps} {...props} />);

const makeSingleSut = (props: Partial<SliderBaseProps> = {}) =>
  render(<Slider {...defaultSingleProps} {...props} />);

describe("GIVEN <Slider.Range />", () => {
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
  });

  describe("WHEN disabled is true", () => {
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

    it("THEN thumbs should have default aria-labels", () => {
      makeSut();

      const minThumb = screen.getByTestId("slider-min-thumb");
      const maxThumb = screen.getByTestId("slider-max-thumb");

      expect(minThumb).toHaveAttribute("aria-label", "Minimum value");
      expect(maxThumb).toHaveAttribute("aria-label", "Maximum value");
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
    });

    it("THEN should move max thumb when clicking closer to max value", () => {
      const onChange = jest.fn();
      makeSut({ onChange, minValue: 20, maxValue: 80 });

      const track = screen.getByTestId("slider-track");
      const trackContainer = track.parentElement;

      fireEvent.mouseDown(trackContainer!, { clientX: 90 });
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
      jest.useFakeTimers();
      const onChange = jest.fn();
      const onChangeEnd = jest.fn();
      makeSut({ onChange, onChangeEnd });

      const minThumb = screen.getByTestId("slider-min-thumb");

      fireEvent.mouseDown(minThumb);
      fireEvent.mouseMove(document, { clientX: 30 });
      act(() => {
        jest.runAllTimers();
      });
      fireEvent.mouseUp(document);

      expect(onChange).toHaveBeenCalled();
      expect(onChangeEnd).toHaveBeenCalled();
      jest.useRealTimers();
    });

    it("THEN should update max value during drag", () => {
      jest.useFakeTimers();
      const onChange = jest.fn();
      const onChangeEnd = jest.fn();
      makeSut({ onChange, onChangeEnd });

      const maxThumb = screen.getByTestId("slider-max-thumb");

      fireEvent.mouseDown(maxThumb);
      fireEvent.mouseMove(document, { clientX: 80 });
      act(() => {
        jest.runAllTimers();
      });
      fireEvent.mouseUp(document);

      expect(onChange).toHaveBeenCalled();
      expect(onChangeEnd).toHaveBeenCalled();
      jest.useRealTimers();
    });

    it("THEN should handle touch events for min thumb", () => {
      jest.useFakeTimers();
      const onChange = jest.fn();
      makeSut({ onChange });

      const minThumb = screen.getByTestId("slider-min-thumb");

      fireEvent.touchStart(minThumb);
      fireEvent.touchMove(document, { touches: [{ clientX: 30 }] });
      act(() => {
        jest.runAllTimers();
      });
      fireEvent.touchEnd(document);

      expect(onChange).toHaveBeenCalled();
      jest.useRealTimers();
    });
  });

  describe("WHEN values update externally (controlled component)", () => {
    it("THEN should sync local state when minValue prop changes", () => {
      const { rerender } = render(
        <Slider.Range {...defaultRangeProps} minValue={25} maxValue={75} />
      );

      rerender(
        <Slider.Range {...defaultRangeProps} minValue={40} maxValue={75} />
      );

      const minThumb = screen.getByTestId("slider-min-thumb");
      expect(minThumb).toHaveAttribute("aria-valuenow", "40");
    });

    it("THEN should sync local state when maxValue prop changes", () => {
      const { rerender } = render(
        <Slider.Range {...defaultRangeProps} minValue={25} maxValue={75} />
      );

      rerender(
        <Slider.Range {...defaultRangeProps} minValue={25} maxValue={90} />
      );

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
      render(<Slider.Range {...defaultRangeProps} ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute("data-testid", "slider");
    });
  });

  describe("WHEN no data-testid is provided", () => {
    it("THEN should not render data-testid attributes on subcomponents", () => {
      render(<Slider.Range min={0} max={100} minValue={25} maxValue={75} />);

      expect(screen.queryByTestId("slider-min-thumb")).not.toBeInTheDocument();
      expect(screen.queryByTestId("slider-max-thumb")).not.toBeInTheDocument();
    });
  });
});

describe("GIVEN <Slider /> in single value mode", () => {
  describe("WHEN rendered with value prop", () => {
    it("THEN should render the slider container", () => {
      makeSingleSut();
      expect(screen.getByTestId("slider")).toBeInTheDocument();
    });

    it("THEN should render only one thumb", () => {
      makeSingleSut();
      expect(screen.getByTestId("slider-thumb")).toBeInTheDocument();
      expect(screen.queryByTestId("slider-min-thumb")).not.toBeInTheDocument();
      expect(screen.queryByTestId("slider-max-thumb")).not.toBeInTheDocument();
    });
  });

  describe("WHEN disabled", () => {
    it("THEN should disable the thumb", () => {
      makeSingleSut({ disabled: true });
      expect(screen.getByTestId("slider-thumb")).toBeDisabled();
    });
  });

  describe("WHEN using keyboard navigation", () => {
    it("THEN should increase value with ArrowRight", () => {
      const onChange = jest.fn();
      makeSingleSut({ onChange, step: 5 });

      const thumb = screen.getByTestId("slider-thumb");
      fireEvent.keyDown(thumb, { key: "ArrowRight" });

      expect(onChange).toHaveBeenCalledWith(55);
    });

    it("THEN should decrease value with ArrowLeft", () => {
      const onChange = jest.fn();
      makeSingleSut({ onChange, step: 5 });

      const thumb = screen.getByTestId("slider-thumb");
      fireEvent.keyDown(thumb, { key: "ArrowLeft" });

      expect(onChange).toHaveBeenCalledWith(45);
    });

    it("THEN should set value to min with Home key", () => {
      const onChange = jest.fn();
      makeSingleSut({ onChange });

      const thumb = screen.getByTestId("slider-thumb");
      fireEvent.keyDown(thumb, { key: "Home" });

      expect(onChange).toHaveBeenCalledWith(0);
    });

    it("THEN should set value to max with End key", () => {
      const onChange = jest.fn();
      makeSingleSut({ onChange });

      const thumb = screen.getByTestId("slider-thumb");
      fireEvent.keyDown(thumb, { key: "End" });

      expect(onChange).toHaveBeenCalledWith(100);
    });

    it("THEN should not respond to keyboard when disabled", () => {
      const onChange = jest.fn();
      makeSingleSut({ onChange, disabled: true });

      const thumb = screen.getByTestId("slider-thumb");
      fireEvent.keyDown(thumb, { key: "ArrowRight" });

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("WHEN dragging thumb", () => {
    const mockRect = {
      left: 0,
      width: 100,
      top: 0,
      height: 10,
      right: 100,
      bottom: 10,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    };

    beforeEach(() => {
      Element.prototype.getBoundingClientRect = jest.fn(() => mockRect);
    });

    it("THEN should update value during drag", () => {
      jest.useFakeTimers();
      const onChange = jest.fn();
      const onChangeEnd = jest.fn();
      makeSingleSut({ onChange, onChangeEnd });

      const thumb = screen.getByTestId("slider-thumb");

      fireEvent.mouseDown(thumb);
      fireEvent.mouseMove(document, { clientX: 75 });
      act(() => {
        jest.runAllTimers();
      });
      fireEvent.mouseUp(document);

      expect(onChange).toHaveBeenCalled();
      expect(onChangeEnd).toHaveBeenCalled();
      jest.useRealTimers();
    });
  });

  describe("WHEN ref is provided", () => {
    it("THEN should forward ref to container element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Slider {...defaultSingleProps} ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("WHEN checking accessibility", () => {
    it("THEN thumb should have correct ARIA attributes", () => {
      makeSingleSut();

      const thumb = screen.getByTestId("slider-thumb");
      expect(thumb).toHaveAttribute("role", "slider");
      expect(thumb).toHaveAttribute("aria-valuemin", "0");
      expect(thumb).toHaveAttribute("aria-valuemax", "100");
      expect(thumb).toHaveAttribute("aria-valuenow", "50");
      expect(thumb).toHaveAttribute("aria-label", "Value");
    });
  });
});
