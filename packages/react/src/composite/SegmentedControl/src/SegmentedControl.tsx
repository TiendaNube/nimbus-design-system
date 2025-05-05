import React, { useState } from "react";
import { segmentedControl } from "@nimbus-ds/styles";

import {
  SegmentedControlProps,
  SegmentedControlComponents,
} from "./SegmentedControl.types";
import { SegmentedControlButton, SegmentedControlItem } from "./components";
import { isControlled } from "./segmentedControl.definitions";

/**
 * SegmentedControl component for grouped selection controls
 */
const SegmentedControl: React.FC<SegmentedControlProps> &
  SegmentedControlComponents = ({
  className: _className,
  style: _style,
  children,
  preSelectedSegment,
  ...rest
}: SegmentedControlProps) => {
  // Internal state for uncontrolled mode
  const [internalSelectedSegment, setInternalSelectedSegment] =
    useState<number>(preSelectedSegment || 0);

  // Use controlled or uncontrolled state
  const selectedSegment = isControlled(rest)
    ? rest.selected
    : internalSelectedSegment;
  const setSelectedSegment = isControlled(rest)
    ? rest.onSegmentSelect
    : setInternalSelectedSegment;

  // Extract onSegmentSelect from rest, and html props
  const { onSegmentSelect, selected, ...htmlProps } = rest as any;

  return (
    <div>
      <div className={segmentedControl.classnames.container} {...htmlProps}>
        {React.Children.map(children, (item, index) => {
          const {
            props: { label },
          } = item;
          return (
            <SegmentedControlButton
              key={label}
              label={label}
              index={index}
              active={index === selectedSegment}
              setActiveSegment={setSelectedSegment}
            />
          );
        })}
      </div>
    </div>
  );
};

SegmentedControl.Item = SegmentedControlItem;

SegmentedControl.displayName = "SegmentedControl";
SegmentedControl.Item.displayName = "SegmentedControl.Item";

export { SegmentedControl };
