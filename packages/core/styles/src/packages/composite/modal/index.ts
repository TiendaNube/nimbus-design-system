import {
  styles,
  modalSprinkle,
  modalHeaderSprinkle,
  modalBodySprinkle,
  modalFooterSprinkle,
} from "./nimbus-modal.css";

export const modal = {
  ...modalSprinkle,
  classnames: { ...styles },
  subComponents: {
    header: modalHeaderSprinkle,
    body: modalBodySprinkle,
    footer: modalFooterSprinkle,
  },
};

export type { ModalSprinkle } from "./nimbus-modal.types";
