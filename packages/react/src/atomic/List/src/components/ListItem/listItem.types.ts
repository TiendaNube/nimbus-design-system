import { HTMLAttributes, ReactNode } from "react";

export interface ListItemProperties {
  /**
   * The content of the list item.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type ListItemProps = ListItemProperties & HTMLAttributes<HTMLLIElement>;
