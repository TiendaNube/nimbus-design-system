import React, { memo } from "react";
import type { KeyboardEvent } from "react";
import { slider } from "@nimbus-ds/styles";

interface SliderThumbProps {
  type: "min" | "max";
  percentage: number;
  value: number;
  minAriaValue: number;
  maxAriaValue: number;
  disabled: boolean;
  label?: string;
  dataTestId?: string;
  onMouseDown: (e: React.MouseEvent | React.TouchEvent) => void;
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
}

const SliderThumb: React.FC<SliderThumbProps> = ({
  type,
  percentage,
  value,
  minAriaValue,
  maxAriaValue,
  disabled,
  label,
  dataTestId,
  onMouseDown,
  onKeyDown,
}) => {
  const defaultLabel = type === "min" ? "Minimum value" : "Maximum value";

  return (
    <button
      type="button"
      className={[
        slider.classnames.thumb,
        disabled && slider.classnames.thumb_disabled,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ left: `${percentage}%` }}
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
      onKeyDown={onKeyDown}
      disabled={disabled}
      role="slider"
      aria-valuemin={minAriaValue}
      aria-valuemax={maxAriaValue}
      aria-valuenow={value}
      aria-label={label ?? defaultLabel}
      tabIndex={disabled ? -1 : 0}
      data-testid={dataTestId}
    />
  );
};

SliderThumb.defaultProps = {
  label: undefined,
  dataTestId: undefined,
};

export default memo(SliderThumb);
