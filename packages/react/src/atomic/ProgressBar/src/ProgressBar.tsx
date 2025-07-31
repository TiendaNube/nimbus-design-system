import React, { ComponentPropsWithRef, forwardRef, useMemo } from "react";
import { progressBar } from "@nimbus-ds/styles";

import { ProgressBarBaseProps, ProgressBarComponents } from "./progressBar.types";
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
      className: _className,
      style: _style,
      value,
      appearance = "neutral",
      ...rest
    },
    ref
  ) => {
    // Ensure value is within 0-100 range
    const clampedValue = useMemo(() => Math.min(100, Math.max(0, value)), [value]);
    const percentage = `${clampedValue}%`;

    return (
      <div
        {...rest}
        ref={ref}
        className={[progressBar.classnames.container, _className].join(" ")}
        style={_style}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={progressBar.classnames.appearance[appearance]}
          style={{ width: percentage }}
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
