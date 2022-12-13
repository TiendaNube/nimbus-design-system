import React from "react";
import { Title } from "@nimbus-ds/title";
import { sidebar } from "@nimbus-ds/styles";

import { SidebarHeaderProps } from "./sidebarHeader.types";

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  className: _className,
  style: _style,
  title,
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
      className={[className, sidebar.style.header].join(" ")}
    >
      {title && <Title data-testid="header-title">{title}</Title>}
      {children}
    </div>
  );
};

export { SidebarHeader };
