import type { HTMLAttributes, ReactElement } from "react";
import type { TabsButton, TabsItem } from "./components";
import type { TabsButtonProps } from "./components/TabsButton/tabsButton.types";

export interface TabsComponents {
  Button: typeof TabsButton;
  Item: typeof TabsItem;
}

export interface BaseTabsProperties {
  /**
   * The content of the tabs.
   * @TJS-type ReactElement<TabsButtonProps>[];
   */
  children: ReactElement<TabsButtonProps>[];
  /**
   * Sets the indicated tab as active by default. If unset, defaults to first tab.
   */
  preSelectedTab?: number;
  /**
   * Determines if tabs should span available width.
   * @default false
   */
  fullWidth?: boolean;
}

export interface ControlledTabsProperties extends BaseTabsProperties {
  /**
   * The currently selected tab index.
   */
  selected: number;
  /**
   * Callback fired when the selected tab changes.
   */
  onTabSelect: (index: number) => void;
  /**
   * preSelectedTab is not used in controlled mode
   */
  preSelectedTab?: never;
}

export type TabsProps =
  | (BaseTabsProperties | ControlledTabsProperties) &
      Omit<HTMLAttributes<HTMLDivElement>, "children" | "onSelect">;

// For docs purposes, we need to merge the two types
export type TabsProperties = BaseTabsProperties &
  Omit<ControlledTabsProperties, "preSelectedTab">;
