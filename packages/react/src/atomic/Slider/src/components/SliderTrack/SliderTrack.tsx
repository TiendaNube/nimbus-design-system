import React, { memo, forwardRef } from "react";
import { slider } from "@nimbus-ds/styles";

import type { SliderAppearance } from "../../slider.types";

interface SliderTrackProps {
  appearance: SliderAppearance;
  minPercentage: number;
  maxPercentage: number;
  dataTestId?: string;
  children: React.ReactNode;
}

const SliderTrackComponent = forwardRef<HTMLDivElement, SliderTrackProps>(
  ({ appearance, minPercentage, maxPercentage, dataTestId, children }, ref) => (
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
  dataTestId: undefined,
};

export const SliderTrack = memo(SliderTrackComponent);
