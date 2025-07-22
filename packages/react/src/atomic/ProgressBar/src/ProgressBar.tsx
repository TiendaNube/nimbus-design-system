import React, { ComponentPropsWithRef, forwardRef } from "react";
import { progressBar } from "@nimbus-ds/styles";

import { ProgressBarBaseProps, ProgressBarComponents } from "./progressBar.types";
import { ProgressBarSkeleton } from "./components";

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
    const clampedValue = Math.min(100, Math.max(0, value));
    const percentage = `${clampedValue}%`;

    return (
      <div
        {...rest}
        ref={ref}
        className={progressBar.classnames.container}
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
