import React from "react";
import { table } from "@nimbus-ds/styles";

import { TableBodyProps } from "./tableBody.types";
import { useTableContext } from "../../contexts";

const TableBody: React.FC<TableBodyProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}: TableBodyProps) => {
  const tableContext = useTableContext();

  if (tableContext?.useCustomSizes) {
    return (
      <div {...rest} role="rowgroup" className={table.classnames.container__body}>
        {children}
      </div>
    );
  }

  return (
    <tbody {...rest} className={table.classnames.container__body}>
      {children}
    </tbody>
  );
};

export { TableBody };
