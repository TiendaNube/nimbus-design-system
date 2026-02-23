import React, { useMemo } from "react";
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
import {
  eventHasNodeWithAttribute,
  DEFAULT_OUTSIDE_PRESS_IGNORE_ATTRIBUTE,
} from "@common/event-handling";

import { SidebarBody, SidebarFooter, SidebarHeader } from "./components";
import { type SidebarComponents, type SidebarProps } from "./sidebar.types";

const Sidebar: React.FC<SidebarProps> & SidebarComponents = ({
  className,
  style: _style,
  position = "right",
  maxWidth = "375px",
  open = false,
  needRemoveScroll = false,
  closeOnOutsidePress = true,
  children,
  onRemove,
  root,
  ignoreAttributeName = DEFAULT_OUTSIDE_PRESS_IGNORE_ATTRIBUTE,
  ...rest
}: SidebarProps) => {
  const {
    className: classNameStyles,
    style,
    otherProps,
  } = sidebar.sprinkle({
    ...(rest as Parameters<typeof sidebar.sprinkle>[0]),
    maxWidth,
  });

  const { refThemeProvider } = useTheme();

  const { context } = useFloating({
    open,
    onOpenChange: onRemove,
  });

  const isIgnored = React.useCallback(
    (event: PointerEvent | MouseEvent): boolean =>
      eventHasNodeWithAttribute(event, ignoreAttributeName),
    [ignoreAttributeName]
  );

  const outsidePressFn = useMemo<
    ((event: PointerEvent | MouseEvent) => boolean) | boolean
  >(() => {
    if (typeof closeOnOutsidePress === "function") {
      return (event: PointerEvent | MouseEvent) => {
        const allowClose = closeOnOutsidePress(event);
        if (!allowClose) return false;
        if (isIgnored(event)) return false;
        return true;
      };
    }
    if (closeOnOutsidePress) {
      return (event: PointerEvent | MouseEvent) => !isIgnored(event);
    }
    return false;
  }, [closeOnOutsidePress, isIgnored]);

  const dismiss = useDismiss(context, {
    outsidePressEvent: "mousedown",
    outsidePress: outsidePressFn,
  });

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
          className,
          root
            ? sidebar.classnames.containerScoped
            : sidebar.classnames.container,
          sidebar.classnames.position[position],
          classNameStyles,
          open && sidebar.classnames.isVisible,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {needRemoveScroll ? <RemoveScroll>{children}</RemoveScroll> : children}
      </div>
    </FloatingFocusManager>
  );

  if (root) {
    return createPortal(
      <>
        <div
          className={sidebar.classnames.overlayScoped}
          data-testid="portal-overlay-sidebar-button"
          role="presentation"
          aria-hidden="true"
        />
        {content}
      </>,
      root
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
