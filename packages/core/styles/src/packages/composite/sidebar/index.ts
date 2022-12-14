import * as styles from "./sidebar.style.css";
import { sidebarSprinkle } from "./sidebar.sprinkle.css";

export const sidebar = {
  classnames: { ...styles },
  ...sidebarSprinkle,
};

export type { SidebarSprinkle } from "./sidebar.sprinkle.types";
