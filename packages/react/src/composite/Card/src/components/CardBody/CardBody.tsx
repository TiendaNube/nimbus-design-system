import React from "react";
import { card } from "@nimbus-ds/styles";

import { type CardBodyProps } from "./cardBody.types";

const CardBody: React.FC<CardBodyProps> = ({
  className,
  style: _style,
  padding = "none",
  children,
  ...rest
}) => (
  <div
    className={[className, card.subComponents.body.sprinkle({ padding })]
      .filter(Boolean)
      .join(" ")}
    {...rest}
  >
    {children}
  </div>
);

export { CardBody };
