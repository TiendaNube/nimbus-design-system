import { HTMLAttributes, ReactNode } from "react";
import { sidebar, SidebarSprinkle } from "@nimbus-ds/styles";
import { SidebarBody, SidebarFooter, SidebarHeader } from "./components";

type SidebarExtends = SidebarSprinkle & HTMLAttributes<HTMLDivElement>;

export interface SidebarComponents {
  Body: typeof SidebarBody;
  Footer: typeof SidebarFooter;
  Header: typeof SidebarHeader;
}

export interface SidebarProps extends SidebarExtends {
  /** Sidebar position */
  position?: "right" | "left";
  /** Sidebar padding */
  padding?: keyof typeof sidebar.properties.padding;
  /** Sidebar body content */
  children: ReactNode;
  /** Function to be passed on actioning the dismiss button */
  onRemove?: () => void;
  /** Controls the menu display */
  open?: boolean;
}
