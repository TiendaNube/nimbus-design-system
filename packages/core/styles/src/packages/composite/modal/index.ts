import * as styles from "./modal.style.css";
import { modalSprinkle } from "./modal.sprinkle.css";

export const modal = {
  classnames: { ...styles },
  ...modalSprinkle,
};

export type { ModalSprinkle } from "./modal.sprinkle.types";
