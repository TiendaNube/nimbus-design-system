import { ReactElement } from "react";
import type { BoxProps } from "@nimbus-ds/box";
import {
  SegmentedControlButton,
  SegmentedControlButtonSkeleton,
  type SegmentedControlButtonSkeletonProps,
  type SegmentedControlButtonProps,
} from "./components";

export interface SegmentedControlBaseProps {
  /**
   * The content of the segmented control.
   * @TJS-type ReactElement<SegmentedControlButtonProps | SegmentedControlButtonSkeletonProps>[];
   */
  children: ReactElement<
    SegmentedControlButtonProps | SegmentedControlButtonSkeletonProps
  >[];
  /**
   * Determines if segments span all available width.
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * Component composition structure for the SegmentedControl
 */
export interface SegmentedControlComponents {
  Button: typeof SegmentedControlButton;
  ButtonSkeleton: typeof SegmentedControlButtonSkeleton;
}

export interface ControlledSegmentedControlProperties
  extends SegmentedControlBaseProps {
  /**
   * The currently selected segment indices.
   * Allows for single or multiple selection.
   */
  selectedSegments: number[];
  /**
   * Callback fired when the selected segments change.
   * This will only be called if the change results in at least one selected segment.
   */
  onSegmentsSelect: (indices: number[]) => void;
}

/**
 * Props for the SegmentedControl component, supporting both controlled and uncontrolled modes
 */
export type SegmentedControlProps = (
  | SegmentedControlBaseProps
  | ControlledSegmentedControlProperties
) &
  Omit<BoxProps, "display" | "backgroundColor" | "gap" | "borderRadius" | "children">;

// For docs purposes, we need to merge the two types
export type SegmentedControlProperties = SegmentedControlBaseProps &
  ControlledSegmentedControlProperties;
