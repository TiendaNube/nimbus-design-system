import React, { type ComponentPropsWithRef, forwardRef, useMemo } from "react";
import { progressBar } from "@nimbus-ds/styles";

import {
  type ProgressBarBaseProps,
  type ProgressBarComponents,
} from "./progressBar.types";
import { ProgressBarSkeleton } from "./components";

/**
 * ProgressBar component displays the progress of an operation or task in a visual format.
 * It provides a horizontal bar that fills based on the completion percentage.
 *
 * @component
 * @example
 * <ProgressBar value={50} appearance="primary" />
 *
 * @example
 * // With skeleton loading state
 * <ProgressBar.Skeleton width="200px" />
 */
const ProgressBar = forwardRef<HTMLDivElement, ProgressBarBaseProps>(
  (
    {
      className,
      style: _style,
      value,
      appearance = "neutral",
      backgroundColor = "neutral-surfaceDisabled",
      boxShadow = 0,
      height,
      ...rest
    },
    ref
  ) => {
    // Ensure value is within 0-100 range
    const clampedValue = useMemo(
      () => Math.min(100, Math.max(0, value)),
      [value]
    );
    const percentage = `${clampedValue}%`;

    const containerClass =
      boxShadow > 0
        ? progressBar.classnames.containerNoOverflow
        : progressBar.classnames.container;

    const containerStyle: React.CSSProperties = {
      ...(height ? { height } : {}),
    };

    const fillStyle: React.CSSProperties = {
      width: percentage,
      ...(boxShadow > 0
        ? { boxShadow: progressBar.shadowMap[boxShadow as 1 | 2] }
        : {}),
    };

    return (
      <div
        {...rest}
        ref={ref}
        className={[
          className,
          containerClass,
          progressBar.classnames.backgroundColor[backgroundColor],
        ]
          .filter(Boolean)
          .join(" ")}
        style={containerStyle}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={progressBar.classnames.appearance[appearance]}
          style={fillStyle}
          data-testid="progress-bar-fill"
        />
      </div>
    );
  }
) as React.ForwardRefExoticComponent<
  ProgressBarBaseProps & React.RefAttributes<HTMLDivElement>
> &
  ProgressBarComponents;

ProgressBar.Skeleton = ProgressBarSkeleton;
ProgressBar.displayName = "ProgressBar";
ProgressBar.Skeleton.displayName = "ProgressBar.Skeleton";

export type ProgressBarProps = ComponentPropsWithRef<typeof ProgressBar>;
export { ProgressBar };
