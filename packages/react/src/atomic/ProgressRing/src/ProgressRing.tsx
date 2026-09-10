import React, { useMemo } from "react";

import { type ProgressRingProps } from "./progressRing.types";
import { sizes } from "./progressRing.definitions";

const RADIUS = 20;
const STROKE_WIDTH = 4;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * ProgressRing displays measurable, determinate progress as a circular ring,
 * with a visible, programmatically exposed value.
 *
 * Visual detail beyond this minimal rendering (stroke width, track visibility,
 * a color/appearance token set) is not yet part of this component's contract —
 * no Nimbus Figma design exists for it. Do not read this implementation's
 * current stroke width or color handling as a guarantee.
 *
 * @component
 * @example
 * <ProgressRing value={60} aria-label="Setup progress" />
 */
const ProgressRing: React.FC<ProgressRingProps> = ({
  className,
  style,
  value,
  size = "large",
  "aria-label": ariaLabel,
  ...rest
}) => {
  const clampedValue = useMemo(
    () => Math.min(100, Math.max(0, value)),
    [value]
  );

  const scale = useMemo(
    () => (typeof size === "number" ? size : sizes[size] ?? sizes.large),
    [size]
  );

  const dashOffset = useMemo(
    () => CIRCUMFERENCE - (clampedValue / 100) * CIRCUMFERENCE,
    [clampedValue]
  );

  return (
    <svg
      {...rest}
      className={className}
      style={{ ...style, width: scale, height: scale }}
      viewBox="0 0 50 50"
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
    >
      <circle
        cx="25"
        cy="25"
        r={RADIUS}
        fill="none"
        strokeWidth={STROKE_WIDTH}
        stroke="currentColor"
        opacity={0.25}
        data-testid="progress-ring-track"
      />
      <circle
        cx="25"
        cy="25"
        r={RADIUS}
        fill="none"
        strokeWidth={STROKE_WIDTH}
        stroke="currentColor"
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={dashOffset}
        transform="rotate(-90 25 25)"
        data-testid="progress-ring-fill"
      />
    </svg>
  );
};

ProgressRing.displayName = "ProgressRing";
export { ProgressRing };
