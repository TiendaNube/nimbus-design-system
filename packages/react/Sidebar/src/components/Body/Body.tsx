import React from "react";
import { sidebar } from "@nimbus-ds/styles";

import { BodyProps } from "./body.types";

const Body: React.FC<BodyProps> = ({
  className: _className,
  style: _style,
  padding = "none",
  children,
  ...rest
}) => (
  <div className={sidebar.sprinkle({ padding })} {...rest}>
    {children}
  </div>
);

export { Body };
