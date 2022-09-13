import React, { useMemo } from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { spinner, utils } from "@nimbus-ds/styles";

import { SpinnerProps } from "./spinner.types";
import { sizes } from "./spinner.definitions";

const Spinner: React.FC<SpinnerProps> = ({
  className: _className,
  style: _style,
  color = "primary.interactive",
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
      className={[spinner.sprinkle({ color }), spinner.style].join(" ")}
      style={assignInlineVars({
        [utils.vars.width]: scale,
        [utils.vars.height]: scale,
      })}
      {...rest}
    >
      <circle cx="25" cy="25" r="20" fill="none" strokeWidth="6" />
    </svg>
  );
};

export { Spinner };
