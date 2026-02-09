import { type HTMLAttributes, type ReactNode } from "react";

export interface TabsItemProperties {
  /**
   * Label of the tabpanel. Used to pair with it's corresponding tab control.
   */
  label: string;
  /**
   * Optional content of the tabpanel.
   * @TJS-type ReactNode;
   */
  labelContent?: ReactNode;
  /**
   * The content of the tabs item.
   * @TJS-type ReactNode | ReactNode[];
   */
  children: ReactNode | ReactNode[];
}

export type TabsItemProps = TabsItemProperties & HTMLAttributes<HTMLElement>;
