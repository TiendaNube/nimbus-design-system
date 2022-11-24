import React from "react";
import { sidebar } from "@nimbus-ds/styles";

import { FooterProps } from "./footer.types";

const Footer: React.FC<FooterProps> = ({
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
      className={[className, sidebar.style.footer].join(" ")}
    >
      {children}
    </div>
  );
};

export { Footer };
