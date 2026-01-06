import React, { memo, forwardRef } from "react";
import { slider } from "@nimbus-ds/styles";

import type { SliderAppearance } from "../../slider.types";

interface SliderTrackProps {
  appearance: SliderAppearance;
  /** For range mode: start of fill. For single mode: should be 0. */
  minPercentage?: number;
  /** End of the fill (value percentage). */
  maxPercentage: number;
  dataTestId?: string;
  children: React.ReactNode;
}

const SliderTrackComponent = forwardRef<HTMLDivElement, SliderTrackProps>(
  (
    { appearance, minPercentage = 0, maxPercentage, dataTestId, children },
    ref
  ) => (
    <div
      ref={ref}
      className={slider.classnames.track}
      data-testid={dataTestId ? `${dataTestId}-track` : undefined}
    >
      <div
        className={slider.classnames.fill[appearance]}
        style={{
          left: `${minPercentage}%`,
          right: `${100 - maxPercentage}%`,
        }}
        data-testid={dataTestId ? `${dataTestId}-fill` : undefined}
      />
      {children}
    </div>
  )
);

SliderTrackComponent.displayName = "SliderTrack";
SliderTrackComponent.defaultProps = {
  minPercentage: 0,
  dataTestId: undefined,
};

export const SliderTrack = memo(SliderTrackComponent);
