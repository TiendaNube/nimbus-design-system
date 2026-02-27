import { type Conditions } from "../../../types";
import { tableSprinkle, tableWrapperSprinkle } from "./nimbus-table.css";

const { properties: propertiesTable } = tableSprinkle;
const { properties: propertiesWrapper } = tableWrapperSprinkle;

type TablePaddingProperties = keyof typeof propertiesTable.padding;
type TableRowBackgroundColorProperties =
  keyof typeof propertiesTable.backgroundColor;
type TableBorderRadiusProperties = keyof typeof propertiesWrapper.borderRadius;

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

export interface TableWrapperSprinkle {
  /**
   * Controls the border radius of the table wrapper.
   * Use "none" for no border radius or "2" for the default token value.
   * @default "2"
   */
  borderRadius?: TableBorderRadiusProperties;
}
