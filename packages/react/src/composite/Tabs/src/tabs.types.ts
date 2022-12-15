import { HTMLAttributes, ReactElement } from "react";
import { TabsButton, TabsItem } from "./components";
import { TabsButtonProps } from "./components/TabsButton/tabsButton.types";

export interface TabsComponents {
  Button: typeof TabsButton;
  Item: typeof TabsItem;
}

export interface TabsProps extends HTMLAttributes<HTMLElement> {
  /** Tabs content. */
  children: ReactElement<TabsButtonProps>[];
  /** Sets the indicated tab as active by default. If unset, defaults to first tab. */
  preSelectedTab?: number;
  /** Determines if tabs should span available width. */
  fullWidth?: boolean;
}
