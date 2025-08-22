import { HTMLAttributes, ReactNode } from "react";
import { sidebar, SidebarSprinkle } from "@nimbus-ds/styles";
import { CloseOnOutsidePress } from "@common/event-handling";
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

  /**
   * Controls whether clicking/pressing outside should close the sidebar.
   * - boolean: enable/disable dismissal on outside press
   * - function: receive the DOM event and return true to allow closing, false to ignore
   *
   * Defaults to true for backward compatibility.
   */
  closeOnOutsidePress?: boolean | CloseOnOutsidePress;

  /**
   * The attribute name to ignore when checking for outside clicks.
   * @default "data-nimbus-outside-press-ignore"
   */
  ignoreAttributeName?: string;
}

export type SidebarProps = SidebarProperties & {
  /**
   * Root element where the portal should be mounted. When provided and not null,
   * the portal renders inside this element; when null/undefined, the default root is used.
   */
  root?: HTMLElement | null; // We create props for HTMLElement types
} & HTMLAttributes<HTMLDivElement>;
