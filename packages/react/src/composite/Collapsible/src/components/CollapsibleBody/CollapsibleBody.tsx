import React from "react";

import { collapsible } from "@nimbus-ds/styles";
import { type CollapsibleBodyProps } from "./collapsibleBody.types";
import { useCollapsible } from "../../hooks/useCollapsible";

const CollapsibleBody: React.FC<CollapsibleBodyProps> = ({
  className,
  style: _style,
  children,
  visibleWhen = "open",
  direction = "none",
  ...rest
}) => {
  const { open } = useCollapsible();

  const show =
    (open && visibleWhen === "open") || (!open && visibleWhen === "closed");

  const classNames = {
    top: collapsible.classnames.bodyReversalAnimation,
    bottom: collapsible.classnames.bodyAnimation,
    none: collapsible.classnames.body,
  };

  return show ? (
    <div
      {...rest}
      className={[className, classNames[direction]].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  ) : null;
};

export { CollapsibleBody };
