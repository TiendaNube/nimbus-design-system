import React from "react";
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useFloating,
  useDismiss,
  useInteractions,
} from "@floating-ui/react";
import { sidebar } from "@nimbus-ds/styles";

import { SidebarBody, SidebarFooter, SidebarHeader } from "./components";
import { SidebarComponents, SidebarProps } from "./sidebar.types";

const Sidebar: React.FC<SidebarProps> & SidebarComponents = ({
  className: _className,
  style: _style,
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

  const { context } = useFloating({
    open,
    onOpenChange: onRemove,
  });

  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });

  const { getFloatingProps } = useInteractions([dismiss]);

  if (!open) return null;

  return (
    <FloatingPortal id="nimbus-sidebar">
      <FloatingOverlay
        className={sidebar.classnames.overlay}
        lockScroll
        data-testid="overlay-sidebar-button"
      >
        <FloatingFocusManager context={context}>
          <div
            {...otherProps}
            ref={context.refs.setFloating}
            role={rest.role || "presentation"}
            style={style}
            {...getFloatingProps()}
            className={[
              sidebar.classnames.container,
              sidebar.classnames.position[position],
              className,
              open && sidebar.classnames.isVisible,
            ].join(" ")}
          >
            {children}
          </div>
        </FloatingFocusManager>
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
