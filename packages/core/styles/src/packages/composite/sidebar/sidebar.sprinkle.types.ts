import { Conditions } from "../../../types";
import { sidebarSprinkle } from "./sidebar.sprinkle.css";

type SidebarPaddingProperties = keyof typeof sidebarSprinkle.properties.padding;

export interface SidebarSprinkle {
  maxWidth?: string | Conditions<string>;
  zIndex?: number | Conditions<number>;
  padding?: SidebarPaddingProperties | Conditions<SidebarPaddingProperties>;
}
