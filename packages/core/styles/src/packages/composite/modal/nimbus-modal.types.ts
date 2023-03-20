import { Conditions } from "../../../types";
import { modalSprinkle } from "./nimbus-modal.css";

const { properties: propertiesModal } = modalSprinkle;

type PaddingProperties = keyof typeof propertiesModal.padding;

export interface ModalSprinkle {
  /**
   * The maxWidth property specifies the maxWidth of a modal's content area.
   * @default { xs: "100%", md: "500px" }
   */
  maxWidth?: string | Conditions<string>;
  /**
   * The padding properties are used to generate space around an modal's content area.
   * @default base
   */
  padding?: PaddingProperties | Conditions<PaddingProperties>;
}
