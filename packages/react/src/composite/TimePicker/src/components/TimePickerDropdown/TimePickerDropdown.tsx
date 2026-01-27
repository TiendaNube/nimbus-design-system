import React, { useMemo, useRef, useEffect } from "react";
import { timePicker } from "@nimbus-ds/styles";
import { useCanScroll } from "@common/hooks";
import { padZero } from "../../utils/timeUtils";
import { TimePickerAmPm, TimePickerColumn } from "../index";
import type { TimePickerDropdownProps } from "./TimePickerDropdown.types";

const { classnames } = timePicker;

/**
 * Internal dropdown panel component that displays a scrollable list
 * of time options with optional AM/PM toggle.
 */
export const TimePickerDropdown: React.FC<TimePickerDropdownProps> = ({
  format,
  disabled,
  labels,
  ariaLabel,
  step,
  dropdownOptions,
  initialValue,
  internalTimeValue,
  selectTime,
  setAmPm,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const {
    canScrollStart: canScrollTop,
    canScrollEnd: canScrollBottom,
    checkScrollPosition,
  } = useCanScroll({
    direction: "vertical",
    scrollContainerRef,
  });

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;
    let containerRef: HTMLDivElement | null = null;
    const handleScroll = () => checkScrollPosition();

    const setupScrollTracking = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      containerRef = container;
      checkScrollPosition();
      container.addEventListener("scroll", handleScroll);

      resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(checkScrollPosition);
      });
      resizeObserver.observe(container);
    };

    const frameId = requestAnimationFrame(setupScrollTracking);

    return () => {
      cancelAnimationFrame(frameId);
      if (containerRef) {
        containerRef.removeEventListener("scroll", handleScroll);
      }
      resizeObserver?.disconnect();
    };
  }, [checkScrollPosition]);

  const currentTimeValue = useMemo(
    () =>
      initialValue
        ? `${padZero(initialValue.hours)}:${padZero(initialValue.minutes)}`
        : null,
    [initialValue]
  );

  const selectedTimeValue = useMemo(
    () =>
      internalTimeValue &&
      internalTimeValue.hours !== undefined &&
      internalTimeValue.minutes !== undefined
        ? `${padZero(internalTimeValue.hours)}:${padZero(
            internalTimeValue.minutes
          )}`
        : null,
    [internalTimeValue]
  );

  const currentAmPm = initialValue?.ampm ?? "AM";
  const selectedAmPm = internalTimeValue?.ampm ?? currentAmPm;

  const filteredOptions = useMemo(() => {
    if (format === "24h") {
      return dropdownOptions;
    }
    return dropdownOptions.filter((opt) => opt.ampm === selectedAmPm);
  }, [dropdownOptions, format, selectedAmPm]);

  return (
    <div style={{ position: "relative", display: "flex", flex: 1 }}>
      <div
        className={classnames.dropdownScrollContainer}
        ref={scrollContainerRef}
      >
        <TimePickerColumn
          type="combined"
          options={filteredOptions}
          currentValue={currentTimeValue}
          selectedValue={selectedTimeValue}
          onSelectTime={selectTime}
          format={format}
          step={step}
          label={ariaLabel}
          scrollContainerRef={scrollContainerRef}
        />
        {format === "12h" && (
          <div className={classnames.dropdownAmPmSticky}>
            <TimePickerAmPm
              current={currentAmPm}
              selected={selectedAmPm}
              onSelect={setAmPm}
              disabled={disabled}
              amLabel={labels.amLabel || "AM"}
              pmLabel={labels.pmLabel || "PM"}
              selectorLabel={labels.amPmSelectorLabel || "AM/PM selector"}
            />
          </div>
        )}
      </div>
      {canScrollTop && <div className={classnames.gradientPosition.top} />}
      {canScrollBottom && (
        <div className={classnames.gradientPosition.bottom} />
      )}
    </div>
  );
};

TimePickerDropdown.displayName = "TimePickerDropdown";
