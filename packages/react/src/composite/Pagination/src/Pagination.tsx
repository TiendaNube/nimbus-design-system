import React from "react";
import { pagination } from "@nimbus-ds/styles";
import { ChevronLeftIcon, ChevronRightIcon } from "@nimbus-ds/icons";
import { Button } from "@nimbus-ds/button";

import { usePagination, DOTS } from "./hooks";
import {
  PaginationComponents,
  PaginationItemProps,
  PaginationProps,
} from "./pagination.types";
import { generateKey } from "./pagination.definitions";

const Pagination: React.FC<PaginationProps> & PaginationComponents = ({
  className: _className,
  style: _style,
  showNumbers = true,
  activePage,
  pageCount,
  onPageChange,
  renderItem,
  ...rest
}: PaginationProps) => {
  const paginationRange = usePagination({
    activePage,
    pageCount,
  });

  const handleRenderItem = (page: number, restProps: PaginationItemProps) => {
    if (renderItem) {
      return renderItem(page, restProps);
    }

    return (
      <Button {...restProps} onClick={() => onPageChange?.(Number(page))}>
        {page}
      </Button>
    );
  };

  return (
    <ul {...rest} className={pagination.classnames.container}>
      <li>
        
        <Button
          data-testid="button-pagination-prev"
          appearance="transparent"
          onClick={() => onPageChange?.(Number(activePage - 1))}
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
            {pageNumber !== DOTS &&
              handleRenderItem(Number(pageNumber), {
                "data-testid": `button-pagination-page-${pageNumber}`,
                appearance:
                  pageNumber === activePage ? "primary" : "transparent",
                children: pageNumber,
              })}
          </li>
        ))}
      <li>
        <Button
          data-testid="button-pagination-next"
          appearance="transparent"
          onClick={() => onPageChange?.(Number(activePage + 1))}
          disabled={activePage >= pageCount}
        >
          <ChevronRightIcon />
        </Button>
      </li>
    </ul>
  );
};

export const PaginationItem: React.FC<PaginationItemProps> = ({
  children,
  ...props
}) => (
  <Button as="a" {...props}>
    {children}
  </Button>
);

Pagination.Item = PaginationItem;
Pagination.displayName = "Pagination";
Pagination.Item.displayName = "Pagination.Item";

export { Pagination };
