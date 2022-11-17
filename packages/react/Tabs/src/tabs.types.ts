import { HTMLAttributes, ReactElement } from "react";
import { Button, Item } from "./components";
import { ButtonProps } from "./components/Button/button.types";

export interface TabsComponents {
  Button: typeof Button;
  Item: typeof Item;
}

export interface TabsProps extends HTMLAttributes<HTMLElement> {
  /** Tabs content. */
  children: ReactElement<ButtonProps>[];
  /** Sets the indicated tab as active by default. If unset, defaults to first tab. */
  preSelectedTab?: number;
  /** Determines if tabs should span available width. */
  fullWidth?: boolean;
}
