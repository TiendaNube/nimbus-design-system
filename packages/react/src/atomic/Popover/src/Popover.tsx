import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  type RefObject,
} from "react";
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
import { popover, useTheme } from "@nimbus-ds/styles";

import { type PopoverProps } from "./popover.types";

/** Id of the container that holds the floating content inside a ThemeProvider. */
const PORTAL_ID = "nimbus-popover-floating";

/**
 * Returns the `#nimbus-popover-floating` container that is a direct child of the
 * ThemeProvider root, creating it when missing. Looking it up inside the root,
 * instead of with `document.getElementById`, keeps the content of each Popover
 * inside its own ThemeProvider when a page has several of them. The root is read
 * in an effect because the ThemeProvider ref is attached after its children
 * mount. Without a ThemeProvider root it keeps the previous global id lookup.
 */
const useThemePortalRoot = (
  refThemeProvider: RefObject<HTMLElement | null> | undefined,
) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const [hasThemeRoot, setHasThemeRoot] = useState(!!refThemeProvider);
  useEffect(() => {
    const themeRoot = refThemeProvider?.current;
    if (!themeRoot) {
      setHasThemeRoot(false);
      return;
    }
    let container = Array.from(themeRoot.children).find(
      (child): child is HTMLElement => child.id === PORTAL_ID,
    );
    if (!container) {
      container = document.createElement("div");
      container.id = PORTAL_ID;
      themeRoot.appendChild(container);
    }
    setHasThemeRoot(true);
    setPortalRoot(container);
  }, [refThemeProvider]);
  return hasThemeRoot ? { root: portalRoot } : { id: PORTAL_ID };
};

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
  const {
    className: classNameStyles,
    style,
    otherProps,
  } = popover.sprinkle({
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
  const portalProps = useThemePortalRoot(refThemeProvider);

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

  const popoverContent = (
    <div
      {...otherProps}
      ref={context.refs.setFloating}
      className={[className, popover.classnames.content, classNameStyles].join(
        " "
      )}
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
        {...portalProps}
      >
        {open && (
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
