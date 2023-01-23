import * as styles from "./table.style.css";
import { tableSprinkle } from "./table.sprinkle.css";

export const table = {
  classnames: { ...styles },
  ...tableSprinkle,
};

export type { TableSprinkle } from "./table.sprinkle.types";
