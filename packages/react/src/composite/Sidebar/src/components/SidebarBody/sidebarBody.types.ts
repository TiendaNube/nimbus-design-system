import { HTMLAttributes, ReactNode } from "react";
import { sidebar } from "@nimbus-ds/styles";

export interface SidebarBodyProperties {
  /**
   * The content of the sidebar body.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * The padding properties are used to generate space around an sidebar's body content area.
   * @default base
   */
  padding?: keyof typeof sidebar.properties.padding;
}

export type SidebarBodyProps = SidebarBodyProperties &
  HTMLAttributes<HTMLElement>;
