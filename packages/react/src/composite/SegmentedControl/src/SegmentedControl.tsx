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

  const nextIndexRef = useRef(0);

  const isControlledMode = isControlled(rest);

  const selectedSegments = useMemo(() => {
    if (isControlledMode) {
      return rest.selectedSegments;
    }
    return internalSelectedSegments;
  }, [isControlledMode, internalSelectedSegments, rest]);

  const handleToggleSegment = useCallback(
    (index: number) => {
      const handleChange = (current: number[]) => {
        const newSelected = [...current];
        const existingIndex = newSelected.indexOf(index);

        if (existingIndex !== -1) {
          newSelected.splice(existingIndex, 1);
          return newSelected;
        }

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

  const contextValue: SegmentedControlContextValue = useMemo(
    () => ({
      getNextIndex: () => {
        const currentIndex = nextIndexRef.current;
        nextIndexRef.current += 1;
        return currentIndex;
      },
      toggleSegment: handleToggleSegment,
      isSelected: (index) => selectedSegments.includes(index),
      fullWidth,
    }),
    [handleToggleSegment, selectedSegments, fullWidth]
  );

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
