import React, { useRef, useState } from "react";
import {
  useFloating,
  useInteractions,
  useHover,
  FloatingPortal,
  arrow,
  offset,
  safePolygon,
} from "@floating-ui/react-dom-interactions";
import { tooltip } from "@nimbus-ds/styles";
import { Text } from "@nimbus-ds/text";

import { staticSide } from "./toast.definitions";
import { TooltipProps } from "./tooltip.types";

const Tooltip: React.FC<TooltipProps> = ({
  className: _className,
  style: _style,
  children,
  content,
  position = "bottom",
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
    middleware: [offset(6), arrow({ element: arrowRef })],
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
        data-testid="tooltip-container"
        ref={reference}
        className={tooltip.style.container}
        {...getReferenceProps()}
      >
        {children}
      </div>
      <FloatingPortal id="nimbus-tooltip-floating">
        {isVisible && (
          <div
            {...rest}
            ref={floating}
            className={tooltip.style.content}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            {...getFloatingProps()}
          >
            <Text
              color="neutral.background"
              fontSize="caption"
              lineHeight="caption"
            >
              {content}
            </Text>
            <div
              data-testid="arrow-element"
              ref={arrowRef}
              className={tooltip.style.arrow[position]}
              style={{
                position: "absolute",
                left: arrowX != null ? `${arrowX}px` : "",
                top: arrowY != null ? `${arrowY}px` : "",
                [staticSide[position]]: "0px",
              }}
            />
          </div>
        )}
      </FloatingPortal>
    </>
  );
};

Tooltip.displayName = "Tooltip";
export { Tooltip };
