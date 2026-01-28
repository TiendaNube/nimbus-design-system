import React, { useEffect, useMemo, useState } from "react";

import type {
  CollapsibleProperties,
  CollapsibleBaseProps,
  CollapsibleComponents,
} from "./collapsible.types";
import { CollapsibleBody } from "./components/CollapsibleBody/CollapsibleBody";
import { CollapsibleItem } from "./components/CollapsibleItem/CollapsibleItem";
import { CollapsibleContext } from "./contexts";

const Collapsible: React.FC<CollapsibleProperties> & CollapsibleComponents = ({
  className: _className,
  style: _style,
  open,
  children,
  ...rest
}: CollapsibleBaseProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof open === "boolean") {
      setVisible(open);
    }
  }, [open]);

  const context = useMemo(
    () => ({
      open: visible,
      onOpen: setVisible,
    }),
    [visible, setVisible]
  );

  return (
    <CollapsibleContext.Provider value={context}>
      <div {...rest}>{children}</div>
    </CollapsibleContext.Provider>
  );
};

Collapsible.Body = CollapsibleBody;
Collapsible.Item = CollapsibleItem;

Collapsible.displayName = "Collapsible";

export { Collapsible };
