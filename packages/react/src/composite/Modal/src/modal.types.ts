import { HTMLAttributes, ReactNode } from "react";
import { modal, ModalSprinkle } from "@nimbus-ds/styles";
import { ModalBody, ModalFooter, ModalHeader } from "./components";

type ModalExtends = ModalSprinkle & HTMLAttributes<HTMLDivElement>;

export interface ModalComponents {
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
  Header: typeof ModalHeader;
}

export interface ModalProps extends ModalExtends {
  /** Modal content */
  children: ReactNode;
  /** Control open Modal */
  open: boolean;
  /** Function to be passed on actioning the dismiss button */
  onDismiss: (open: boolean) => void;
  /** Modal ID */
  portalId?: string;
  /** Modal padding */
  padding?: keyof typeof modal.properties.padding;
}
