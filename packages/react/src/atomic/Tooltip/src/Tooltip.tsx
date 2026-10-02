import React, { useEffect, useRef, useState } from "react";
import {
  useFloating,
  useInteractions,
  useHover,
  FloatingPortal,
  FloatingArrow,
  arrow as arrowUI,
  offset,
  safePolygon,
  shift,
  autoUpdate,
  flip,
} from "@floating-ui/react";
import { tooltip, useTheme } from "@nimbus-ds/styles";
import { Text } from "@nimbus-ds/text";
import { Box } from "@nimbus-ds/box";
import { type TooltipProps } from "./tooltip.types";

const PORTAL_ID = "nimbus-tooltip-floating";
const HOST_USERS = Symbol.for("nimbus-ds.portalHost.users");
const HOST_OWNED = Symbol.for("nimbus-ds.portalHost.owned");

type PortalHost = HTMLElement & {
  [HOST_USERS]?: number;
  [HOST_OWNED]?: boolean;
};

const Tooltip: React.FC<TooltipProps> = ({
  className,
  style: _style,
  children,
  content,
  maxWidth,
  arrow = false,
  position = "bottom",
  ...rest
}) => {
  const arrowRef = useRef(null);
  const [isVisible, setVisibility] = useState(false);
  const { refThemeProvider } = useTheme();
  const [portalHost, setPortalHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!isVisible) return undefined;

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
  }, [isVisible, refThemeProvider]);

  const { context, strategy, floatingStyles } = useFloating({
    open: isVisible,
    placement: position,
    strategy: "fixed",
    middleware: [
      offset(6),
      shift(),
      flip({
        crossAxis: position.includes("-"),
        fallbackAxisSideDirection: "end",
        padding: 5,
      }),
      arrowUI({
        element: arrowRef,
      }),
      shift(),
    ],
    onOpenChange: setVisibility,
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      restMs: 50,
      delay: {
        close: 100,
      },
      handleClose: safePolygon({
        buffer: 1,
      }),
    }),
  ]);

  const {
    className: classNameStyles,
    style,
    otherProps,
  } = tooltip.sprinkle({
    ...(rest as Parameters<typeof tooltip.sprinkle>[0]),
    maxWidth,
  });

  return (
    <>
      <div
        data-testid="tooltip-container"
        ref={context.refs.setReference}
        className={tooltip.classnames.container}
        {...getReferenceProps()}
      >
        {children}
      </div>
      <FloatingPortal root={portalHost}>
        {isVisible && (
          <div
            {...rest}
            {...otherProps}
            ref={context.refs.setFloating}
            className={[
              className,
              tooltip.classnames.content,
              classNameStyles,
            ].join(" ")}
            style={{
              ...style,
              ...floatingStyles,
              position: strategy,
            }}
            {...getFloatingProps()}
          >
            <Text
              color="neutral-background"
              fontSize="caption"
              lineHeight="caption"
            >
              {content}
            </Text>
            {arrow && (
              <Box
                as={FloatingArrow}
                data-testid="arrow-element"
                ref={arrowRef}
                context={context}
                color="neutral-textHigh"
                fill="currentColor"
              />
            )}
          </div>
        )}
      </FloatingPortal>
    </>
  );
};

Tooltip.displayName = "Tooltip";
export { Tooltip };
