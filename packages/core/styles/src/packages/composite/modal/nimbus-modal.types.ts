import { Conditions } from "../../../types";
import { modalSprinkle } from "./nimbus-modal.css";

const { properties: propertiesModal } = modalSprinkle;

type PaddingProperties = keyof typeof propertiesModal.padding;

export interface ModalSprinkle {
  maxWidth?: string | Conditions<string>;
  padding?: PaddingProperties | Conditions<PaddingProperties>;
}
