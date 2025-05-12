import React, { useState, useEffect, useCallback, useMemo } from "react";

import { Box, BoxProps } from "@nimbus-ds/box";

import {
  SegmentedControlProps,
  SegmentedControlComponents,
  ControlledSegmentedControlProperties,
} from "./SegmentedControl.types";
import { SegmentedControlButton } from "./components";
import { isButton, isControlled } from "./segmentedControl.definitions";
import { SegmentedControlButtonSkeleton } from "./components/SegmentedControlButton/components/SegmentedControlButtonSkeleton/SegmentedControlButtonSkeleton";

/**
 * SegmentedControl component for grouped selection controls
 */
const SegmentedControl: React.FC<SegmentedControlProps> &
  SegmentedControlComponents = ({
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
        if (isButton(child.props) && child.props.selected) {
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
  const {
    onSegmentsSelect,
    selectedSegments: _,
    ...boxProps
  } = rest as BoxProps & Partial<ControlledSegmentedControlProperties>;

  return (
    <Box
      flexWrap="wrap"
      aria-label="Segmented control"
      role="group"
      data-testid="segmented-control-container"
      maxWidth={fullWidth ? "100%" : "fit-content"}
      alignItems="center"
      justifyContent="center"
      {...boxProps}
      // Properties that can't be changed by the consumer
      display="flex"
      gap="1"
      backgroundColor="neutral-surface"
      borderRadius="2"
    >
      {React.Children.map(children, (item, index) => {
        if (isButton(item.props)) {
          const {
            props: { children: buttonChildren, ...childrenRest },
          } = item;
          const isSelected = selectedSegments.includes(index);

          return (
            <SegmentedControlButton
              {...childrenRest}
              key={`segment-${childrenRest.label}`}
              selected={isSelected}
              fullWidth={fullWidth}
              onClick={(event) => {
                handleToggleSegment(index);
                childrenRest.onClick?.(event);
              }}
            >
              {buttonChildren}
            </SegmentedControlButton>
          );
        }
        // Return the item as is if it's not a button (skeleton case)
        return item;
      })}
    </Box>
  );
};

SegmentedControl.displayName = "SegmentedControl";

SegmentedControl.Button = SegmentedControlButton;
SegmentedControl.Button.displayName = "SegmentedControl.Button";

SegmentedControl.ButtonSkeleton = SegmentedControlButtonSkeleton;
SegmentedControl.ButtonSkeleton.displayName = "SegmentedControl.ButtonSkeleton";

export { SegmentedControl };
