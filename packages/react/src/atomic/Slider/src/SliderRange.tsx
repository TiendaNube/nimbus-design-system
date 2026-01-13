import React, { forwardRef, useCallback, useRef } from "react";
import type { ComponentPropsWithRef, KeyboardEvent } from "react";
import { slider } from "@nimbus-ds/styles";

import type { SliderRangeBaseProps } from "./slider.types";
import { useSliderValues, useSliderDrag } from "./hooks";
import { SliderThumb, SliderTrack } from "./components";
import { SLIDER_DEFAULTS, calculatePercentage } from "./slider.definitions";

/**
 * Range slider component for selecting a range of values (two thumbs).
 * Use as `<Slider.Range />`.
 *
 * @component
 * @example
 * <Slider.Range
 *   min={0}
 *   max={100}
 *   minValue={25}
 *   maxValue={75}
 *   onChange={(min, max) => console.log(min, max)}
 * />
 */
export const SliderRange = forwardRef<HTMLDivElement, SliderRangeBaseProps>(
  (
    {
      min = SLIDER_DEFAULTS.min,
      max = SLIDER_DEFAULTS.max,
      minValue,
      maxValue,
      step = SLIDER_DEFAULTS.step,
      appearance = SLIDER_DEFAULTS.appearance,
      disabled = SLIDER_DEFAULTS.disabled,
      onChange,
      onMinChange,
      onMaxChange,
      onChangeEnd,
      minAriaLabel,
      maxAriaLabel,
      "data-testid": dataTestId,
    },
    ref
  ) => {
    const trackRef = useRef<HTMLDivElement>(null);

    const { localMinValue, localMaxValue, clampValue, updateValues } =
      useSliderValues({
        minValue,
        maxValue,
        min,
        max,
        step,
        onChange,
        onMinChange,
        onMaxChange,
        onChangeEnd,
      });

    const {
      dragMinValue,
      dragMaxValue,
      handleTrackMouseDown,
      handleMinMouseDown,
      handleMaxMouseDown,
    } = useSliderDrag({
      trackRef,
      min,
      max,
      step,
      disabled,
      localMinValue,
      localMaxValue,
      clampValue,
      updateValues,
    });

    const displayMinValue = dragMinValue ?? localMinValue;
    const displayMaxValue = dragMaxValue ?? localMaxValue;

    const minValueRef = useRef(localMinValue);
    const maxValueRef = useRef(localMaxValue);

    minValueRef.current = localMinValue;
    maxValueRef.current = localMaxValue;

    const handleThumbKeyDown = useCallback(
      (type: "min" | "max", e: KeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return;

        let newValue: number;
        const currentValue =
          type === "min" ? minValueRef.current : maxValueRef.current;
        const currentMinValue = minValueRef.current;
        const currentMaxValue = maxValueRef.current;

        switch (e.key) {
          case "ArrowLeft":
          case "ArrowDown":
            newValue = clampValue(currentValue - step, type === "min");
            break;
          case "ArrowRight":
          case "ArrowUp":
            newValue = clampValue(currentValue + step, type === "min");
            break;
          case "Home":
            newValue = type === "min" ? min : currentMinValue + step;
            break;
          case "End":
            newValue = type === "max" ? max : currentMaxValue - step;
            break;
          default:
            return;
        }

        e.preventDefault();
        if (type === "min") {
          updateValues(newValue, currentMaxValue, true);
        } else {
          updateValues(currentMinValue, newValue, true);
        }
      },
      [disabled, step, min, max, clampValue, updateValues]
    );

    const handleMinKeyDown = useCallback(
      (e: KeyboardEvent<HTMLButtonElement>) => handleThumbKeyDown("min", e),
      [handleThumbKeyDown]
    );

    const handleMaxKeyDown = useCallback(
      (e: KeyboardEvent<HTMLButtonElement>) => handleThumbKeyDown("max", e),
      [handleThumbKeyDown]
    );

    const minPercentage = calculatePercentage(displayMinValue, min, max);
    const maxPercentage = calculatePercentage(displayMaxValue, min, max);

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
            minPercentage={minPercentage}
            maxPercentage={maxPercentage}
            disabled={disabled}
            dataTestId={dataTestId}
          >
            <SliderThumb
              type="min"
              percentage={minPercentage}
              value={displayMinValue}
              minAriaValue={min}
              maxAriaValue={displayMaxValue - step}
              disabled={disabled}
              ariaLabel={minAriaLabel}
              dataTestId={dataTestId ? `${dataTestId}-min-thumb` : undefined}
              onMouseDown={handleMinMouseDown}
              onKeyDown={handleMinKeyDown}
            />
            <SliderThumb
              type="max"
              percentage={maxPercentage}
              value={displayMaxValue}
              minAriaValue={displayMinValue + step}
              maxAriaValue={max}
              disabled={disabled}
              ariaLabel={maxAriaLabel}
              dataTestId={dataTestId ? `${dataTestId}-max-thumb` : undefined}
              onMouseDown={handleMaxMouseDown}
              onKeyDown={handleMaxKeyDown}
            />
          </SliderTrack>
        </div>
      </div>
    );
  }
);

SliderRange.displayName = "Slider.Range";

export type SliderRangeProps = ComponentPropsWithRef<typeof SliderRange>;
