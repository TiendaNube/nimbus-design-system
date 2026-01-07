import type { HTMLAttributes } from "react";

/**
 * Available appearance variants for the slider fill.
 * Controls the color scheme of the active range portion of the slider.
 */
export type SliderAppearance =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "neutral";

/**
 * Common properties shared between single and range slider modes.
 */
interface SliderCommonProperties {
  /**
   * The minimum value of the slider range.
   * @default 0
   */
  min?: number;
  /**
   * The maximum value of the slider range.
   * @default 100
   */
  max?: number;
  /**
   * The step increment between values.
   * @default 1
   */
  step?: number;
  /**
   * Visual appearance of the slider fill.
   * @default "primary"
   */
  appearance?: SliderAppearance;
  /**
   * Whether the slider is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * This is an attribute used to identify a DOM node for testing purposes.
   */
  "data-testid"?: string;
}

/**
 * Properties specific to single value slider mode.
 */
export interface SliderSingleProperties extends SliderCommonProperties {
  /**
   * The current value of the slider (single mode).
   */
  value: number;
  /**
   * Callback fired when the value changes.
   */
  onChange?: (value: number) => void;
  /**
   * Callback fired when the user finishes interacting with the slider.
   */
  onChangeEnd?: (value: number) => void;
}

/**
 * Properties specific to range slider mode (two thumbs).
 */
export interface SliderRangeProperties extends SliderCommonProperties {
  /**
   * The current minimum value selected on the slider.
   */
  minValue: number;
  /**
   * The current maximum value selected on the slider.
   */
  maxValue: number;
  /**
   * Callback fired when the min or max value changes.
   */
  onChange?: (minValue: number, maxValue: number) => void;
  /**
   * Callback fired when the min value changes.
   */
  onMinChange?: (value: number) => void;
  /**
   * Callback fired when the max value changes.
   */
  onMaxChange?: (value: number) => void;
  /**
   * Callback fired when the user finishes interacting with the slider.
   */
  onChangeEnd?: (minValue: number, maxValue: number) => void;
}

/**
 * Legacy interface for backwards compatibility.
 * @deprecated Use SliderRangeProperties instead.
 */
export type SliderProperties = SliderRangeProperties;

/**
 * Props for single value slider mode.
 */
export type SliderSingleBaseProps = SliderSingleProperties &
  Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "className" | "style">;

/**
 * Props for range slider mode.
 */
export type SliderRangeBaseProps = SliderRangeProperties &
  Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "className" | "style">;

/**
 * Complete props interface for the Slider component.
 * Supports both single value mode (with `value` prop) and range mode (with `minValue`/`maxValue` props).
 */
export type SliderBaseProps = SliderSingleBaseProps | SliderRangeBaseProps;

/**
 * Type guard to check if props are for single value mode.
 */
export const isSingleMode = (
  props: SliderBaseProps
): props is SliderSingleBaseProps => "value" in props;

/**
 * Type guard to check if props are for range mode.
 */
export const isRangeMode = (
  props: SliderBaseProps
): props is SliderRangeBaseProps => "minValue" in props && "maxValue" in props;
