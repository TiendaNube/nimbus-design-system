import React, { useState, useEffect, useMemo, useCallback } from "react";

import {
  AccordionProps,
  AccordionComponents,
  ControlledAccordionProperties,
  UncontrolledAccordionProperties,
} from "./accordion.types";
import { AccordionBody, AccordionItem, AccordionHeader } from "./components";
import { AccordionContext } from "./contexts";
import { isControlled } from "./accordion.definitions";

const Accordion: React.FC<AccordionProps> & AccordionComponents = ({
  className: _className,
  style: _style,
  children,
  className,
  ...rest
}: AccordionProps) => {
  // Internal state for uncontrolled mode
  const [internalSelected, setInternalSelected] = useState("");

  const isControlledMode = isControlled(rest);

  // Initialize uncontrolled mode with selectedDefault
  useEffect(() => {
    if (!isControlledMode) {
      const uncontrolledProps = rest as UncontrolledAccordionProperties;
      if (uncontrolledProps.selectedDefault) {
        setInternalSelected(uncontrolledProps.selectedDefault);
      }
    }
  }, [isControlledMode, rest]);

  const selected = useMemo(() => {
    if (isControlledMode) {
      const controlledProps = rest as ControlledAccordionProperties;
      return controlledProps.selectedItem;
    }
    return internalSelected;
  }, [isControlledMode, internalSelected, rest]);

  const handleSelect = useCallback(
    (selectedId: string) => {
      if (isControlledMode) {
        const controlledProps = rest as ControlledAccordionProperties;
        if (controlledProps.onItemSelect) {
          controlledProps.onItemSelect(selectedId);
        }
      } else {
        setInternalSelected(selectedId);
      }
    },
    [isControlledMode, rest]
  );

  const context = useMemo(
    () => ({
      selected,
      onSelect: handleSelect,
    }),
    [selected, handleSelect]
  );

  // Extract controlled props to avoid passing them to the div
  const {
    selectedItem: _selectedItem,
    onItemSelect: _onItemSelect,
    selectedDefault: _selectedDefault,
    ...divProps
  } = rest as any;

  return (
    <div {...divProps}>
      <AccordionContext.Provider value={context}>
        {children}
      </AccordionContext.Provider>
    </div>
  );
};

Accordion.Body = AccordionBody;
Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.displayName = "Accordion";
Accordion.Body.displayName = "Accordion.Body";
Accordion.Item.displayName = "Accordion.Item";
Accordion.Header.displayName = "Accordion.Header";

export { Accordion };
