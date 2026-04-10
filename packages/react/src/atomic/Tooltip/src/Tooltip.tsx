import React, { useRef, useState } from "react";
import {
  useFloating,
  useInteractions,
  useHover,
  useTransitionStyles,
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

// out.quint — cubic-bezier(0.23, 1, 0.32, 1)
const EASING = "cubic-bezier(0.23, 1, 0.32, 1)";

const SIDE_ORIGINS: Record<string, string> = {
  top: "bottom center",
  bottom: "top center",
  left: "right center",
  right: "left center",
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

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: { open: 180, close: 120 },
    initial: { opacity: 0, transform: "scale(0.97)" },
    common: ({ side }) => ({
      transformOrigin: SIDE_ORIGINS[side] ?? "center",
    }),
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
      <FloatingPortal
        id="nimbus-tooltip-floating"
        root={refThemeProvider?.current}
      >
        {isMounted && (
          <div
            ref={context.refs.setFloating}
            style={{
              ...floatingStyles,
              position: strategy,
            }}
            {...getFloatingProps()}
          >
            <div
              {...rest}
              {...otherProps}
              data-side={context.placement.split("-")[0]}
              className={[
                className,
                tooltip.classnames.content,
                classNameStyles,
              ].join(" ")}
              style={{
                ...style,
                ...transitionStyles,
                transition: `opacity ${context.open ? "180ms" : "120ms"} ${EASING}, transform ${context.open ? "180ms" : "120ms"} ${EASING}`,
              }}
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
          </div>
        )}
      </FloatingPortal>
    </>
  );
};

Tooltip.displayName = "Tooltip";
export { Tooltip };
