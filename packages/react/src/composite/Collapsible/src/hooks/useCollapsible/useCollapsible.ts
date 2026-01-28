import { useContext } from "react";

import type { CollapsibleContextProps } from "../../contexts";
import { CollapsibleContext } from "../../contexts";

export const useCollapsible: () => CollapsibleContextProps = () => {
  const context = useContext(CollapsibleContext);

  if (context == null || Object.keys(context).length === 0) {
    throw new Error(
      "CollapsibleBody components must be wrapped in <Collapsible />"
    );
  }
  return context;
};
