import React, { useRef, useState } from "react";
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
import { tooltip } from "@nimbus-ds/styles";
import { Text } from "@nimbus-ds/text";
import { Box } from "@nimbus-ds/box";
import { useThemePortalRoot } from "@common/hooks";
import { type TooltipProps } from "./tooltip.types";

const PORTAL_ID = "nimbus-tooltip-floating";

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
  const portalRoot = useThemePortalRoot(PORTAL_ID, isVisible);
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
      {portalRoot && (
        <FloatingPortal key={PORTAL_ID} root={portalRoot}>
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
      )}
    </>
  );
};

Tooltip.displayName = "Tooltip";
export { Tooltip };
