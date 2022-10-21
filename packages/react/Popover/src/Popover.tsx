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
} from "@floating-ui/react-dom-interactions";
import { popover } from "@nimbus-ds/styles";

import { staticSide } from "./popover.definitions";
import { PopoverProps } from "./popover.types";

const Popover: React.FC<PopoverProps> = ({
  className: _className,
  style: _style,
  appearance = "light",
  position = "bottom",
  padding = "base",
  arrow = true,
  offset = 10,
  enabledHover = false,
  enabledDismiss = true,
  enabledClick = true,
  children,
  content,
  ...rest
}) => {
  const arrowRef = useRef(null);
  const [isVisible, setVisibility] = useState(false);
  const {
    x,
    y,
    context,
    strategy,
    reference,
    floating,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    open: isVisible,
    placement: position,
    strategy: "fixed",
    middleware: [offsetUI(offset), arrowUI({ element: arrowRef, padding: 5 })],
    whileElementsMounted: autoUpdate,
    onOpenChange: setVisibility,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      enabled: enabledHover,
      handleClose: safePolygon({
        buffer: 1,
        restMs: 50,
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
        ref={reference}
        {...getReferenceProps()}
      >
        {children}
      </div>
      <FloatingPortal id="nimbus-popover-floating">
        {isVisible && (
          <div
            {...rest}
            ref={floating}
            className={[
              popover.style.content,
              popover.sprinkle({
                backgroundColor: appearance,
                padding,
              }),
            ].join(" ")}
            style={{
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
                  popover.style.arrow[side],
                  popover.style.placement[position],
                  popover.sprinkle({
                    color: appearance,
                  }),
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
