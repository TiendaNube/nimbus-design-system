import { SVGProps } from "react";

export type Sizes = "small" | "medium" | "large";
export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: Sizes | number;
}
