import React, { HTMLAttributes, ReactElement, PropsWithChildren } from "react";

export type SegmentedControlItemProps = PropsWithChildren<{
  label: string;
  disabled?: boolean;
  selected?: boolean;
}>;

type SegmentedControlItem = React.FC<SegmentedControlItemProps>;

export interface SegmentedControlBaseProps {
  /**
   * The content of the segmented control.
   * @TJS-type ReactElement<SegmentedControlButtonProps>[];
   */
  children: ReactElement<SegmentedControlItemProps>[];
  /**
   * Determines if segments span all available width.
   * @default false
   */
  fullWidth?: boolean;
}

export interface SegmentedControlComponents {
  Button: SegmentedControlItem;
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
