import React from "react";
import { alert } from "@nimbus-ds/styles";
import { CloseIcon } from "@nimbus-ds/icons";
import { Title } from "@nimbus-ds/title";
import { Icon } from "@nimbus-ds/icon";

import { AlertSkeleton } from "./components";
import { type AlertProps, type AlertComponents } from "./alert.types";
import { alertVariants } from "./alert.definitions";

const Alert: React.FC<AlertProps> & AlertComponents = ({
  className,
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
      className={[className, alert.classnames.appearance[appearance]]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={alert.classnames.container}>
        <Icon color={`${appearance}-textLow`} source={<AlertIcon />} />
        <div className={alert.classnames.container__body}>
          {title && (
            <Title as="h6" color={`${appearance}-textHigh`} lineHeight="4">
              {title}
            </Title>
          )}
          <div className={alert.classnames.container__content}>{children}</div>
        </div>
      </div>
      {onRemove && (
        <button
          aria-label="Dismiss alert"
          className={alert.classnames.container__close_appearance[appearance]}
          data-testid="dismiss-alert-button"
          type="button"
          onClick={onRemove}
          tabIndex={0}
        >
          <Icon color={`${appearance}-textLow`} source={<CloseIcon />} />
        </button>
      )}
    </div>
  );
};

Alert.Skeleton = AlertSkeleton;
Alert.displayName = "Alert";
Alert.Skeleton.displayName = "Alert.Skeleton";

export { Alert };
