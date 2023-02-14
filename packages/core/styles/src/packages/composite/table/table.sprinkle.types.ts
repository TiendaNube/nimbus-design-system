import { Conditions } from "../../../types";
import { tableSprinkle } from "./table.sprinkle.css";

const { properties } = tableSprinkle;

type TablePaddingProperties = keyof typeof tableSprinkle.properties.padding;
type TableRowBackgroundColorProperties =
  keyof typeof properties.backgroundColor;

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
