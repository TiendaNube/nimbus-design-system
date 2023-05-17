import React, { useRef, useState, useMemo } from "react";
import {
  Side,
  FloatingPortal,
  autoUpdate,
  useFloating,
  useInteractions,
  useHover,
  useDismiss,
  useClick,
  safePolygon,
  arrow as arrowUI,
  offset as offsetUI,
} from "@floating-ui/react";
import { popover } from "@nimbus-ds/styles";

import { staticSide } from "./popover.definitions";
import { PopoverProps } from "./popover.types";

const Popover: React.FC<PopoverProps> = ({
  className: _className,
  style: _style,
  visible,
  onVisibility,
  backgroundColor = "neutral-background",
  position = "bottom",
  padding = "base",
  width = "17.5rem",
  arrow = true,
  offset = 10,
  enabledHover = false,
  enabledDismiss = true,
  enabledClick = true,
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

  const open = useMemo(
    () => (visible === undefined ? isVisible : visible),
    [visible, isVisible]
  );

  const {
    x,
    y,
    context,
    strategy,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    open,
    placement: position,
    strategy: "fixed",
    middleware: [offsetUI(offset), arrowUI({ element: arrowRef, padding: 5 })],
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

  const side = useMemo(() => position.split("-")[0], [position]) as Side;

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
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            {...getFloatingProps()}
          >
            {content}
            {arrow && (
              <div
                data-testid="arrow-element"
                ref={arrowRef}
                className={[
                  popover.classnames.content__arrow[side],
                  popover.classnames.content__placement[position],
                ].join(" ")}
                style={{
                  position: "absolute",
                  left: arrowX != null ? `${arrowX}px` : "",
                  top: arrowY != null ? `${arrowY}px` : "",
                  [staticSide[side]]: "0px",
                }}
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
