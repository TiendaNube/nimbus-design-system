/* eslint-disable react/require-default-props */
import React, { memo } from "react";
import type { KeyboardEvent, MouseEvent, TouchEvent } from "react";
import { slider } from "@nimbus-ds/styles";

interface SliderThumbProps {
  type: "min" | "max" | "single";
  percentage: number;
  value: number;
  minAriaValue: number;
  maxAriaValue: number;
  disabled: boolean;
  ariaLabel?: string;
  dataTestId?: string;
  onMouseDown: (e: MouseEvent | TouchEvent) => void;
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
}

const SliderThumbComponent = ({
  type,
  percentage,
  value,
  minAriaValue,
  maxAriaValue,
  disabled,
  ariaLabel = undefined,
  dataTestId = undefined,
  onMouseDown,
  onKeyDown,
}: SliderThumbProps): React.JSX.Element => {
  const getDefaultAriaLabel = (): string => {
    if (type === "min") return "Minimum value";
    if (type === "max") return "Maximum value";
    return "Value";
  };

  return (
    <div
      className={slider.classnames.thumbWrapper}
      style={{ left: `${percentage}%` }}
    >
      <button
        type="button"
        className={[
          slider.classnames.thumb,
          disabled && slider.classnames.thumb_disabled,
        ]
          .filter(Boolean)
          .join(" ")}
        onMouseDown={onMouseDown}
        onTouchStart={onMouseDown}
        onKeyDown={onKeyDown}
        disabled={disabled}
        role="slider"
        aria-valuemin={minAriaValue}
        aria-valuemax={maxAriaValue}
        aria-valuenow={value}
        aria-label={ariaLabel ?? getDefaultAriaLabel()}
        tabIndex={disabled ? -1 : 0}
        data-testid={dataTestId}
      />
    </div>
  );
};

export const SliderThumb = memo(SliderThumbComponent);
