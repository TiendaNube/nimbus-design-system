import { HTMLAttributes, ReactNode } from "react";
import { modal, ModalSprinkle } from "@nimbus-ds/styles";
import { ModalBody, ModalFooter, ModalHeader } from "./components";

export interface ModalComponents {
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
  Header: typeof ModalHeader;
}

export interface ModalProperties extends ModalSprinkle {
  /**
   * The content of the modal.
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
  /**
   * Whether the modal is open or not.
   */
  open: boolean;
  /**
   * Callback fired when the component requests to be closed.
   * @TJS-type (open: boolean) => void;
   */
  onDismiss: (open: boolean) => void;
  /**
   * Id to be embedded in the portal element
   */
  portalId?: string;
  /**
   * The padding properties are used to generate space around an modal's content area.
   * @default base
   */
  padding?: keyof typeof modal.properties.padding;
}

export type ModalProps = ModalProperties & HTMLAttributes<HTMLDivElement>;
