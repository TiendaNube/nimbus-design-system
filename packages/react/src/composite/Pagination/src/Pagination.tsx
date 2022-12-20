import React from "react";
import { pagination } from "@nimbus-ds/styles";
import { ChevronLeftIcon, ChevronRightIcon } from "@tiendanube/icons";
import { Button } from "@nimbus-ds/button";

import { usePagination, DOTS } from "./hooks";
import { PaginationProps } from "./pagination.types";
import { generateKey } from "./pagination.definitions";

const Pagination: React.FC<PaginationProps> = ({
  className: _className,
  style: _style,
  showNumbers = true,
  activePage,
  pageCount,
  onPageChange,
  ...rest
}) => {
  const paginationRange = usePagination({
    activePage,
    pageCount,
  });

  return (
    <ul {...rest} className={pagination.classnames.container}>
      <li>
        <Button
          data-testid="button-pagination-prev"
          appearance="transparent"
          onClick={() => onPageChange(Number(activePage - 1))}
          disabled={activePage === 1}
        >
          <ChevronLeftIcon />
        </Button>
      </li>
      {showNumbers &&
        paginationRange?.map((pageNumber, index) => (
          <li key={generateKey(pageNumber, index)}>
            {pageNumber === DOTS && (
              <Button
                data-testid="button-pagination-page-dots"
                appearance="transparent"
                disabled
              >
                {pageNumber}
              </Button>
            )}
            {pageNumber !== DOTS && (
              <Button
                data-testid={`button-pagination-page-${pageNumber}`}
                onClick={() => onPageChange(Number(pageNumber))}
                appearance={
                  pageNumber === activePage ? "primary" : "transparent"
                }
              >
                {pageNumber}
              </Button>
            )}
          </li>
        ))}
      <li>
        <Button
          data-testid="button-pagination-next"
          appearance="transparent"
          onClick={() => onPageChange(Number(activePage + 1))}
          disabled={activePage >= pageCount}
        >
          <ChevronRightIcon />
        </Button>
      </li>
    </ul>
  );
};

Pagination.displayName = "Pagination";

export { Pagination };
