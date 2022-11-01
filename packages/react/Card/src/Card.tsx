import React from "react";
import { card } from "@nimbus-ds/styles";

import { CardProps, CardComponents } from "./card.types";
import { Skeleton, Header } from "./components";

const Card: React.FC<CardProps> & CardComponents = ({
  className: _className,
  style: _style,
  children,
  padding = "base",
  backgroundColor = "neutral.background",
  ...rest
}: CardProps) => (
  <div
    className={[
      card.style.container,
      card.sprinkle({ padding, backgroundColor }),
    ].join(" ")}
    {...rest}
  >
    {children}
  </div>
);

Card.Header = Header;
Card.Skeleton = Skeleton;
Card.displayName = "Card";
Card.Header.displayName = "Card.Header";
Card.Skeleton.displayName = "Card.Skeleton";

export { Card };
