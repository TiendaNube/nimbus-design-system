import { ReactNode } from "react";
import type { BoxProps } from "@nimbus-ds/box";
import {
  SegmentedControlButton,
  SegmentedControlButtonSkeleton,
} from "./components";

/**
 * Context interface for SegmentedControl state management
 * Uses unique string IDs for stable identification
 */
export interface SegmentedControlContextValue {
  /**
   * Register a button with its unique identifier
   * @param id The unique identifier for the button
   */
  registerButton: (id: string) => void;
  /**
   * Unregister a button by its identifier
   * @param id The identifier of the button to unregister
   */
  unregisterButton: (id: string) => void;
  /**
   * Toggle a segment's state by ID
   * @param id The unique identifier of the segment to toggle
   */
  toggleSegment: (id: string) => void;
  /**
   * Check if a segment is currently selected by ID
   * @param id The unique identifier of the segment to check
   */
  isSelected: (id: string) => boolean;
  /**
   * Whether buttons should span full width
   */
  fullWidth: boolean;
}

export interface SegmentedControlBaseProps {
  /**
   * The content of the segmented control.
   * Should contain SegmentedControlButton components with unique id props.
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
   * The currently selected segment IDs.
   * Allows for single or multiple selection.
   */
  selectedSegments: string[];
  /**
   * Callback fired when the selected segments change.
   * @param selectedIds Array of selected segment IDs
   */
  onSegmentsSelect: (selectedIds: string[]) => void;
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
