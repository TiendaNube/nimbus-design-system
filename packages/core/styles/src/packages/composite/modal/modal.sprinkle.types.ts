import { Conditions } from "../../../types";
import { modalSprinkle } from "./modal.sprinkle.css";

const { properties: propertiesModal } = modalSprinkle;

type PaddingProperties = keyof typeof propertiesModal.padding;

export interface ModalSprinkle {
  maxWidth?: string | Conditions<string>;
  padding?: PaddingProperties | Conditions<PaddingProperties>;
}
