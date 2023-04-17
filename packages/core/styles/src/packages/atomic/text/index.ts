import { styles, textSprinkle } from "./nimbus-text.css";

export const text = {
  classnames: { ...styles },
  ...textSprinkle,
};

export type { TextSprinkle } from "./nimbus-text.types";
