import type { HTMLAttributes } from "react";

/** Available appearance variants for the slider fill */
export type SliderAppearance =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "neutral";

export interface SliderProperties {
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
   * The current minimum value selected on the slider.
   */
  minValue: number;
  /**
   * The current maximum value selected on the slider.
   */
  maxValue: number;
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
   * Whether to show the number inputs for min and max values.
   * @default true
   */
  showInputs?: boolean;
  /**
   * Whether to show the range labels below the slider.
   * @default true
   */
  showRangeLabels?: boolean;
  /**
   * Label for the minimum input.
   */
  minLabel?: string;
  /**
   * Label for the maximum input.
   */
  maxLabel?: string;
  /**
   * Separator displayed between the min and max inputs.
   * @default "↔"
   */
  inputSeparator?: string;
  /**
   * Prefix displayed before the range label values (e.g., "R$", "$").
   */
  labelPrefix?: string;
  /**
   * Suffix displayed after the range label values (e.g., "kg", "%").
   */
  labelSuffix?: string;
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
   * Callback fired when the user finishes interacting with the slider (on mouse/touch up).
   */
  onChangeEnd?: (minValue: number, maxValue: number) => void;
  /**
   * This is an attribute used to identify a DOM node for testing purposes.
   */
  "data-testid"?: string;
}

export type SliderBaseProps = SliderProperties &
  Omit<HTMLAttributes<HTMLDivElement>, "onChange">;
