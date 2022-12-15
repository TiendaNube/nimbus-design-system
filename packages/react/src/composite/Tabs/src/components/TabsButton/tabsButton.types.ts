import { HTMLAttributes } from "react";

export interface TabsButtonProps extends HTMLAttributes<HTMLLIElement> {
  /** Label of the tab button. */
  label: string;
  /** Determines if tab is active. */
  active?: boolean;
  /** Position of the tab inside the tab list. */
  index: number;
  /** Function executed when clicking the tab. */
  setActiveTab: (index: number) => void;
  /** Determines if tab spans all available width. */
  fullWidth?: boolean;
}
