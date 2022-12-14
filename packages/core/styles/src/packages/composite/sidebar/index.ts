import * as styles from "./sidebar.style.css";
import { paddingProperties, sprinkle } from "./sidebar.sprinkle.css";

export const sidebar = {
  style: { ...styles },
  sprinkle,
  properties: {
    padding: paddingProperties,
  },
};

export type { SidebarSprinkle } from "./sidebar.sprinkle.types";
