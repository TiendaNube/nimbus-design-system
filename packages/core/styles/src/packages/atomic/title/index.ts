import { styles, titleSprinkle } from "./nimbus-title.css";

export const title = {
  classnames: { ...styles },
  ...titleSprinkle,
};

export type { TitleSprinkle } from "./nimbus-title.types";
