import React from "react";
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
} from "@floating-ui/react-dom-interactions";
import { CloseIcon } from "@tiendanube/icons";
import { Icon } from "@nimbus-ds/icon";
import { modal } from "@nimbus-ds/styles";

import { ModalProps, ModalComponents } from "./modal.types";
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
  ...rest
}: ModalProps) => {
  const { className, style, otherProps } = modal.sprinkle({
    ...(rest as Parameters<typeof modal.sprinkle>[0]),
    maxWidth,
    padding,
  });

  const { context } = useFloating({
    open,
    onOpenChange: onDismiss,
  });

  const click = useClick(context);
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });

  const { getFloatingProps } = useInteractions([click, role, dismiss]);

  const headingId = useId();
  const descriptionId = useId();

  return (
    <FloatingPortal id={portalId || "nimbus-modal-floating"}>
      {open && (
        <FloatingOverlay className={modal.classnames.overlay} lockScroll>
          <FloatingFocusManager context={context}>
            <div
              {...otherProps}
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
                  className={modal.classnames.close}
                  data-testid="dismiss-modal-button"
                  type="button"
                  onClick={() => onDismiss(!open)}
                  tabIndex={0}
                >
                  <Icon color="neutral.textLow" source={<CloseIcon />} />
                </button>
              )}
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
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
