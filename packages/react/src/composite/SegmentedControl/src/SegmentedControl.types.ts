import { HTMLAttributes, ReactElement } from "react";
import { SegmentedControlItem, SegmentedControlItemProps } from "./components";

export interface SegmentedControlComponents {
  Item: typeof SegmentedControlItem;
}

export interface SegmentedControlBaseProps {
  /**
   * The content of the segmented control.
   * @TJS-type ReactElement<SegmentedControlButtonProps>[];
   */
  children: ReactElement<SegmentedControlItemProps>[];
}

export interface ControlledSegmentedControlProperties
  extends SegmentedControlBaseProps {
  /**
   * The currently selected segment indices.
   * At least one segment must always be selected.
   */
  selectedSegments: number[];
  /**
   * Callback fired when the selected segments change.
   * This will only be called if the change results in at least one selected segment.
   */
  onSegmentsSelect: (indices: number[]) => void;
}

export type SegmentedControlProps =
  | (SegmentedControlBaseProps | ControlledSegmentedControlProperties) &
      Omit<HTMLAttributes<HTMLDivElement>, "children">;

// For docs purposes, we need to merge the two types
export type SegmentedControlProperties = SegmentedControlBaseProps &
  Omit<ControlledSegmentedControlProperties, "preSelectedSegment">;
