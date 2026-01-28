import type { HTMLAttributes, ReactNode } from "react";
import type { sidebar } from "@nimbus-ds/styles";

export interface SidebarHeaderProperties {
  /**
   * The content of the sidebar header.
   * @TJS-type React.ReactNode
   */
  children?: ReactNode;
  /**
   * The title to display in the sidebar header.
   */
  title?: string;
  /**
   * The padding properties are used to generate space around an sidebar's header content area.
   * @default base
   */
  padding?: keyof typeof sidebar.properties.padding;
}

export type SidebarHeaderProps = SidebarHeaderProperties &
  HTMLAttributes<HTMLElement>;
