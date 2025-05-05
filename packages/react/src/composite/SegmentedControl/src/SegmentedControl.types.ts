import { HTMLAttributes, ReactElement } from "react";
import { SegmentedControlItem } from "./components";
import { SegmentedControlButtonBaseProps } from "./components/SegmentedControlButton/SegmentedControlButton.types";

export interface SegmentedControlComponents {
  Item: typeof SegmentedControlItem;
}

export interface SegmentedControlBaseProps {
  /**
   * The content of the segmented control.
   * @TJS-type ReactElement<SegmentedControlButtonProps>[];
   */
  children: ReactElement<SegmentedControlButtonBaseProps>[];
  /**
   * Sets the indicated segment as active by default. If unset, defaults to first segment.
   */
  preSelectedSegment?: number;
}

export interface ControlledSegmentedControlProperties
  extends SegmentedControlBaseProps {
  /**
   * The currently selected segment index.
   */
  selected: number;
  /**
   * Callback fired when the selected segment changes.
   */
  onSegmentSelect: (index: number) => void;
  /**
   * preSelectedSegment is not used in controlled mode
   */
  preSelectedSegment?: never;
}

export type SegmentedControlProps =
  | (SegmentedControlBaseProps | ControlledSegmentedControlProperties) &
      Omit<HTMLAttributes<HTMLDivElement>, "children">;

// For docs purposes, we need to merge the two types
export type SegmentedControlProperties = SegmentedControlBaseProps &
  Omit<ControlledSegmentedControlProperties, "preSelectedSegment">;
