import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  FloatingPortal,
  FloatingArrow,
  autoUpdate,
  useFloating,
  useInteractions,
  useHover,
  useDismiss,
  useClick,
  flip,
  shift,
  size,
  safePolygon,
  arrow as arrowUI,
  offset as offsetUI,
} from "@floating-ui/react";
import { popover, useTheme } from "@nimbus-ds/styles";

import { type PopoverProps } from "./popover.types";

const PORTAL_ID = "nimbus-popover-floating";
const HOST_USERS = Symbol.for("nimbus-ds.portalHost.users");
const HOST_OWNED = Symbol.for("nimbus-ds.portalHost.owned");

type PortalHost = HTMLElement & {
  [HOST_USERS]?: number;
  [HOST_OWNED]?: boolean;
};

const Popover: React.FC<PopoverProps> = ({
  className,
  style: _style,
  visible,
  onVisibility,
  backgroundColor = "neutral-background",
  position = "bottom",
  padding = "base",
  width = "fit-content",
  arrow = true,
  offset = 10,
  enabledHover = false,
  enabledDismiss = true,
  enabledClick = true,
  matchReferenceWidth = false,
  renderOverlay = false,
  children,
  content,
  ...rest
}) => {
  const {
    className: classNameStyles,
    style,
    otherProps,
  } = popover.sprinkle({
    ...(rest as Parameters<typeof popover.sprinkle>[0]),
    width,
    padding: padding as any,
    backgroundColor: backgroundColor as any,
    color: backgroundColor as any,
  });

  const arrowRef = useRef(null);
  const [isVisible, setVisibility] = useState(false);

  const open: boolean = useMemo(
    () => (visible === undefined ? isVisible : visible),
    [visible, isVisible]
  );

  const handleVisibility = (visibility: boolean) => {
    setVisibility(visibility);
    onVisibility?.(visibility);
  };

  const middlewares = [
    offsetUI(offset),
    arrowUI({
      element: arrowRef,
    }),
    shift(),
    flip({
      crossAxis: position.includes("-"),
      fallbackAxisSideDirection: "end",
      padding: 5,
    }),
    matchReferenceWidth &&
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
  ].filter((middleware) => middleware !== false);

  const { refThemeProvider } = useTheme();
  const [portalHost, setPortalHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return undefined;

    // Resolve the identified host only among the direct children of this
    // component's own container (its nearest provider, or the body when there
    // is none), never by a global id lookup, so no other provider can capture it.
    const container: HTMLElement = refThemeProvider?.current ?? document.body;
    const existing = Array.from(container.children).find(
      (child): child is PortalHost => child.id === PORTAL_ID
    );
    const host: PortalHost = existing ?? document.createElement("div");
    if (!existing) {
      host.id = PORTAL_ID;
      host[HOST_OWNED] = true;
      container.appendChild(host);
    }
    host[HOST_USERS] = (host[HOST_USERS] ?? 0) + 1;
    setPortalHost(host);

    return () => {
      host[HOST_USERS] = (host[HOST_USERS] ?? 1) - 1;
      if (host[HOST_USERS] === 0 && host[HOST_OWNED]) host.remove();
      setPortalHost(null);
    };
  }, [open, refThemeProvider]);

  const { context, floatingStyles } = useFloating({
    open,
    placement: position,
    strategy: "fixed",
    middleware: middlewares,
    whileElementsMounted: autoUpdate,
    onOpenChange: handleVisibility,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      enabled: enabledHover,
      restMs: 50,
      delay: {
        close: 100,
      },
      handleClose: safePolygon({
        buffer: 1,
      }),
    }),
    useClick(context, {
      enabled: enabledClick,
    }),
    useDismiss(context, {
      enabled: enabledDismiss,
      outsidePressEvent: renderOverlay ? "mousedown" : undefined,
    }),
  ]);

  const popoverContent = (
    <div
      {...otherProps}
      ref={context.refs.setFloating}
      className={[className, popover.classnames.content, classNameStyles].join(
        " "
      )}
      style={{
        ...style,
        ...floatingStyles,
      }}
      {...getFloatingProps()}
    >
      {content}
      {arrow && (
        <FloatingArrow
          data-testid="arrow-element"
          ref={arrowRef}
          context={context}
          fill="currentColor"
          tipRadius={3}
        />
      )}
    </div>
  );

  return (
    <>
      <div
        data-testid="popover-container"
        ref={context.refs.setReference}
        {...getReferenceProps()}
      >
        {typeof children === "function"
          ? children({
              open,
              setVisibility,
            })
          : children}
      </div>
      <FloatingPortal root={portalHost}>
        {open && (
          <>
            {renderOverlay && (
              <div
                className={popover.classnames.overlay}
                data-testid="popover-overlay"
              />
            )}
            {popoverContent}
          </>
        )}
      </FloatingPortal>
    </>
  );
};

Popover.displayName = "Popover";
export { Popover };
