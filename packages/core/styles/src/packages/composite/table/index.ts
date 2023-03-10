import { styles, tableSprinkle } from "./nimbus-table.css";

export const table = {
  classnames: { ...styles },
  ...tableSprinkle,
};

export type { TableSprinkle } from "./nimbus-table.types";
