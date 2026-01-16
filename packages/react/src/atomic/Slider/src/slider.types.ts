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
 * Used for documentation generation.
 */
export interface SliderProperties extends SliderCommonProperties {
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
  /**
   * Accessible label for the slider thumb.
   * @default "Value"
   */
  ariaLabel?: string;
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
  /**
   * Accessible label for the minimum value thumb.
   * @default "Minimum value"
   */
  minAriaLabel?: string;
  /**
   * Accessible label for the maximum value thumb.
   * @default "Maximum value"
   */
  maxAriaLabel?: string;
}

/**
 * Props for single value slider mode.
 */
export type SliderBaseProps = SliderProperties &
  Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "className" | "style">;

/**
 * Props for range slider mode.
 */
export type SliderRangeBaseProps = SliderRangeProperties &
  Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "className" | "style">;
