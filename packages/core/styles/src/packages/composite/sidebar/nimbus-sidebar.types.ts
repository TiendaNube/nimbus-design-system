import { Conditions } from "../../../types";
import { sidebarSprinkle } from "./nimbus-sidebar.css";

type SidebarPaddingProperties = keyof typeof sidebarSprinkle.properties.padding;

export interface SidebarSprinkle {
  maxWidth?: string | Conditions<string>;
  zIndex?: number | Conditions<number>;
  padding?: SidebarPaddingProperties | Conditions<SidebarPaddingProperties>;
}
