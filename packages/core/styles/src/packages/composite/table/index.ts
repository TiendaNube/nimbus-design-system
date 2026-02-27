import {
  styles,
  tableSprinkle,
  tableWrapperSprinkle,
} from "./nimbus-table.css";

export const table = {
  classnames: { ...styles },
  ...tableSprinkle,
  wrapper: tableWrapperSprinkle,
};

export type { TableSprinkle, TableWrapperSprinkle } from "./nimbus-table.types";
