import React from "react";

import { generateID } from "../../segmentedControl.definitions";
import { SegmentedControlItemProps } from "./SegmentedControlItem.types";

const SegmentedControlItem: React.FC<SegmentedControlItemProps> = ({
  className: _className,
  style: _style,
  label,
  children,
  ...rest
}) => {
  const ariaID = generateID(label);
  return (
    <div
      {...rest}
      id={`panel-${ariaID}`}
      role="region"
      aria-labelledby={`segment-${ariaID}`}
    >
      {children}
    </div>
  );
};

export { SegmentedControlItem };
