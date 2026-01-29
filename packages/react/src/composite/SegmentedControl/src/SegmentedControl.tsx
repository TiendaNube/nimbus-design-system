import React, { useState, useCallback, useMemo, useRef } from "react";

import { Box, type BoxProps } from "@nimbus-ds/box";

import {
  type SegmentedControlProps,
  type SegmentedControlComponents,
  type ControlledSegmentedControlProperties,
} from "./SegmentedControl.types";
import { SegmentedControlButton } from "./components";
import { isControlled } from "./segmentedControl.definitions";
import { SegmentedControlButtonSkeleton } from "./components/SegmentedControlButton/components/SegmentedControlButtonSkeleton/SegmentedControlButtonSkeleton";
import {
  SegmentedControlContext,
  type SegmentedControlContextValue,
} from "./contexts/SegmentedControlContext";

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
    string[]
  >([]);

  // Track registered button IDs
  const registeredButtonsRef = useRef(new Set<string>());

  const isControlledMode = isControlled(rest);

  const selectedSegments = useMemo(() => {
    if (isControlledMode) {
      return rest.selectedSegments;
    }
    return internalSelectedSegments;
  }, [isControlledMode, internalSelectedSegments, rest]);

  const handleToggleSegment = useCallback(
    (id: string) => {
      const handleChange = (current: string[]) => {
        const newSelected = [...current];
        const existingIndex = newSelected.indexOf(id);

        if (existingIndex !== -1) {
          newSelected.splice(existingIndex, 1);
          return newSelected;
        }

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

  const registerButton = useCallback((id: string) => {
    registeredButtonsRef.current.add(id);
  }, []);

  const unregisterButton = useCallback((id: string) => {
    registeredButtonsRef.current.delete(id);
  }, []);

  const isSelected = useCallback(
    (id: string) => selectedSegments.includes(id),
    [selectedSegments]
  );

  const contextValue: SegmentedControlContextValue = useMemo(
    () => ({
      registerButton,
      unregisterButton,
      toggleSegment: handleToggleSegment,
      isSelected,
      fullWidth,
    }),
    [
      registerButton,
      unregisterButton,
      handleToggleSegment,
      isSelected,
      fullWidth,
    ]
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
