import { HTMLAttributes } from "react";

import { spinner } from "@nimbus-ds/styles";

export interface SpinnerProps extends HTMLAttributes<SVGElement> {
  /** Spinner size */
  size?: "small" | "medium" | "large" | number;
  /** Spinner color */
  color?: keyof typeof spinner.properties;
}
