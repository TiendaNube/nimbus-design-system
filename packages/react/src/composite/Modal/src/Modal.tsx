import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  useFloating,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  useId,
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
} from "@floating-ui/react";
import { CloseIcon } from "@nimbus-ds/icons";
import { Icon } from "@nimbus-ds/icon";
import { modal, useTheme } from "@nimbus-ds/styles";

import {
  eventHasNodeWithAttribute,
  DEFAULT_OUTSIDE_PRESS_IGNORE_ATTRIBUTE,
} from "@common/event-handling";
import { type ModalProps, type ModalComponents } from "./modal.types";
import { ModalBody, ModalFooter, ModalHeader } from "./components";

const DEFAULT_PORTAL_ID = "nimbus-modal-floating";
const HOST_USERS = Symbol.for("nimbus-ds.portalHost.users");
const HOST_OWNED = Symbol.for("nimbus-ds.portalHost.owned");

type PortalHost = HTMLElement & {
  [HOST_USERS]?: number;
  [HOST_OWNED]?: boolean;
};

const Modal: React.FC<ModalProps> & ModalComponents = ({
  className,
  style: _style,
  children,
  padding = "base",
  maxWidth = { xs: "100%", md: "500px" },
  open,
  portalId,
  onDismiss,
  root,
  closeOnOutsidePress = true,
  ignoreAttributeName = DEFAULT_OUTSIDE_PRESS_IGNORE_ATTRIBUTE,
  renderDismissButton = true,
  zIndex = "base",
  ...rest
}: ModalProps) => {
  const {
    className: classNameStyles,
    style,
    otherProps,
  } = modal.sprinkle({
    ...(rest as Parameters<typeof modal.sprinkle>[0]),
    maxWidth,
    padding,
  });

  const { refThemeProvider } = useTheme();
  const [portalHost, setPortalHost] = useState<HTMLElement | null>(null);
  const portalHostId = portalId ?? DEFAULT_PORTAL_ID;

  const active = open && !root;

  useEffect(() => {
    if (!active) return undefined;

    // Resolve the identified host only among the direct children of this
    // component's own container (its nearest provider, or the body when there
    // is none), never by a global id lookup, so no other provider can capture it.
    const container: HTMLElement = refThemeProvider?.current ?? document.body;
    const existing = Array.from(container.children).find(
      (child): child is PortalHost => child.id === portalHostId
    );
    const host: PortalHost = existing ?? document.createElement("div");
    if (!existing) {
      host.id = portalHostId;
      host[HOST_OWNED] = true;
      container.appendChild(host);
    }
    host[HOST_USERS] = (host[HOST_USERS] ?? 0) + 1;
    setPortalHost(host);

    return () => {
      host[HOST_USERS] = (host[HOST_USERS] ?? 1) - 1;
      if (host[HOST_USERS] === 0 && host[HOST_OWNED]) host.remove();
      setPortalHost(null);
    };
  }, [active, refThemeProvider, portalHostId]);

  const { context } = useFloating({
    open,
    onOpenChange: onDismiss,
  });

  const click = useClick(context);
  const role = useRole(context);

  const outsidePressFn = React.useMemo<
    ((event: PointerEvent | MouseEvent) => boolean) | boolean
  >(() => {
    if (!onDismiss) return false;
    if (typeof closeOnOutsidePress === "function") {
      return (event: PointerEvent | MouseEvent) => {
        const allowClose = closeOnOutsidePress(event);
        if (!allowClose) return false;
        if (eventHasNodeWithAttribute(event, ignoreAttributeName)) return false;
        return true;
      };
    }
    if (closeOnOutsidePress) {
      return (event: PointerEvent | MouseEvent) =>
        !eventHasNodeWithAttribute(event, ignoreAttributeName);
    }
    return false;
  }, [closeOnOutsidePress, ignoreAttributeName, onDismiss]);

  const dismiss = useDismiss(context, {
    outsidePressEvent: onDismiss ? "mousedown" : undefined,
    outsidePress: outsidePressFn,
  });

  const { getFloatingProps } = useInteractions([click, role, dismiss]);

  const headingId = useId();
  const descriptionId = useId();

  if (!open) return null;

  const content = (
    <FloatingFocusManager context={context}>
      <div
        {...otherProps}
        ref={context.refs.setFloating}
        style={style}
        className={[
          className,
          modal.classnames.container,
          modal.classnames.containerZIndex[zIndex],
          classNameStyles,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-labelledby={headingId}
        aria-describedby={descriptionId}
        {...getFloatingProps()}
        {...rest}
      >
        {children}
        {onDismiss && renderDismissButton && (
          <button
            aria-label="Dismiss modal"
            className={modal.classnames.container__close}
            data-testid="dismiss-modal-button"
            type="button"
            onClick={() => onDismiss(!open)}
            tabIndex={0}
          >
            <Icon color="neutral-textLow" source={<CloseIcon />} />
          </button>
        )}
      </div>
    </FloatingFocusManager>
  );

  if (root) {
    return createPortal(
      <div
        className={[
          modal.classnames.overlayScoped,
          modal.classnames.overlayScopedZIndex[zIndex],
        ].join(" ")}
      >
        {content}
      </div>,
      root
    );
  }

  return (
    <FloatingPortal root={portalHost}>
      <FloatingOverlay
        className={[
          modal.classnames.overlay,
          modal.classnames.overlayZIndex[zIndex],
        ].join(" ")}
        lockScroll
      >
        {content}
      </FloatingOverlay>
    </FloatingPortal>
  );
};

Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Header = ModalHeader;
Modal.displayName = "Modal";
Modal.Body.displayName = "Modal.Body";
Modal.Footer.displayName = "Modal.Footer";
Modal.Header.displayName = "Modal.Header";

export { Modal };
