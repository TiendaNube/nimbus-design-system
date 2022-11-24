import * as style from "./sidebar.style.css";
import { paddingProperties, sprinkle } from "./sidebar.sprinkle.css";

export const sidebar = {
  style,
  sprinkle,
  properties: {
    padding: paddingProperties,
  },
};

export type { SidebarSprinkle } from "./sidebar.sprinkle.types";
