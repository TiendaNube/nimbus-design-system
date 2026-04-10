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
import { FLOATING_EASING, FLOATING_SIDE_ORIGINS } from "../../shared/floatingMotion";
import { type TooltipProps } from "./tooltip.types";

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
  const { context, floatingStyles } = useFloating({
    open: isVisible,
    placement: position,
    strategy: "fixed",
    middleware: [
      offset(6),
      arrowUI({
        element: arrowRef,
      }),
      flip({
        crossAxis: position.includes("-"),
        fallbackAxisSideDirection: "end",
        padding: 5,
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
      transformOrigin: FLOATING_SIDE_ORIGINS[side] ?? "center",
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
            {...rest}
            {...otherProps}
            data-side={context.placement.split("-")[0]}
            className={[
              className,
              tooltip.classnames.content,
              classNameStyles,
            ].join(" ")}
            style={{
              ...floatingStyles,
              ...style,
            }}
            {...getFloatingProps()}
          >
            <div
              style={{
                ...transitionStyles,
                transition: `opacity ${context.open ? "180ms" : "120ms"} ${FLOATING_EASING}, transform ${context.open ? "180ms" : "120ms"} ${FLOATING_EASING}`,
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
