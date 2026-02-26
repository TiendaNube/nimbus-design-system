import React from "react";
import { sidebar } from "@nimbus-ds/styles";

import { type SidebarBodyProps } from "./sidebarBody.types";

const SidebarBody: React.FC<SidebarBodyProps> = ({
  className,
  style: _style,
  children,
  ...rest
}) => {
  const {
    className: classNameStyles,
    style,
    otherProps,
  } = sidebar.sprinkle(rest as Parameters<typeof sidebar.sprinkle>[0]);

  return (
    <div
      {...otherProps}
      style={style}
      className={[
        className,
        sidebar.classnames.container__body,
        classNameStyles,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
};

export { SidebarBody };
