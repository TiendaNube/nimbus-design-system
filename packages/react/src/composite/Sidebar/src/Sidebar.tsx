import React from "react";
import { FloatingPortal } from "@floating-ui/react-dom-interactions";
import { sidebar } from "@nimbus-ds/styles";

import { SidebarBody, SidebarFooter, SidebarHeader } from "./components";
import { SidebarComponents, SidebarProps } from "./sidebar.types";

const Sidebar: React.FC<SidebarProps> & SidebarComponents = ({
  className: _className,
  style: _style,
  title,
  position = "right",
  maxWidth = "375px",
  open = false,
  children,
  onRemove,
  ...rest
}: SidebarProps) => {
  const { className, style, otherProps } = sidebar.sprinkle({
    ...(rest as Parameters<typeof sidebar.sprinkle>[0]),
    maxWidth,
  });

  return (
    <FloatingPortal id="nimbus-sidebar">
      <div
        {...otherProps}
        role={rest.role || "presentation"}
        style={style}
        className={[
          sidebar.style.container,
          sidebar.style.positions[position],
          className,
          open && sidebar.style.isVisible,
        ].join(" ")}
      >
        {children}
      </div>
      {open && (
        <button
          aria-label="overlay"
          data-testid="overlay-sidebar-button"
          type="button"
          className={sidebar.style.overlay}
          onClick={onRemove}
        />
      )}
    </FloatingPortal>
  );
};

Sidebar.Body = SidebarBody;
Sidebar.Footer = SidebarFooter;
Sidebar.Header = SidebarHeader;
Sidebar.displayName = "Sidebar";
Sidebar.Body.displayName = "Sidebar.Body";
Sidebar.Footer.displayName = "Sidebar.Footer";
Sidebar.Header.displayName = "Sidebar.Header";

export { Sidebar };
