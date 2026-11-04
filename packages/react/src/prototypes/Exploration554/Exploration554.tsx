import React, { useState } from "react";
import { Box } from "@nimbus-ds/box";
import { Button } from "@nimbus-ds/button";
import { Icon } from "@nimbus-ds/icon";
import { IconButton } from "@nimbus-ds/icon-button";
import { Input } from "@nimbus-ds/input";
import { Popover } from "@nimbus-ds/popover";
import { Text } from "@nimbus-ds/text";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "@nimbus-ds/icons";

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function addDays(date: Date, amount: number): Date {
  const next = startOfDay(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function isSameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isBetween(day: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const [lo, hi] = start.getTime() <= end.getTime() ? [start, end] : [end, start];
  const t = day.getTime();
  return t > lo.getTime() && t < hi.getTime();
}

function buildMonthMatrix(monthStart: Date): Array<Array<Date | null>> {
  const year = monthStart.getFullYear();
  const month = monthStart.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: Array<Date | null> = [];
  for (let i = 0; i < firstWeekday; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(new Date(year, month, day));
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: Array<Array<Date | null>> = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

function formatDate(date: Date | null): string {
  if (!date) return "";
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export interface DateRangePreset {
  label: string;
  getRange: () => [Date, Date];
}

function today(): Date {
  return startOfDay(new Date());
}

export const DEFAULT_PRESETS: DateRangePreset[] = [
  { label: "Today", getRange: () => [today(), today()] },
  {
    label: "Yesterday",
    getRange: () => {
      const yesterday = addDays(today(), -1);
      return [yesterday, yesterday];
    },
  },
  { label: "Last 7 days", getRange: () => [addDays(today(), -6), today()] },
  { label: "Last 30 days", getRange: () => [addDays(today(), -29), today()] },
  { label: "This month", getRange: () => [startOfMonth(today()), today()] },
  {
    label: "Last month",
    getRange: () => {
      const lastMonthStart = addMonths(startOfMonth(today()), -1);
      const lastMonthEnd = addDays(startOfMonth(today()), -1);
      return [lastMonthStart, lastMonthEnd];
    },
  },
];

interface MonthGridProps {
  month: Date;
  onMonthChange: (next: Date) => void;
  isSelected: (day: Date) => boolean;
  isRangeEdge: (day: Date) => boolean;
  isInRange: (day: Date) => boolean;
  onSelectDay: (day: Date) => void;
}

function MonthGrid({
  month,
  onMonthChange,
  isSelected,
  isRangeEdge,
  isInRange,
  onSelectDay,
}: MonthGridProps) {
  const weeks = buildMonthMatrix(startOfMonth(month));
  const label = month.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <Box display="flex" flexDirection="column" gap="2">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <IconButton
          size="1.75rem"
          source={<ChevronLeftIcon />}
          onClick={() => onMonthChange(addMonths(month, -1))}
          aria-label="Previous month"
        />
        <Text fontWeight="medium">{label}</Text>
        <IconButton
          size="1.75rem"
          source={<ChevronRightIcon />}
          onClick={() => onMonthChange(addMonths(month, 1))}
          aria-label="Next month"
        />
      </Box>
      <Box display="flex">
        {WEEKDAY_LABELS.map((weekday) => (
          <Box key={weekday} width="2.25rem" display="flex" justifyContent="center">
            <Text fontSize="caption" color="neutral-textLow">
              {weekday}
            </Text>
          </Box>
        ))}
      </Box>
      {weeks.map((week, weekIndex) => (
        <Box key={weekIndex} display="flex">
          {week.map((day, dayIndex) => {
            if (!day) {
              return <Box key={dayIndex} width="2.25rem" height="2.25rem" />;
            }
            const selected = isSelected(day) || isRangeEdge(day);
            const inRange = isInRange(day);
            return (
              <Box
                key={dayIndex}
                as="button"
                type="button"
                width="2.25rem"
                height="2.25rem"
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                borderRadius="1"
                borderWidth="0"
                backgroundColor={selected ? "primary-interactive" : inRange ? "neutral-surface" : "transparent"}
                color="neutral-textHigh"
                onClick={() => onSelectDay(day)}
              >
                <Text fontSize="caption">{day.getDate()}</Text>
              </Box>
            );
          })}
        </Box>
      ))}
    </Box>
  );
}

export interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  label?: string;
  placeholder?: string;
}

export function DatePicker({
  value,
  onChange,
  label = "Date",
  placeholder = "Select a date",
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(value ?? new Date()));

  return (
    <Box display="flex" flexDirection="column" gap="1" width="16rem">
      <Text fontSize="caption" fontWeight="medium">
        {label}
      </Text>
      <Popover
        visible={open}
        onVisibility={setOpen}
        width="320px"
        position="bottom-start"
        content={
          <Box padding="2">
            <MonthGrid
              month={visibleMonth}
              onMonthChange={setVisibleMonth}
              isSelected={(day) => isSameDay(day, value)}
              isRangeEdge={() => false}
              isInRange={() => false}
              onSelectDay={(day) => {
                onChange(day);
                setOpen(false);
              }}
            />
          </Box>
        }
      >
        <Input
          readOnly
          placeholder={placeholder}
          value={formatDate(value)}
          append={<Icon source={<CalendarIcon />} />}
          appendPosition="end"
          onFocus={() => setOpen(true)}
        />
      </Popover>
    </Box>
  );
}

export type PresetsLayout = "sidebar" | "row";

export interface DateRangePickerProps {
  value: [Date | null, Date | null];
  onChange: (range: [Date | null, Date | null]) => void;
  presets?: DateRangePreset[];
  presetsLayout?: PresetsLayout;
  label?: string;
  placeholder?: string;
}

export function DateRangePicker({
  value,
  onChange,
  presets = DEFAULT_PRESETS,
  presetsLayout = "sidebar",
  label = "Date range",
  placeholder = "Select a range",
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [pendingStart, setPendingStart] = useState<Date | null>(null);
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(value[0] ?? new Date()));

  const handleSelectDay = (day: Date) => {
    const [start, end] = value;
    if (!pendingStart || (start && end)) {
      setPendingStart(day);
      onChange([day, null]);
      return;
    }
    if (day.getTime() < pendingStart.getTime()) {
      onChange([day, pendingStart]);
    } else {
      onChange([pendingStart, day]);
    }
    setPendingStart(null);
    setOpen(false);
  };

  const handlePreset = (preset: DateRangePreset) => {
    const [start, end] = preset.getRange();
    onChange([start, end]);
    setPendingStart(null);
    setVisibleMonth(startOfMonth(start));
    setOpen(false);
  };

  const calendar = (
    <MonthGrid
      month={visibleMonth}
      onMonthChange={setVisibleMonth}
      isSelected={() => false}
      isRangeEdge={(day) => isSameDay(day, value[0]) || isSameDay(day, value[1])}
      isInRange={(day) => isBetween(day, value[0], value[1])}
      onSelectDay={handleSelectDay}
    />
  );

  const presetButtons = (
    <Box display="flex" flexDirection={presetsLayout === "sidebar" ? "column" : "row"} gap="1">
      {presets.map((preset) => (
        <Button key={preset.label} appearance="transparent" size="small" onClick={() => handlePreset(preset)}>
          {preset.label}
        </Button>
      ))}
    </Box>
  );

  const displayValue =
    value[0] && value[1]
      ? `${formatDate(value[0])} – ${formatDate(value[1])}`
      : value[0]
      ? `${formatDate(value[0])} – …`
      : "";

  return (
    <Box display="flex" flexDirection="column" gap="1" width="18rem">
      <Text fontSize="caption" fontWeight="medium">
        {label}
      </Text>
      <Popover
        visible={open}
        onVisibility={(next) => {
          setOpen(next);
          if (!next) setPendingStart(null);
        }}
        width={presetsLayout === "sidebar" ? "560px" : "340px"}
        position="bottom-start"
        content={
          presetsLayout === "sidebar" ? (
            <Box display="flex" gap="3" padding="2">
              <Box
                display="flex"
                flexDirection="column"
                gap="1"
                padding="2"
                borderWidth="1"
                borderStyle="solid"
                borderColor="neutral-interactive"
                borderRadius="1"
              >
                {presetButtons}
              </Box>
              <Box>{calendar}</Box>
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" gap="2" padding="2">
              {presetButtons}
              {calendar}
            </Box>
          )
        }
      >
        <Input
          readOnly
          placeholder={placeholder}
          value={displayValue}
          append={<Icon source={<CalendarIcon />} />}
          appendPosition="end"
          onFocus={() => setOpen(true)}
        />
      </Popover>
    </Box>
  );
}
