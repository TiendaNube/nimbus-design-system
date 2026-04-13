import React, { useRef, useState, useMemo } from "react";
import {
  FloatingPortal,
  FloatingArrow,
  autoUpdate,
  useFloating,
  useInteractions,
  useHover,
  useDismiss,
  useClick,
  useTransitionStyles,
  flip,
  shift,
  size,
  safePolygon,
  arrow as arrowUI,
  offset as offsetUI,
} from "@floating-ui/react";
import { popover, useTheme } from "@nimbus-ds/styles";

import { FLOATING_EASING, FLOATING_SIDE_ORIGINS } from "../../shared/floatingMotion";
import { type PopoverProps } from "./popover.types";

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
  type SprinkleParams = Parameters<typeof popover.sprinkle>[0];

  const {
    className: classNameStyles,
    style,
    otherProps,
  } = popover.sprinkle({
    ...(rest as SprinkleParams),
    width,
    padding: padding as SprinkleParams["padding"],
    backgroundColor: backgroundColor as SprinkleParams["backgroundColor"],
    color: backgroundColor as SprinkleParams["color"],
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

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: { open: 180, close: 120 },
    initial: { opacity: 0, transform: "scale(0.96)" },
    common: ({ side }) => ({
      transformOrigin: FLOATING_SIDE_ORIGINS[side] ?? "center",
    }),
  });

  const dur = context.open ? "180ms" : "120ms";

  const {
    opacity,
    transform: contentTransform,
    transformOrigin: contentOrigin,
  } = transitionStyles as {
    opacity?: number;
    transform?: string;
    transformOrigin?: string;
  };

  const popoverContent = (
    <div
      ref={context.refs.setFloating}
      {...otherProps}
      data-side={context.placement.split("-")[0]}
      className={[className, popover.classnames.content, classNameStyles].join(
        " "
      )}
      style={{
        ...floatingStyles,
        ...style,
        opacity,
        transition: `opacity ${dur} ${FLOATING_EASING}`,
      }}
      {...getFloatingProps()}
    >
      <div
        style={{
          transform: contentTransform,
          transformOrigin: contentOrigin,
          transition: `transform ${dur} ${FLOATING_EASING}`,
        }}
      >
        {content}
      </div>
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
      <FloatingPortal
        id="nimbus-popover-floating"
        root={refThemeProvider?.current}
      >
        {isMounted && (
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
