import React, { useMemo } from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { spinner, vars } from "@nimbus-ds/styles";

import { type SpinnerProps } from "./spinner.types";
import {
  sizes,
  extendedColors,
  isExtendedColor,
} from "./spinner.definitions";

const Spinner: React.FC<SpinnerProps> = ({
  className,
  style: _style,
  color = "primary-interactive",
  size = "large",
  ...rest
}) => {
  const scale = useMemo(
    () => (typeof size === "number" ? `${size}px` : `${sizes[size] || 32}px`),
    [size]
  );

  const extended = isExtendedColor(color);

  return (
    <svg
      viewBox="0 0 50 50"
      className={[
        className,
        !extended && spinner.sprinkle({ color }),
        spinner.classnames.base,
      ]
        .filter(Boolean)
        .join(" ")}
      style={assignInlineVars({
        [vars.width]: scale,
        [vars.height]: scale,
      })}
      {...rest}
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="10"
        style={extended ? { stroke: extendedColors[color] } : undefined}
      />
    </svg>
  );
};

Spinner.displayName = "Spinner";
export { Spinner };
