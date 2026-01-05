import React, { memo } from "react";
import { slider } from "@nimbus-ds/styles";

interface SliderRangeLabelsProps {
  minDisplay: string;
  maxDisplay: string;
  prefix: string;
  suffix: string;
  dataTestId?: string;
}

const SliderRangeLabelsComponent: React.FC<SliderRangeLabelsProps> = ({
  minDisplay,
  maxDisplay,
  prefix,
  suffix,
  dataTestId,
}) => (
  <div className={slider.classnames.rangeLabels}>
    <span data-testid={dataTestId ? `${dataTestId}-min-label` : undefined}>
      {prefix}
      {minDisplay}
      {suffix}
    </span>
    <span data-testid={dataTestId ? `${dataTestId}-max-label` : undefined}>
      {prefix}
      {maxDisplay}
      {suffix}
    </span>
  </div>
);

SliderRangeLabelsComponent.defaultProps = {
  dataTestId: undefined,
};

export const SliderRangeLabels = memo(SliderRangeLabelsComponent);
