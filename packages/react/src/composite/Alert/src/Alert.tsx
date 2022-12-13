import React from "react";
import { alert } from "@nimbus-ds/styles";

import { CloseIcon } from "@tiendanube/icons";

import { Title } from "@nimbus-ds/title";
import { Icon } from "@nimbus-ds/icon";

import { AlertSkeleton } from "./components";
import { AlertProps, AlertComponents } from "./alert.types";
import { alertVariants } from "./alert.definitions";

const Alert: React.FC<AlertProps> & AlertComponents = ({
  className: _className,
  style: _style,
  title,
  appearance = "neutral",
  children,
  onRemove,
  show = true,
  ...rest
}: AlertProps) => {
  const AlertIcon = alertVariants[appearance].icon;

  if (!show) {
    return null;
  }

  return (
    <div
      {...rest}
      aria-live="polite"
      role={alertVariants[appearance].role}
      className={alert.style.appearance[appearance]}
    >
      <Icon color={`${appearance}.textLow`} source={<AlertIcon />} />
      <div className={alert.style.body}>
        {title && (
          <Title as="h6" color={`${appearance}.textLow`}>
            {title}
          </Title>
        )}
        <div className={alert.style.content}>{children}</div>
      </div>
      {onRemove && (
        <button
          aria-label="Dismiss alert"
          className={alert.style.closeAppearance[appearance]}
          data-testid="dismiss-alert-button"
          type="button"
          onClick={onRemove}
          tabIndex={0}
        >
          <Icon color={`${appearance}.textLow`} source={<CloseIcon />} />
        </button>
      )}
    </div>
  );
};

Alert.Skeleton = AlertSkeleton;
Alert.displayName = "Alert";

export { Alert };
