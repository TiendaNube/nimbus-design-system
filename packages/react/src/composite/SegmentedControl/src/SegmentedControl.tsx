import React, { useState, useCallback, useMemo, useRef } from "react";

import { Box, BoxProps } from "@nimbus-ds/box";

import {
  SegmentedControlProps,
  SegmentedControlComponents,
  ControlledSegmentedControlProperties,
  SegmentedControlContextValue,
} from "./SegmentedControl.types";
import { SegmentedControlButton } from "./components";
import { isControlled } from "./segmentedControl.definitions";
import { SegmentedControlButtonSkeleton } from "./components/SegmentedControlButton/components/SegmentedControlButtonSkeleton/SegmentedControlButtonSkeleton";
import { SegmentedControlContext } from "./SegmentedControlContext";

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
  >([]);

  // ID counter for buttons
  const nextIdRef = useRef(0);

  // Check for controlled mode
  const isControlledMode = isControlled(rest);

  // Get the currently selected segments
  const selectedSegments = useMemo(() => {
    if (isControlledMode) {
      return rest.selectedSegments;
    }
    return internalSelectedSegments;
  }, [isControlledMode, internalSelectedSegments, rest]);

  // Handle toggling a segment
  const handleToggleSegment = useCallback(
    (id: number) => {
      const handleChange = (current: number[]) => {
        const newSelected = [...current];
        const existingIndex = newSelected.indexOf(id);

        if (existingIndex !== -1) {
          newSelected.splice(existingIndex, 1);
          return newSelected;
        }

        // Add the segment
        newSelected.push(id);
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

  // Simplified context value
  const contextValue: SegmentedControlContextValue = useMemo(() => ({
    getNextId: () => nextIdRef.current++,
    toggleSegment: handleToggleSegment,
    isSelected: (id: number) => selectedSegments.includes(id),
    fullWidth,
  }), [handleToggleSegment, selectedSegments, fullWidth]);

  // Extract props from rest
  const {
    onSegmentsSelect,
    selectedSegments: _,
    ...boxProps
  } = rest as BoxProps & Partial<ControlledSegmentedControlProperties>;

  return (
    <SegmentedControlContext.Provider value={contextValue}>
      <Box
        aria-label="Segmented control"
        role="group"
        data-testid="segmented-control-container"
        maxWidth={fullWidth ? "100%" : "fit-content"}
        alignItems="center"
        justifyContent="center"
        flexWrap="nowrap"
        {...boxProps}
        // Properties that can't be changed by the consumer
        display="flex"
        gap="1"
        backgroundColor="neutral-surface"
        borderRadius="2"
      >
        {children}
      </Box>
    </SegmentedControlContext.Provider>
  );
};

SegmentedControl.displayName = "SegmentedControl";

SegmentedControl.Button = SegmentedControlButton;
SegmentedControl.Button.displayName = "SegmentedControl.Button";

SegmentedControl.ButtonSkeleton = SegmentedControlButtonSkeleton;
SegmentedControl.ButtonSkeleton.displayName = "SegmentedControl.ButtonSkeleton";

export { SegmentedControl };
