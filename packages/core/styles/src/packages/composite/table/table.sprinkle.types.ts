import { Conditions } from "../../../types";
import { tableSprinkle } from "./table.sprinkle.css";

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
  padding?: TablePaddingProperties;
  width?: string;
  maxWidth?: string;
  minWidth?: string;
  backgroundColor?:
    | TableRowBackgroundColorProperties
    | TableConditions<TableRowBackgroundColorProperties>;
}
