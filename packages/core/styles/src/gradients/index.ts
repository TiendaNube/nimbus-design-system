import * as gradients from "./gradients";
import { createLinearGradient, createBorderGradient } from "./gradientBuilder";
import {
  generateGradientId,
  getGradientStops,
  createSvgGradientDef,
} from "./svgGradients";
import { GradientStop, Gradients } from "../types";

export {
  gradients,
  createLinearGradient,
  createBorderGradient,
  generateGradientId,
  getGradientStops,
  createSvgGradientDef,
  type GradientStop,
  type Gradients,
};
