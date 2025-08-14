import React from "react";
import { createPortal } from "react-dom";
import { RemoveScroll } from "react-remove-scroll";
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useFloating,
  useDismiss,
  useInteractions,
} from "@floating-ui/react";
import { sidebar, useTheme } from "@nimbus-ds/styles";

import { SidebarBody, SidebarFooter, SidebarHeader } from "./components";
import { SidebarComponents, SidebarProps } from "./sidebar.types";

const Sidebar: React.FC<SidebarProps> & SidebarComponents = ({
  className: _className,
  style: _style,
  position = "right",
  maxWidth = "375px",
  open = false,
  needRemoveScroll = false,
  children,
  onRemove,
  container,
  ...rest
}: SidebarProps) => {
  const { className, style, otherProps } = sidebar.sprinkle({
    ...(rest as Parameters<typeof sidebar.sprinkle>[0]),
    maxWidth,
  });

  const { refThemeProvider } = useTheme();

  const { context } = useFloating({
    open,
    onOpenChange: onRemove,
  });

  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });

  const { getFloatingProps } = useInteractions([dismiss]);

  if (!open) return null;

  const content = (
    <FloatingFocusManager context={context}>
      <div
        {...otherProps}
        ref={context.refs.setFloating}
        role={rest.role || "presentation"}
        style={style}
        {...getFloatingProps()}
        className={[
          container ? sidebar.classnames.containerScoped : sidebar.classnames.container,
          sidebar.classnames.position[position],
          className,
          open && sidebar.classnames.isVisible,
        ].join(" ")}
      >
        {needRemoveScroll ? <RemoveScroll>{children}</RemoveScroll> : children}
      </div>
    </FloatingFocusManager>
  );

  if (container) {
    return createPortal(
      <div className={sidebar.classnames.overlayScoped} data-testid="portal-overlay-sidebar-button">
        {content}
      </div>,
      container
    );
  }

  return (
    <FloatingPortal id="nimbus-sidebar" root={refThemeProvider?.current}>
      <FloatingOverlay
        className={sidebar.classnames.overlay}
        data-testid="overlay-sidebar-button"
        lockScroll={!needRemoveScroll}
      >
        {content}
      </FloatingOverlay>
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
