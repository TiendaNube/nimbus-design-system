import React, { useRef, useState } from "react";
import {
  useFloating,
  useInteractions,
  useHover,
  FloatingPortal,
  arrow,
  offset,
  safePolygon,
} from "@floating-ui/react";
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
      restMs: 50,
      delay: {
        close: 100,
      },
      handleClose: safePolygon({
        buffer: 1,
      }),
    }),
  ]);

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
      <FloatingPortal id="nimbus-tooltip-floating">
        {isVisible && (
          <div
            {...rest}
            ref={context.refs.setFloating}
            className={tooltip.classnames.content}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
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
            <div
              data-testid="arrow-element"
              ref={arrowRef}
              className={tooltip.classnames.content__arrow[position]}
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
