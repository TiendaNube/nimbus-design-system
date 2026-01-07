import React, { forwardRef, useCallback, useRef } from "react";
import type { ComponentPropsWithRef, KeyboardEvent } from "react";
import { slider } from "@nimbus-ds/styles";

import type {
  SliderRangeBaseProps,
  SliderSingleBaseProps,
} from "./slider.types";
import { useSliderValues, useSliderDrag, useSingleSliderDrag } from "./hooks";
import { SliderThumb, SliderTrack } from "./components";
import {
  SLIDER_DEFAULTS,
  calculatePercentage,
  clampSingleValue,
  buildContainerClassName,
} from "./slider.definitions";

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
const SliderBase = forwardRef<HTMLDivElement, SliderSingleBaseProps>(
  (
    {
      className: _className,
      style: _style,
      min = SLIDER_DEFAULTS.min,
      max = SLIDER_DEFAULTS.max,
      value,
      step = SLIDER_DEFAULTS.step,
      appearance = SLIDER_DEFAULTS.appearance,
      disabled = SLIDER_DEFAULTS.disabled,
      onChange,
      onChangeEnd,
      "data-testid": dataTestId,
      ...rest
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

    const containerClassName = buildContainerClassName(
      slider.classnames.container,
      _className
    );

    return (
      <div
        {...rest}
        ref={ref}
        className={containerClassName}
        style={_style}
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
            dataTestId={dataTestId}
          >
            <SliderThumb
              type="single"
              percentage={percentage}
              value={displayValue}
              minAriaValue={min}
              maxAriaValue={max}
              disabled={disabled}
              dataTestId={dataTestId ? `${dataTestId}-thumb` : undefined}
              onMouseDown={handleThumbMouseDown}
              onKeyDown={handleKeyDown}
            />
          </SliderTrack>
        </div>
      </div>
    );
  }
);

SliderBase.displayName = "Slider";

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
const SliderRange = forwardRef<HTMLDivElement, SliderRangeBaseProps>(
  (
    {
      className: _className,
      style: _style,
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
      "data-testid": dataTestId,
      ...rest
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

    const containerClassName = buildContainerClassName(
      slider.classnames.container,
      _className
    );

    return (
      <div
        {...rest}
        ref={ref}
        className={containerClassName}
        style={_style}
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
            dataTestId={dataTestId}
          >
            <SliderThumb
              type="min"
              percentage={minPercentage}
              value={displayMinValue}
              minAriaValue={min}
              maxAriaValue={displayMaxValue - step}
              disabled={disabled}
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

export type SliderProps = ComponentPropsWithRef<typeof SliderBase>;
export type SliderRangeProps = ComponentPropsWithRef<typeof SliderRange>;
export type {
  SliderSingleBaseProps,
  SliderRangeBaseProps,
} from "./slider.types";
export { SLIDER_DEFAULTS } from "./slider.definitions";
