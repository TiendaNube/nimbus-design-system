import { HTMLAttributes, ReactNode } from "react";
import { sidebar } from "@nimbus-ds/styles";

export interface BodyProps extends HTMLAttributes<HTMLElement> {
  /** Body content */
  children: ReactNode;
  /** Sidebar padding */
  padding?: keyof typeof sidebar.properties.padding;
}
