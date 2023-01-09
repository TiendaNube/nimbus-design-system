import { tableSprinkle } from "./table.sprinkle.css";

type TablePaddingProperties = keyof typeof tableSprinkle.properties.padding;

export interface TableSprinkle {
  padding?: TablePaddingProperties;
  width?: string;
  maxWidth?: string;
  minWidth?: string;
}
