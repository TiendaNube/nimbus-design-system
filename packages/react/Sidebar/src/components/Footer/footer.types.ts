import { HTMLAttributes, ReactNode } from "react";
import { sidebar } from "@nimbus-ds/styles";

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  /** Footer content */
  children: ReactNode;
  /** Sidebar padding */
  padding?: keyof typeof sidebar.properties.padding;
}
