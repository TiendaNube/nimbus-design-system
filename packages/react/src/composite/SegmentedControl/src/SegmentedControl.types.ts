import { ReactNode } from "react";
import type { BoxProps } from "@nimbus-ds/box";
import {
  SegmentedControlButton,
  SegmentedControlButtonSkeleton,
} from "./components";

/**
 * Context interface for SegmentedControl toggle state management
 * Uses number indexes for simplicity
 */
export interface SegmentedControlContextValue {
  /**
   * Get the next available index for a button
   */
  getNextIndex: () => number;
  /**
   * Toggle a segment's state by index
   */
  toggleSegment: (index: number) => void;
  /**
   * Check if a segment is currently selected
   */
  isSelected: (index: number) => boolean;
  /**
   * Whether buttons should span full width
   */
  fullWidth: boolean;
}

export interface SegmentedControlBaseProps {
  /**
   * The content of the segmented control.
   * Now supports any React children that contain SegmentedControlButton components.
   */
  children: ReactNode;
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
