import { styles, modalSprinkle } from "./nimbus-modal.css";

export const modal = {
  classnames: { ...styles },
  ...modalSprinkle,
};

export type { ModalSprinkle } from "./nimbus-modal.types";
