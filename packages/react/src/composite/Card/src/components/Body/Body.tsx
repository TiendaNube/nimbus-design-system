import React from "react";
import { card } from "@nimbus-ds/styles";

import { BodyProps } from "./body.types";

const Body: React.FC<BodyProps> = ({
  className: _className,
  style: _style,
  padding = "none",
  children,
  ...rest
}) => (
  <div
    className={[card.style.body, card.sprinkle({ padding })].join(" ")}
    {...rest}
  >
    {children}
  </div>
);

export { Body };
