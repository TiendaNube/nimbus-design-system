import React from "react";
import { card } from "@nimbus-ds/styles";

import { type CardFooterProps } from "./cardFooter.types";

const CardFooter: React.FC<CardFooterProps> = ({
  className,
  style: _style,
  padding = "none",
  children,
  ...rest
}) => (
  <div
    className={[
      className,
      card.classnames.container__footer,
      card.subComponents.footer.sprinkle({ padding }),
    ]
      .filter(Boolean)
      .join(" ")}
    {...rest}
  >
    {children}
  </div>
);

export { CardFooter };
