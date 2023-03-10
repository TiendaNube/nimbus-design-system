import { styles, sidebarSprinkle } from "./nimbus-sidebar.css";

export const sidebar = {
  classnames: { ...styles },
  ...sidebarSprinkle,
};

export type { SidebarSprinkle } from "./nimbus-sidebar.types";
