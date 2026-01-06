import React from "react";
import { table } from "@nimbus-ds/styles";

import { TableHeadProps } from "./tableHead.types";
import { useTableContext } from "../../contexts";

const TableHead: React.FC<TableHeadProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}: TableHeadProps) => {
  const tableContext = useTableContext();

  if (tableContext?.useCustomSizes) {
    return (
      <div {...rest} role="rowgroup" className={table.classnames.container__head}>
        {children}
      </div>
    );
  }

  return (
    <thead {...rest} className={table.classnames.container__head}>
      {children}
    </thead>
  );
};

export { TableHead };
