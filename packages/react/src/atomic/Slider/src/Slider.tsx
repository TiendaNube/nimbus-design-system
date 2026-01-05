import React, { forwardRef, useCallback, useRef } from "react";
import type { ComponentPropsWithRef, KeyboardEvent, ChangeEvent } from "react";
import { slider } from "@nimbus-ds/styles";

import type { SliderBaseProps } from "./slider.types";
import { useSliderValues, useSliderDrag } from "./hooks";
import {
  SliderThumb,
  SliderInputs,
  SliderTrack,
  SliderRangeLabels,
} from "./components";

/** Default values for slider props */
export const SLIDER_DEFAULTS = {
  min: 0,
  max: 100,
  step: 1,
  appearance: "primary" as const,
  disabled: false,
  showInputs: true,
  showRangeLabels: true,
  inputSeparator: "↔",
  labelPrefix: "",
  labelSuffix: "",
};

/**
 * Slider component allows users to select a range of values within a defined minimum and maximum.
 * It features two draggable thumbs, optional number inputs, and customizable appearance.
 *
 * @component
 * @example
 * <Slider
 *   min={0}
 *   max={100}
 *   minValue={25}
 *   maxValue={75}
 *   onChange={(min, max) => console.log(min, max)}
 * />
 */
const Slider = forwardRef<HTMLDivElement, SliderBaseProps>(
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
      showInputs = SLIDER_DEFAULTS.showInputs,
      showRangeLabels = SLIDER_DEFAULTS.showRangeLabels,
      minLabel,
      maxLabel,
      inputSeparator = SLIDER_DEFAULTS.inputSeparator,
      labelPrefix = SLIDER_DEFAULTS.labelPrefix,
      labelSuffix = SLIDER_DEFAULTS.labelSuffix,
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

    const {
      localMinValue,
      localMaxValue,
      setLocalMinValue,
      setLocalMaxValue,
      clampValue,
      updateValues,
      getPercentage,
    } = useSliderValues({
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

    const { handleTrackMouseDown, handleThumbMouseDown } = useSliderDrag({
      trackRef,
      min,
      max,
      step,
      disabled,
      localMinValue,
      localMaxValue,
      clampValue,
      updateValues,
      setLocalMinValue,
      setLocalMaxValue,
      onChange,
      onMinChange,
      onMaxChange,
      onChangeEnd,
    });

    const handleThumbKeyDown = useCallback(
      (type: "min" | "max") => (e: KeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return;

        let newValue: number;
        const currentValue = type === "min" ? localMinValue : localMaxValue;

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
            newValue = type === "min" ? min : localMinValue + step;
            break;
          case "End":
            newValue = type === "max" ? max : localMaxValue - step;
            break;
          default:
            return;
        }

        e.preventDefault();
        if (type === "min") {
          updateValues(newValue, localMaxValue, true);
        } else {
          updateValues(localMinValue, newValue, true);
        }
      },
      [
        disabled,
        localMinValue,
        localMaxValue,
        step,
        min,
        max,
        clampValue,
        updateValues,
      ]
    );

    const handleMinInputChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const parsedValue = Number(e.target.value);

        if (!Number.isNaN(parsedValue)) {
          const clamped = clampValue(parsedValue, true);
          updateValues(clamped, localMaxValue, true);
        }
      },
      [clampValue, localMaxValue, updateValues]
    );

    const handleMaxInputChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const parsedValue = Number(e.target.value);

        if (!Number.isNaN(parsedValue)) {
          const clamped = clampValue(parsedValue, false);
          updateValues(localMinValue, clamped, true);
        }
      },
      [clampValue, localMinValue, updateValues]
    );

    const minPercentage = getPercentage(localMinValue);
    const maxPercentage = getPercentage(localMaxValue);

    const containerClassName = [slider.classnames.container, _className]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        {...rest}
        ref={ref}
        className={containerClassName}
        style={_style}
        data-testid={dataTestId}
      >
        {showInputs && (
          <SliderInputs
            minValue={localMinValue}
            maxValue={localMaxValue}
            min={min}
            max={max}
            step={step}
            localMinValue={localMinValue}
            localMaxValue={localMaxValue}
            disabled={disabled}
            minLabel={minLabel}
            maxLabel={maxLabel}
            separator={inputSeparator}
            dataTestId={dataTestId}
            onMinChange={handleMinInputChange}
            onMaxChange={handleMaxInputChange}
          />
        )}

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
              value={localMinValue}
              minAriaValue={min}
              maxAriaValue={localMaxValue - step}
              disabled={disabled}
              label={minLabel}
              dataTestId={dataTestId ? `${dataTestId}-min-thumb` : undefined}
              onMouseDown={handleThumbMouseDown("min")}
              onKeyDown={handleThumbKeyDown("min")}
            />
            <SliderThumb
              type="max"
              percentage={maxPercentage}
              value={localMaxValue}
              minAriaValue={localMinValue + step}
              maxAriaValue={max}
              disabled={disabled}
              label={maxLabel}
              dataTestId={dataTestId ? `${dataTestId}-max-thumb` : undefined}
              onMouseDown={handleThumbMouseDown("max")}
              onKeyDown={handleThumbKeyDown("max")}
            />
          </SliderTrack>
        </div>

        {showRangeLabels && (
          <SliderRangeLabels
            minDisplay={String(min)}
            maxDisplay={String(max)}
            prefix={labelPrefix}
            suffix={labelSuffix}
            dataTestId={dataTestId}
          />
        )}
      </div>
    );
  }
);

Slider.displayName = "Slider";

export type SliderProps = ComponentPropsWithRef<typeof Slider>;
export { Slider };
