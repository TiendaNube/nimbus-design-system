import { HTMLAttributes, ReactNode } from "react";
import { sidebar } from "@nimbus-ds/styles";
import { Body, Footer, Header } from "./components";

export interface SidebarComponents {
  Body: typeof Body;
  Footer: typeof Footer;
  Header: typeof Header;
}

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
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
