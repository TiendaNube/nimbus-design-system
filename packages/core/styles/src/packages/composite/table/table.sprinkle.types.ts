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
  padding?: TablePaddingProperties | TableConditions<TablePaddingProperties>;
  width?: string | TableConditions<string>;
  maxWidth?: string | TableConditions<string>;
  minWidth?: string | TableConditions<string>;
  backgroundColor?:
    | TableRowBackgroundColorProperties
    | TableConditions<TableRowBackgroundColorProperties>;
}
