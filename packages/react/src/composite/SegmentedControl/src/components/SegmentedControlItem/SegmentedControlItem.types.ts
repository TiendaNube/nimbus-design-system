import React, { CSSProperties } from "react";

export interface SegmentedControlItemProps {
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Custom style
   */
  style?: CSSProperties;
  /**
   * Label of the segment. This will be used to identify the segment.
   */
  label: string;
  /**
   * Whether this segment should be selected by default. Used in uncontrolled mode.
   * @default false
   */
  selected?: boolean;
  /**
   * Content of the panel
   */
  children: React.ReactNode;
} 