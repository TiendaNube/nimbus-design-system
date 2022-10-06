import React, { useRef, useState } from "react";
import {
  useFloating,
  useInteractions,
  useHover,
  FloatingPortal,
  arrow as arrowUI,
  offset,
  safePolygon,
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
    middleware: [offset(8), arrowUI({ element: arrowRef })],
    onOpenChange: setVisibility,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      handleClose: safePolygon({
        buffer: 1,
        restMs: 50,
      }),
    }),
  ]);

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
                color: appearance,
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
                className={popover.style.arrow[position]}
                style={{
                  position: "absolute",
                  left: arrowX != null ? `${arrowX}px` : "",
                  top: arrowY != null ? `${arrowY}px` : "",
                  [staticSide[position]]: "0px",
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
