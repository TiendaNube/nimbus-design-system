import React, { forwardRef, useCallback, useRef } from "react";
import type { ComponentPropsWithRef, KeyboardEvent } from "react";
import { slider } from "@nimbus-ds/styles";

import type { SliderBaseProps } from "./slider.types";
import { useSingleSliderDrag } from "./hooks";
import { SliderThumb, SliderTrack, SliderLabels } from "./components";
import {
  SLIDER_DEFAULTS,
  calculatePercentage,
  clampSingleValue,
} from "./slider.definitions";
import { SliderRange } from "./SliderRange";

/**
 * Slider component for selecting a single value within a range.
 *
 * @component
 * @example
 * <Slider
 *   min={0}
 *   max={100}
 *   value={50}
 *   onChange={(value) => console.log(value)}
 * />
 *
 * @example
 * // For range selection (two thumbs), use Slider.Range
 * <Slider.Range
 *   min={0}
 *   max={100}
 *   minValue={25}
 *   maxValue={75}
 *   onChange={(min, max) => console.log(min, max)}
 * />
 */
const SliderBase = forwardRef<HTMLDivElement, SliderBaseProps>(
  (
    {
      min = SLIDER_DEFAULTS.min,
      max = SLIDER_DEFAULTS.max,
      value,
      step = SLIDER_DEFAULTS.step,
      appearance = SLIDER_DEFAULTS.appearance,
      disabled = SLIDER_DEFAULTS.disabled,
      showLabels = false,
      minLabel,
      maxLabel,
      onChange,
      onChangeEnd,
      ariaLabel,
      "data-testid": dataTestId,
    },
    ref
  ) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const valueRef = useRef(value);
    valueRef.current = value;

    const clampValue = useCallback(
      (val: number): number => clampSingleValue(val, min, max),
      [min, max]
    );

    const { dragValue, handleTrackMouseDown, handleThumbMouseDown } =
      useSingleSliderDrag({
        trackRef,
        min,
        max,
        step,
        disabled,
        value,
        clampValue,
        onChange,
        onChangeEnd,
      });

    const displayValue = dragValue ?? value;

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return;

        let newValue: number;
        const currentValue = valueRef.current;

        switch (e.key) {
          case "ArrowLeft":
          case "ArrowDown":
            newValue = clampSingleValue(currentValue - step, min, max);
            break;
          case "ArrowRight":
          case "ArrowUp":
            newValue = clampSingleValue(currentValue + step, min, max);
            break;
          case "Home":
            newValue = min;
            break;
          case "End":
            newValue = max;
            break;
          default:
            return;
        }

        e.preventDefault();
        onChange?.(newValue);
        onChangeEnd?.(newValue);
      },
      [disabled, step, min, max, onChange, onChangeEnd]
    );

    const percentage = calculatePercentage(displayValue, min, max);

    return (
      <div
        ref={ref}
        className={slider.classnames.container}
        data-testid={dataTestId}
      >
        <div
          className={slider.classnames.trackContainer}
          onMouseDown={handleTrackMouseDown}
          role="none"
        >
          <SliderTrack
            ref={trackRef}
            appearance={appearance}
            maxPercentage={percentage}
            disabled={disabled}
            dataTestId={dataTestId}
          >
            <SliderThumb
              type="single"
              percentage={percentage}
              value={displayValue}
              minAriaValue={min}
              maxAriaValue={max}
              disabled={disabled}
              ariaLabel={ariaLabel}
              dataTestId={dataTestId ? `${dataTestId}-thumb` : undefined}
              onMouseDown={handleThumbMouseDown}
              onKeyDown={handleKeyDown}
            />
          </SliderTrack>
        </div>
        {showLabels && (
          <SliderLabels
            min={min}
            max={max}
            minLabel={minLabel}
            maxLabel={maxLabel}
            dataTestId={dataTestId}
          />
        )}
      </div>
    );
  }
);

SliderBase.displayName = "Slider";

/**
 * Slider component with Range subcomponent.
 *
 * @example
 * // Single value slider
 * <Slider value={50} onChange={(value) => console.log(value)} />
 *
 * @example
 * // Range slider
 * <Slider.Range minValue={25} maxValue={75} onChange={(min, max) => console.log(min, max)} />
 */
export const Slider = Object.assign(SliderBase, {
  Range: SliderRange,
});

Slider.Range.displayName = "Slider.Range";

export type SliderProps = ComponentPropsWithRef<typeof SliderBase>;
export type { SliderRangeProps } from "./SliderRange";
export type { SliderBaseProps, SliderRangeBaseProps } from "./slider.types";
export { SLIDER_DEFAULTS } from "./slider.definitions";
