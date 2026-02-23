import { type HTMLAttributes, type ReactNode } from "react";
import { type sidebar } from "@nimbus-ds/styles";

export interface SidebarFooterProperties {
  /**
   * The content of the sidebar footer.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * The padding properties are used to generate space around an sidebar's footer content area.
   * @default base
   */
  padding?: keyof typeof sidebar.properties.padding;
}

export type SidebarFooterProps = SidebarFooterProperties &
  HTMLAttributes<HTMLElement>;
