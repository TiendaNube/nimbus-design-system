import type { Conditions } from "../../../types";
import { tableSprinkle } from "./nimbus-table.css";

const { properties: propertiesTable } = tableSprinkle;

type TablePaddingProperties = keyof typeof propertiesTable.padding;
type TableRowBackgroundColorProperties =
  keyof typeof propertiesTable.backgroundColor;

interface TableConditions<T> extends Conditions<T> {
  rest?: T;
  focus?: T;
  active?: T;
  hover?: T;
}

export interface TableSprinkle {
  /**
   * The width property specifies the width of a table's content area.
   */
  width?: string | TableConditions<string>;
  /**
   * The maxWidth property specifies the maxWidth of a table's content area.
   */
  maxWidth?: string | TableConditions<string>;
  /**
   * The minWidth property specifies the minWidth of a table's content area.
   */
  minWidth?: string | TableConditions<string>;
  /**
   * The backgroundColor property sets the background color of the table.
   */
  backgroundColor?:
    | TableRowBackgroundColorProperties
    | TableConditions<TableRowBackgroundColorProperties>;
  /**
   * The padding properties are used to generate space around an table's content area.
   */
  padding?: TablePaddingProperties | TableConditions<TablePaddingProperties>;
}
