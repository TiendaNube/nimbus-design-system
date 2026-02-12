import React, { memo, forwardRef } from "react";
import type { ReactNode } from "react";
import { slider } from "@nimbus-ds/styles";
import { assignInlineVars } from "@vanilla-extract/dynamic";

import type { SliderAppearance } from "../../slider.types";

/* eslint-disable react/require-default-props */
interface SliderTrackProps {
  appearance: SliderAppearance;
  minPercentage?: number;
  maxPercentage: number;
  disabled?: boolean;
  dataTestId?: string;
  children: ReactNode;
  className?: string;
}

const SliderTrackComponent = forwardRef<HTMLDivElement, SliderTrackProps>(
  (
    {
      className,
      appearance,
      minPercentage = 0,
      maxPercentage,
      disabled = false,
      dataTestId,
      children,
    }: SliderTrackProps,
    ref
  ) => (
    <div
      ref={ref}
      className={[
        className,
        disabled
          ? slider.classnames.track.disabled
          : slider.classnames.track.default,
      ].join(" ")}
      data-testid={dataTestId ? `${dataTestId}-track` : undefined}
    >
      <div
        className={
          disabled
            ? slider.classnames.fill_disabled
            : slider.classnames.fill[appearance]
        }
        style={assignInlineVars({
          [slider.vars.fillLeft]: `${minPercentage}%`,
          [slider.vars.fillRight]: `${100 - maxPercentage}%`,
        })}
        data-testid={dataTestId ? `${dataTestId}-fill` : undefined}
      />
      {children}
    </div>
  )
);

SliderTrackComponent.displayName = "SliderTrack";

export const SliderTrack = memo(SliderTrackComponent);
