import React from "react";
import { FloatingPortal } from "@floating-ui/react-dom-interactions";
import { sidebar } from "@nimbus-ds/styles";

import { Body, Footer, Header } from "./components";
import { SidebarComponents, SidebarProps } from "./sidebar.types";

const Sidebar: React.FC<SidebarProps> & SidebarComponents = ({
  className: _className,
  style: _style,
  title,
  position = "right",
  padding = "none",
  open = false,
  children,
  onRemove,
  ...rest
}: SidebarProps) => (
  <FloatingPortal id="nimbus-sidebar">
    <div
      {...rest}
      role={rest.role || "presentation"}
      className={[
        sidebar.style.container,
        sidebar.style.positions[position],
        sidebar.sprinkle({ padding }),
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

Sidebar.Body = Body;
Sidebar.Footer = Footer;
Sidebar.Header = Header;
Sidebar.displayName = "Sidebar";
Sidebar.Body.displayName = "Sidebar.Body";
Sidebar.Footer.displayName = "Sidebar.Footer";
Sidebar.Header.displayName = "Sidebar.Header";

export { Sidebar };
