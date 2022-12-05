import React from "react";
import { sidebar } from "@nimbus-ds/styles";

import { BodyProps } from "./body.types";

const Body: React.FC<BodyProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}) => {
  const { className, style, otherProps } = sidebar.sprinkle(
    rest as Parameters<typeof sidebar.sprinkle>[0]
  );

  return (
    <div
      {...otherProps}
      style={style}
      className={[sidebar.style.body, className].join(" ")}
    >
      {children}
    </div>
  );
};

export { Body };
