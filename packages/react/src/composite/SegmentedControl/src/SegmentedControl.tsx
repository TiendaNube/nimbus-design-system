import React, { useState, useEffect, useCallback, useMemo } from "react";
import { segmentedControl } from "@nimbus-ds/styles";

import {
  SegmentedControlProps,
  SegmentedControlComponents,
  ControlledSegmentedControlProperties,
  SegmentedControlItemProps,
} from "./SegmentedControl.types";
import { SegmentedControlButton } from "./components";
import { isControlled } from "./segmentedControl.definitions";

/**
 * SegmentedControl component for grouped selection controls
 */
const SegmentedControl: React.FC<SegmentedControlProps> &
  SegmentedControlComponents = ({
  className: _className,
  style: _style,
  children,
  fullWidth = false,
  ...rest
}: SegmentedControlProps) => {
  // Internal state for uncontrolled mode
  const [internalSelectedSegments, setInternalSelectedSegments] = useState<
    number[]
  >([0]);

  // Check for controlled mode
  const isControlledMode = isControlled(rest);

  // Initialize from selected props (for uncontrolled mode only)
  useEffect(() => {
    if (!isControlledMode && React.Children.count(children) > 0) {
      const initialSelectedIndices: number[] = [];

      // Check if any children have selected prop
      React.Children.forEach(children, (child, index) => {
        if (child.props.selected) {
          initialSelectedIndices.push(index);
        }
      });

      // Use selected indices or default to first item
      if (initialSelectedIndices.length > 0) {
        setInternalSelectedSegments(initialSelectedIndices);
      } else {
        setInternalSelectedSegments([0]);
      }
    }
  }, [children, isControlledMode]);

  // Get the currently selected segments
  const selectedSegments = useMemo(() => {
    if (isControlledMode) {
      const controlledProps = rest as ControlledSegmentedControlProperties;
      return controlledProps.selectedSegments?.length > 0
        ? controlledProps.selectedSegments
        : [0];
    }
    return internalSelectedSegments;
  }, [isControlledMode, internalSelectedSegments, rest]);

  // Handle toggling a segment
  const handleToggleSegment = useCallback(
    (index: number) => {
      const handleChange = (current: number[]) => {
        const newSelected = [...current];
        const existingIndex = newSelected.indexOf(index);

        if (existingIndex !== -1) {
          // Only remove if there would still be at least one segment selected
          if (newSelected.length > 1) {
            newSelected.splice(existingIndex, 1);
            return newSelected;
          }
          return current; // Don't allow deselecting the last item
        }

        // Add the segment
        newSelected.push(index);
        return newSelected;
      };

      if (isControlledMode) {
        const controlledProps = rest as ControlledSegmentedControlProperties;
        if (controlledProps.onSegmentsSelect) {
          controlledProps.onSegmentsSelect(handleChange(selectedSegments));
        }
      } else {
        setInternalSelectedSegments(handleChange);
      }
    },
    [isControlledMode, selectedSegments, rest]
  );

  // Extract props from rest
  const { onSegmentsSelect, selectedSegments: _, ...htmlProps } = rest as any;

  return (
    <div
      className={segmentedControl.classnames.container}
      data-testid="segmented-control-container"
      {...htmlProps}
    >
      {React.Children.map(children, (item, index) => {
        const {
          props: { children: buttonChildren, ...rest },
        } = item;
        const isSelected = selectedSegments.includes(index);

        return (
          <SegmentedControlButton
            {...rest}
            key={rest.label}
            selected={isSelected}
            fullWidth={fullWidth}
            onClick={(event) => {
              handleToggleSegment(index);
              rest.onClick?.(event);
            }}
          >
            {buttonChildren}
          </SegmentedControlButton>
        );
      })}
    </div>
  );
};

// We export a small version of the Button for consumers to use
SegmentedControl.Button =
  SegmentedControlButton as unknown as React.FC<SegmentedControlItemProps>;

SegmentedControl.displayName = "SegmentedControl";
SegmentedControl.Button.displayName = "SegmentedControl.Button";

export { SegmentedControl };
