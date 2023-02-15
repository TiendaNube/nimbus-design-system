import React from "react";
import { table } from "@nimbus-ds/styles";

import { TableRowProps } from "./tableRow.types";

const TableRow: React.FC<TableRowProps> = ({
  className: _className,
  style: _style,
  children,
  id,
  onClick,
  backgroundColor = {
    rest: "neutral.background",
    active: "primary.surface",
    hover: "neutral.surface",
  },
  ...rest
}: TableRowProps) => {
  const { className, style, otherProps } = table.sprinkle({
    ...(rest as Parameters<typeof table.sprinkle>[0]),
    backgroundColor,
  });

  return (
    <tr
      className={[table.classnames.row, className].join(" ")}
      style={style}
      {...otherProps}
      id={id}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

export { TableRow };
