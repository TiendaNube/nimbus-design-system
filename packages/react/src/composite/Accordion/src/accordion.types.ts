import { type HTMLAttributes, type ReactNode } from "react";
import {
  type AccordionBody,
  type AccordionItem,
  type AccordionHeader,
} from "./components";

export interface AccordionComponents {
  Body: typeof AccordionBody;
  Item: typeof AccordionItem;
  Header: typeof AccordionHeader;
}

export interface AccordionBaseProperties {
  /**
   * The content of the accordion.
   * @TJS-type React.ReactNode
   */
  children?: ReactNode;
}

export interface UncontrolledAccordionProperties
  extends AccordionBaseProperties {
  /**
   * Informs which accordion item is open by default, this value must be the same as informed in the index of each item
   */
  selectedDefault?: string;
}

export interface ControlledAccordionProperties extends AccordionBaseProperties {
  /**
   * The currently selected accordion item ID.
   */
  selectedItem: string;
  /**
   * Callback fired when the selected accordion item changes.
   * @param selectedId The ID of the selected accordion item
   */
  onItemSelect?: (selectedId: string) => void;
}

/**
 * Props for the Accordion component, supporting both controlled and uncontrolled modes
 */
export type AccordionProps = (
  | UncontrolledAccordionProperties
  | ControlledAccordionProperties
) &
  Omit<HTMLAttributes<HTMLElement>, "onItemSelect" | "selectedItem">;

// For docs purposes, we need to merge the two types
export type AccordionProperties = AccordionBaseProperties &
  UncontrolledAccordionProperties &
  ControlledAccordionProperties;
