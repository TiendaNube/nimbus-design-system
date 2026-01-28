import React from "react";
import { sidebar } from "@nimbus-ds/styles";

import { SidebarBodyProps } from "./sidebarBody.types";

const SidebarBody: React.FC<SidebarBodyProps> = ({
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
      className={[sidebar.classnames.container__body, className].join(" ")}
    >
      {children}
    </div>
  );
};

export { SidebarBody };
