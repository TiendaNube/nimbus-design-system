import { HTMLAttributes, ReactNode } from "react";
import { sidebar, SidebarSprinkle } from "@nimbus-ds/styles";
import { SidebarBody, SidebarFooter, SidebarHeader } from "./components";

export interface SidebarComponents {
  Body: typeof SidebarBody;
  Footer: typeof SidebarFooter;
  Header: typeof SidebarHeader;
}

export interface SidebarProperties extends SidebarSprinkle {
  /**
   * Side from which the sidebar will appear.
   * @default right
   */
  position?: "right" | "left";
  /**
   * The padding properties are used to generate space around an sidebar's content area.
   * @default base
   */
  padding?: keyof typeof sidebar.properties.padding;
  /**
   * The content of the sidebar.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Callback fired when the component requests to be closed.
   * () => void;
   */
  onRemove?: () => void;
  /**
   * Determines if the sidebar is shown or not.
   * @default true
   */
  open?: boolean;
  /**
   * Determines if RemoveScroll wraps sidebar's children component.
   * @default true
   */
  needRemoveScroll?: boolean;
}

export type SidebarProps = SidebarProperties & HTMLAttributes<HTMLDivElement>;
