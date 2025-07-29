import * as gradients from "./gradients";
import { createLinearGradient, createBorderGradient } from "./gradientBuilder";
import {
  generateGradientId,
  getGradientStops,
  createSvgGradientDef,
  injectGradientDefs,
} from "./svgGradients";
import type { GradientStop, GradientTypes } from "../types";

export {
  gradients,
  createLinearGradient,
  createBorderGradient,
  generateGradientId,
  getGradientStops,
  createSvgGradientDef,
  injectGradientDefs,
  type GradientStop,
  type GradientTypes,
};
