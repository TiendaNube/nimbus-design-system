import { HTMLAttributes, ReactNode } from "react";

export interface TabsItemProperties {
  /**
   * Label of the tabpanel. Used to pair with it's corresponding tab control.
   */
  label: string;
  /**
   * The content of the tabs item.
   * @TJS-type ReactNode | ReactNode[];
   */
  children: ReactNode | ReactNode[];
}

export type TabsItemProps = TabsItemProperties & HTMLAttributes<HTMLElement>;
