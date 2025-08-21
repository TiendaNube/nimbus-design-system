import React from "react";
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

import { ModalProps, ModalComponents } from "./modal.types";
import { eventHasNodeWithAttribute } from "@common/event-handling";
import { ModalBody, ModalFooter, ModalHeader } from "./components";

const Modal: React.FC<ModalProps> & ModalComponents = ({
  className: _className,
  style: _style,
  children,
  padding = "base",
  maxWidth = { xs: "100%", md: "500px" },
  open,
  portalId,
  onDismiss,
  container,
  closeOnOutsidePress = true,
  ignoreAttributeName = "data-nimbus-outside-press-ignore",
  ...rest
}: ModalProps) => {
  const { className, style, otherProps } = modal.sprinkle({
    ...(rest as Parameters<typeof modal.sprinkle>[0]),
    maxWidth,
    padding,
  });

  const { refThemeProvider } = useTheme();

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
        className={container ? modal.classnames.frameScoped : modal.classnames.frame}
        aria-hidden
      >
        <div
          {...otherProps}
          ref={context.refs.setFloating}
          style={style}
          className={[modal.classnames.container, className].join(" ")}
          aria-labelledby={headingId}
          aria-describedby={descriptionId}
          {...getFloatingProps()}
          {...rest}
        >
          {children}
          {onDismiss && (
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
      </div>
    </FloatingFocusManager>
  );

  if (container) {
    return createPortal(
      <>
        <div className={modal.classnames.overlayScoped} />
        {content}
      </>,
      container
    );
  }

  return (
    <FloatingPortal id={portalId ?? "nimbus-modal-floating"} root={refThemeProvider?.current}>
      <FloatingOverlay className={modal.classnames.overlay} lockScroll />
      {content}
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
