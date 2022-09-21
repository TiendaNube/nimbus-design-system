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
} from "@tiendanube/icons";
import { toast } from "@nimbus-ds/styles";

import { ToastProps, TypesColors } from "./toast.types";
import { useToast } from "./hooks";

const HEIGHT_TOAST = 32;

const icons = {
  primary: <InfoCircleIcon />,
  danger: <ExclamationTriangleIcon />,
  success: <CheckCircleIcon />,
  progress: <CheckCircleIcon />,
};

const Toast: React.FC<ToastProps> = ({
  className: _className,
  style: _style,
  type = "primary",
  duration = 4000,
  position = 0,
  autoClose = true,
  id,
  text,
  ...rest
}) => {
  const closeIntervalRef = useRef<any>();
  const animationIntervalRef = useRef<any>();

  const [show, setShow] = useState(false);
  const { closeToast } = useToast();

  const close = useCallback(() => {
    // start animation
    setShow(true);
    closeIntervalRef.current = setInterval(() => {
      // remove animation
      setShow(false);
      animationIntervalRef.current = setTimeout(() => {
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
      clearInterval(closeIntervalRef?.current);
      clearInterval(animationIntervalRef?.current);
    };
  }, [close, autoClose]);

  const isProgress = useMemo(() => type === "progress", [type]);
  const isVisible = useMemo(() => show || !autoClose, [autoClose, show]);
  const types = useMemo(
    () => type.replace("progress", "neutral"),
    [type]
  ) as TypesColors;

  return (
    <div
      id={id}
      className={toast.style.content[type]}
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
          color={`${types}.textLow`}
          source={icons[type]}
        />
      )}
      {isProgress && (
        <Spinner
          data-testid={`toast-spinner-${types}`}
          color="neutral.textLow"
          size="small"
        />
      )}
      <Text color={`${types}.textLow`} fontSize="small" lineHeight="small">
        {text}
      </Text>
    </div>
  );
};

export { Toast };
