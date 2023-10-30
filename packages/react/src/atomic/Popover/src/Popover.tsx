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
  flip,
  shift,
  size,
  safePolygon,
  arrow as arrowUI,
  offset as offsetUI,
} from "@floating-ui/react";
import { popover } from "@nimbus-ds/styles";

import { PopoverProps } from "./popover.types";

const Popover: React.FC<PopoverProps> = ({
  className: _className,
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
  children,
  content,
  ...rest
}) => {
  const { className, style, otherProps } = popover.sprinkle({
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

  const { context, floatingStyles } = useFloating({
    open,
    placement: position,
    strategy: "fixed",
    middleware: middlewares,
    whileElementsMounted: autoUpdate,
    onOpenChange: onVisibility !== undefined ? onVisibility : setVisibility,
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
    }),
  ]);

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
      <FloatingPortal id="nimbus-popover-floating">
        {open && (
          <div
            {...otherProps}
            ref={context.refs.setFloating}
            className={[popover.classnames.content, className].join(" ")}
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
              />
            )}
          </div>
        )}
      </FloatingPortal>
    </>
  );
};

Popover.displayName = "Popover";
export { Popover };
