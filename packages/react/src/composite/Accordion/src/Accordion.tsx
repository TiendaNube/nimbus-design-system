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
  const isControlledMode = isControlled(rest);

  const selectedDefault = !isControlledMode
    ? (rest as UncontrolledAccordionProperties).selectedDefault
    : undefined;
  const controlledSelected = isControlledMode
    ? (rest as ControlledAccordionProperties).selectedItem
    : undefined;
  const onItemSelect = isControlledMode
    ? (rest as ControlledAccordionProperties).onItemSelect
    : undefined;

  const [internalSelected, setInternalSelected] = useState("");

  useEffect(() => {
    if (!isControlledMode && selectedDefault) {
      setInternalSelected(selectedDefault);
    }
  }, [isControlledMode, selectedDefault]);

  const selected = useMemo(() => {
    if (isControlledMode) {
      return controlledSelected ?? "";
    }
    return internalSelected;
  }, [isControlledMode, internalSelected, controlledSelected]);

  const handleSelect = useCallback(
    (selectedId: string) => {
      if (isControlledMode) {
        if (onItemSelect) {
          onItemSelect(selectedId);
        }
      } else {
        setInternalSelected(selectedId);
      }
    },
    [isControlledMode, onItemSelect]
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
