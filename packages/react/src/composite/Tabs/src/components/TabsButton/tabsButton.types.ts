import { HTMLAttributes } from "react";

export interface TabsButtonProperties {
  /**
   * Label of the tab button.
   */
  label: string;
  /**
   * Determines if tab is active.
   * @default false
   */
  active?: boolean;
  /**
   * Position of the tab inside the tab list.
   */
  index: number;
  /**
   * Function executed when clicking the tab.
   * @TJS-type (index: number) => void;
   */
  setActiveTab: (index: number) => void;
  /**
   * Determines if tab spans all available width.
   * @default false
   */
  fullWidth?: boolean;
}

export type TabsButtonProps = TabsButtonProperties &
  HTMLAttributes<HTMLLIElement>;
