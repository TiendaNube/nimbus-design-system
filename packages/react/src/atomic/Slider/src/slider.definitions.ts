import type { SliderAppearance } from "./slider.types";

export const SLIDER_DEFAULTS: {
  min: number;
  max: number;
  step: number;
  appearance: SliderAppearance;
  disabled: boolean;
} = {
  min: 0,
  max: 100,
  step: 1,
  appearance: "primary",
  disabled: false,
};

export const calculatePercentage = (
  value: number,
  min: number,
  max: number
): number => {
  const range = max - min;
  return range === 0 ? 0 : ((value - min) / range) * 100;
};

export const clampSingleValue = (
  value: number,
  min: number,
  max: number
): number => Math.max(min, Math.min(max, value));
