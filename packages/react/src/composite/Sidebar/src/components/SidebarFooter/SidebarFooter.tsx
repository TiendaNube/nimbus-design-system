import React from "react";
import { sidebar } from "@nimbus-ds/styles";

import { type SidebarFooterProps } from "./sidebarFooter.types";

const SidebarFooter: React.FC<SidebarFooterProps> = ({
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
        classNameStyles,
        sidebar.classnames.container__footer,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
};

export { SidebarFooter };
