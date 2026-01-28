import React from "react";

import type { CollapsibleItemProps } from "./collapsibleItem.types";

const CollapsibleItem: React.FC<CollapsibleItemProps> = ({
  children,
  ...rest
}) => <div {...rest}>{children}</div>;

export { CollapsibleItem };
