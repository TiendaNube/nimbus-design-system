import { type Conditions } from "../../../types";
import { type sidebarSprinkle } from "./nimbus-sidebar.css";

type SidebarPaddingProperties = keyof typeof sidebarSprinkle.properties.padding;
type SidebarZIndexProperties = keyof typeof sidebarSprinkle.properties.zIndex;

export interface SidebarSprinkle {
  /**
   * The maxWidth property specifies the maxWidth of a sidebar's content area.
   * @default 375px
   */
  maxWidth?: string | Conditions<string>;
  /**
   * The zIndex property specifies the stack order of the sidebar.
   */
  zIndex?: SidebarZIndexProperties | Conditions<SidebarZIndexProperties>;
  /**
   * The padding properties are used to generate space around an sidebar's content area.
   * @default base
   */
  padding?: SidebarPaddingProperties | Conditions<SidebarPaddingProperties>;
}
