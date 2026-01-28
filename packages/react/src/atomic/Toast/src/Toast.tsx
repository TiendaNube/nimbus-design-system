import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { Spinner } from "@nimbus-ds/spinner";
import { Text } from "@nimbus-ds/text";
import { Icon } from "@nimbus-ds/icon";
import {
  InfoCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@nimbus-ds/icons";
import { toast } from "@nimbus-ds/styles";

import type {
  IconColor,
  ToastComponents,
  ToastProps,
  TypesColors,
} from "./toast.types";
import { useToast } from "./hooks";
import { ToastProvider } from "./components";

const HEIGHT_TOAST = 32;

const icons = {
  primary: <InfoCircleIcon />,
  danger: <ExclamationTriangleIcon />,
  success: <CheckCircleIcon />,
  progress: <CheckCircleIcon />,
};

const Toast: React.FC<ToastProps> & ToastComponents = ({
  className: _className,
  style: _style,
  type = "primary",
  duration = 4000,
  position = 0,
  autoClose = true,
  id,
  text,
  ...rest
}: ToastProps) => {
  const closeIntervalRef = useRef<number | null>(null);
  const animationIntervalRef = useRef<number | null>(null);

  const [show, setShow] = useState(false);
  const { closeToast } = useToast();

  const close = useCallback(() => {
    // start animation
    setShow(true);
    closeIntervalRef.current = window.setInterval(() => {
      // remove animation
      setShow(false);
      animationIntervalRef.current = window.setTimeout(() => {
        // remove toast in list
        closeToast(id);
      }, 200); // this timeout is to allow render the out transition
    }, duration);
  }, [
    setShow,
    closeToast,
    id,
    duration,
    closeIntervalRef,
    animationIntervalRef,
  ]);

  useEffect(() => {
    if (autoClose) {
      close();
    }
    return () => {
      // clear interval animation
      if (closeIntervalRef.current !== null) {
        clearInterval(closeIntervalRef.current);
      }
      if (animationIntervalRef.current !== null) {
        clearInterval(animationIntervalRef.current);
      }
    };
  }, [close, autoClose]);

  const isProgress = useMemo(() => type === "progress", [type]);
  const isVisible = useMemo(() => show || !autoClose, [autoClose, show]);
  const types = useMemo(
    () => type.replace("progress", "neutral"),
    [type]
  ) as TypesColors;

  const colorMapping: Record<TypesColors, IconColor> = {
    primary: "primary-surface",
    success: "success-surface",
    danger: "danger-surface",
    neutral: "neutral-surface",
  };

  return (
    <div
      id={id}
      className={toast.classnames.appearance[type]}
      style={{
        transform: isVisible
          ? `translateY(${position * -HEIGHT_TOAST}%)`
          : "translateY(300%)",
      }}
      data-testid="toast-element"
      {...rest}
    >
      {!isProgress && (
        <Icon
          data-testid={`toast-icon-${types}`}
          color={colorMapping[types]}
          source={icons[type]}
        />
      )}
      {isProgress && (
        <Spinner
          data-testid={`toast-spinner-${types}`}
          color="neutral-surface"
          size="small"
        />
      )}
      <Text color={colorMapping[types]} fontSize="caption" lineHeight="caption">
        {text}
      </Text>
    </div>
  );
};

Toast.Provider = ToastProvider;
Toast.displayName = "Toast";
Toast.Provider.displayName = "Toast.Provider";

export { Toast };
