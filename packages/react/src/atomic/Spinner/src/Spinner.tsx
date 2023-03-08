import React, { useMemo } from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { spinner, vars } from "@nimbus-ds/styles";

import { SpinnerProps } from "./spinner.types";
import { sizes } from "./spinner.definitions";

const Spinner: React.FC<SpinnerProps> = ({
  className: _className,
  style: _style,
  color = "primary-interactive",
  size = "large",
  ...rest
}) => {
  const scale = useMemo(
    () => (typeof size === "number" ? `${size}px` : `${sizes[size] || 32}px`),
    [size]
  );

  return (
    <svg
      viewBox="0 0 50 50"
      className={[spinner.sprinkle({ color }), spinner.classnames.base].join(
        " "
      )}
      style={assignInlineVars({
        [vars.width]: scale,
        [vars.height]: scale,
      })}
      {...rest}
    >
      <circle cx="25" cy="25" r="20" fill="none" strokeWidth="10" />
    </svg>
  );
};

Spinner.displayName = "Spinner";
export { Spinner };
