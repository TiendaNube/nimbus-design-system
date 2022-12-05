import { paddingProperties } from "./sidebar.sprinkle.css";

type PaddingProperties = keyof typeof paddingProperties;

interface Conditions<T> {
  xs?: T;
  md?: T;
  lg?: T;
}

export interface SidebarSprinkle {
  maxWidth?: string | Conditions<string>;
  zIndex?: number | Conditions<number>;
  padding?: PaddingProperties | Conditions<PaddingProperties>;
}
