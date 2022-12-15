import { HTMLAttributes, ReactNode } from "react";

export interface TabsItemProps extends HTMLAttributes<HTMLElement> {
  /** Label of the tabpanel. Used to pair with it's corresponding tab control. */
  label: string;
  /** Content of the panel. */
  children: ReactNode | ReactNode[];
}
