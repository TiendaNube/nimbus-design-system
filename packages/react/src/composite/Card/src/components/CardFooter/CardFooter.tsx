import React from "react";
import { card } from "@nimbus-ds/styles";

import { type CardFooterProps } from "./cardFooter.types";

const CardFooter: React.FC<CardFooterProps> = ({
  className: _className,
  style: _style,
  padding = "none",
  children,
  ...rest
}) => (
  <div
    className={[
      card.classnames.container__footer,
      card.subComponents.footer.sprinkle({ padding }),
    ].join(" ")}
    {...rest}
  >
    {children}
  </div>
);

export { CardFooter };
