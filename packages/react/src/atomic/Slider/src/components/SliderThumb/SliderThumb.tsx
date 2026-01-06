import React, { memo } from "react";
import type { KeyboardEvent } from "react";
import { slider } from "@nimbus-ds/styles";

interface SliderThumbProps {
  type: "min" | "max" | "single";
  percentage: number;
  value: number;
  minAriaValue: number;
  maxAriaValue: number;
  disabled: boolean;
  label?: string;
  showValue?: boolean;
  dataTestId?: string;
  onMouseDown: (e: React.MouseEvent | React.TouchEvent) => void;
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
}

const SliderThumbComponent: React.FC<SliderThumbProps> = ({
  type,
  percentage,
  value,
  minAriaValue,
  maxAriaValue,
  disabled,
  label,
  showValue = false,
  dataTestId,
  onMouseDown,
  onKeyDown,
}) => {
  let defaultLabel: string;
  if (type === "min") {
    defaultLabel = "Minimum value";
  } else if (type === "max") {
    defaultLabel = "Maximum value";
  } else {
    defaultLabel = "Value";
  }

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
        aria-label={label ?? defaultLabel}
        tabIndex={disabled ? -1 : 0}
        data-testid={dataTestId}
      />
      {showValue && (
        <span
          className={slider.classnames.thumbValue}
          data-testid={dataTestId ? `${dataTestId}-value` : undefined}
        >
          {value}
        </span>
      )}
    </div>
  );
};

SliderThumbComponent.defaultProps = {
  label: undefined,
  showValue: false,
  dataTestId: undefined,
};

export const SliderThumb = memo(SliderThumbComponent);
