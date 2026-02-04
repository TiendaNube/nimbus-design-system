import React from "react";
import { slider } from "@nimbus-ds/styles";

export interface SliderLabelsProps {
  min: number;
  max: number;
  minLabel?: string;
  maxLabel?: string;
  dataTestId?: string;
}

export const SliderLabels: React.FC<SliderLabelsProps> = ({
  min,
  max,
  minLabel,
  maxLabel,
  dataTestId,
}) => (
  <div
    className={slider.classnames.labelsContainer}
    data-testid={dataTestId ? `${dataTestId}-labels` : undefined}
  >
    <span
      className={slider.classnames.label}
      data-testid={dataTestId ? `${dataTestId}-min-label` : undefined}
    >
      {minLabel ?? String(min)}
    </span>
    <span
      className={slider.classnames.label}
      data-testid={dataTestId ? `${dataTestId}-max-label` : undefined}
    >
      {maxLabel ?? String(max)}
    </span>
  </div>
);

SliderLabels.displayName = "SliderLabels";
