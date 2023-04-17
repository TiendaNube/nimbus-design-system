import React from "react";
import { card } from "@nimbus-ds/styles";

import { CardBodyProps } from "./cardBody.types";

const CardBody: React.FC<CardBodyProps> = ({
  className: _className,
  style: _style,
  padding = "none",
  children,
  ...rest
}) => (
  <div className={card.sprinkle({ padding })} {...rest}>
    {children}
  </div>
);

export { CardBody };
