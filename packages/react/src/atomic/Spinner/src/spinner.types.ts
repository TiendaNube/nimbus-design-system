import { SVGAttributes } from "react";

import { spinner } from "@nimbus-ds/styles";

export interface SpinnerProps extends SVGAttributes<SVGElement> {
  /** Spinner size */
  size?: "small" | "medium" | "large" | number;
  /** Spinner color */
  color?: keyof typeof spinner.properties;
}
