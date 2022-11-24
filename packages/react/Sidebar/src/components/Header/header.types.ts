import { HTMLAttributes, ReactNode } from "react";
import { sidebar } from "@nimbus-ds/styles";

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  /** Header content */
  children?: ReactNode;
  /** Header title */
  title?: string;
  /** Sidebar padding */
  padding?: keyof typeof sidebar.properties.padding;
}
