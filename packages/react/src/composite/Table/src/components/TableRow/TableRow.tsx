import React, { useMemo } from "react";
import { table } from "@nimbus-ds/styles";

import { TableRowProps } from "./tableRow.types";
import { useTableContext } from "../../contexts";

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
  const tableContext = useTableContext();
  const { className, style, otherProps } = table.sprinkle({
    ...(rest as Parameters<typeof table.sprinkle>[0]),
    backgroundColor,
  });

  const gridTemplateColumns = useMemo(() => {
    if (!tableContext?.useCustomSizes || !tableContext?.columnLayout) {
      return undefined;
    }

    return tableContext.columnLayout
      .map((col) => {
        if (col.width) return col.width;

        const frValue = `${col.grow ?? 1}fr`;
        if (col.minWidth && col.maxWidth) return `minmax(${col.minWidth}, ${col.maxWidth})`;
        if (col.minWidth) return `minmax(${col.minWidth}, ${frValue})`;
        if (col.maxWidth) return `minmax(0, ${col.maxWidth})`;
        return frValue;
      })
      .join(" ");
  }, [tableContext?.useCustomSizes, tableContext?.columnLayout]);

  const rowStyle = useMemo(() => {
    const bgColorKey =
      typeof backgroundColor === "string"
        ? backgroundColor
        : backgroundColor?.rest;

    const bgColorValue = bgColorKey
      ? table.properties.backgroundColor[
          bgColorKey as keyof typeof table.properties.backgroundColor
        ]
      : undefined;

    const baseStyle = bgColorValue
      ? { ...style, "--nimbus-table-row-bg": bgColorValue }
      : style;

    if (gridTemplateColumns) {
      return {
        ...baseStyle,
        display: "grid",
        gridTemplateColumns,
      } as React.CSSProperties;
    }

    return baseStyle as React.CSSProperties;
  }, [style, backgroundColor, gridTemplateColumns]);

  if (tableContext?.useCustomSizes) {
    return (
      <div
        role="row"
        className={[table.classnames.container__row, className].join(" ")}
        style={rowStyle}
        {...otherProps}
        id={id}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }

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
