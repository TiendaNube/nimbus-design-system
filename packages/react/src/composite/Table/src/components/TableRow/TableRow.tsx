import React, { useMemo } from "react";
import { table } from "@nimbus-ds/styles";

import { TableRowProps } from "./tableRow.types";

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

  // Extract the row's background color for fixed cells to inherit
  // Look up the actual CSS variable value from the properties mapping
  const rowStyle = useMemo(() => {
    // Get the "rest" (default) background color key from the prop
    const bgColorKey =
      typeof backgroundColor === "string"
        ? backgroundColor
        : backgroundColor?.rest;

    // Look up the actual CSS variable value from the properties mapping
    const bgColorValue = bgColorKey
      ? table.properties.backgroundColor[
          bgColorKey as keyof typeof table.properties.backgroundColor
        ]
      : undefined;

    if (bgColorValue) {
      return {
        ...style,
        "--nimbus-table-row-bg": bgColorValue,
      } as React.CSSProperties;
    }
    return style;
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
