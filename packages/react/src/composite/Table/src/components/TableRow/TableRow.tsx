import React, { useMemo } from "react";
import { table } from "@nimbus-ds/styles";

import { type TableRowProps } from "./tableRow.types";

const TableRow: React.FC<TableRowProps> = ({
  className: _className,
  style: _style,
  children,
  id,
  onClick,
  backgroundColor = {
    rest: "neutral-background",
    active: "primary-surface",
    hover: "neutral-surface",
  },
  ...rest
}: TableRowProps) => {
  const { className, style, otherProps } = table.sprinkle({
    ...(rest as Parameters<typeof table.sprinkle>[0]),
    backgroundColor,
  });

  const rowStyle = useMemo(() => {
    const bgProps = table.properties.backgroundColor;
    type BgColorKey = keyof typeof bgProps;

    const isStringBg = typeof backgroundColor === "string";
    const restKey = isStringBg ? backgroundColor : backgroundColor?.rest;
    const hoverKey = isStringBg ? undefined : backgroundColor?.hover;
    const activeKey = isStringBg ? undefined : backgroundColor?.active;

    const getBgValue = (key: string | undefined): string | undefined =>
      key && key in bgProps ? bgProps[key as BgColorKey] : undefined;

    const cssVars: Record<string, string> = {};
    const restBg = getBgValue(restKey);
    const hoverBg = getBgValue(hoverKey);
    const activeBg = getBgValue(activeKey);

    if (restBg) cssVars["--nimbus-table-row-bg"] = restBg;
    if (hoverBg) cssVars["--nimbus-table-row-bg-hover"] = hoverBg;
    if (activeBg) cssVars["--nimbus-table-row-bg-active"] = activeBg;

    return Object.keys(cssVars).length > 0
      ? ({ ...style, ...cssVars } as React.CSSProperties)
      : style;
  }, [style, backgroundColor]);

  return (
    <tr
      className={[table.classnames.container__row, className].join(" ")}
      style={rowStyle}
      {...otherProps}
      id={id}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

export { TableRow };
