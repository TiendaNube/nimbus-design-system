import React from "react";
import { sidebar } from "@nimbus-ds/styles";

import { type SidebarFooterProps } from "./sidebarFooter.types";

const SidebarFooter: React.FC<SidebarFooterProps> = ({
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
      className={[className, sidebar.classnames.container__footer].join(" ")}
    >
      {children}
    </div>
  );
};

export { SidebarFooter };
