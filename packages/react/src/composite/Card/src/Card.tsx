import React from "react";
import { card } from "@nimbus-ds/styles";

import { type CardProps, type CardComponents } from "./card.types";
import { CardBody, CardFooter, CardHeader } from "./components";

const Card: React.FC<CardProps> & CardComponents = ({
  className: _className,
  style: _style,
  children,
  padding = "base",
  backgroundColor = "neutral-background",
  ...rest
}: CardProps) => (
  <div
    className={[
      card.classnames.container,
      card.sprinkle({ padding, backgroundColor }),
    ].join(" ")}
    {...rest}
  >
    {children}
  </div>
);

Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Header = CardHeader;
Card.displayName = "Card";
Card.Body.displayName = "Card.Body";
Card.Footer.displayName = "Card.Footer";
Card.Header.displayName = "Card.Header";

export { Card };
