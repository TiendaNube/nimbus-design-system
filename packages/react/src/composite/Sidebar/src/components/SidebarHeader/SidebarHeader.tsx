import React from "react";
import { Title } from "@nimbus-ds/title";
import { sidebar } from "@nimbus-ds/styles";

import { type SidebarHeaderProps } from "./sidebarHeader.types";

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  className,
  style: _style,
  title,
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
        sidebar.classnames.container__header,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {title && (
        <Title as="h2" data-testid="header-title">
          {title}
        </Title>
      )}
      {children}
    </div>
  );
};

export { SidebarHeader };
