import React from "react";
import { pagination } from "@nimbus-ds/styles";
import { ChevronLeftIcon, ChevronRightIcon } from "@nimbus-ds/icons";
import { Button } from "@nimbus-ds/button";

import { usePagination, DOTS } from "./hooks";
import {
  type PaginationProps,
  type PaginationItemData,
} from "./pagination.types";
import { generateKey } from "./pagination.definitions";

const Pagination: React.FC<PaginationProps> = ({
  className: _className,
  style: _style,
  showNumbers = true,
  activePage,
  pageCount,
  onPageChange,
  renderItem,
  ...rest
}) => {
  const paginationRange = usePagination({
    activePage,
    pageCount,
  });

  // Note: If this 'renderItem' function is declared, it renders the item, and if not, by default it renders the Button with the page number.
  const handleRenderItem = (item: PaginationItemData) => {
    if (renderItem) {
      return renderItem(item);
    }

    return (
      <Button
        data-testid={`button-pagination-page-${item.pageNumber}`}
        appearance={item.isCurrent ? "primary" : "transparent"}
        onClick={() => onPageChange(Number(item.pageNumber))}
      >
        {item.pageNumber}
      </Button>
    );
  };

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
            {pageNumber !== DOTS &&
              handleRenderItem({
                isCurrent: pageNumber === activePage,
                pageNumber,
              })}
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
