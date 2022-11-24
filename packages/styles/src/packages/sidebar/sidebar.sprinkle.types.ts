import { paddingProperties } from "./sidebar.sprinkle.css";

type PaddingProperties = keyof typeof paddingProperties;

interface Conditions<T> {
  xs?: T;
  md?: T;
  lg?: T;
}

export interface SidebarSprinkle {
  maxWidth?: string | Conditions<string>;
  padding?: PaddingProperties | Conditions<PaddingProperties>;
}
