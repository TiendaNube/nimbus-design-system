import { Conditions } from "../../../types";
import { sidebarSprinkle } from "./nimbus-sidebar.css";

type SidebarPaddingProperties = keyof typeof sidebarSprinkle.properties.padding;

export interface SidebarSprinkle {
  /**
   * The maxWidth property specifies the maxWidth of a sidebar's content area.
   * @default 375px
   */
  maxWidth?: string | Conditions<string>;
  /**
   * The zIndex property specifies the stack order of the sidebar.
   */
  zIndex?: number | Conditions<number>;
  /**
   * The padding properties are used to generate space around an sidebar's content area.
   * @default base
   */
  padding?: SidebarPaddingProperties | Conditions<SidebarPaddingProperties>;
}
