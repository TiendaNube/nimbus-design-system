import React from "react";
import { pagination } from "@nimbus-ds/styles";
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@nimbus-ds/icons";
import { Button } from "@nimbus-ds/button";
import { Text } from "@nimbus-ds/text";

import {
  usePagination,
  useGoToPage,
  useUniqueId,
  DOTS,
  GO_TO_PAGE_MIN_PAGE_COUNT,
} from "./hooks";
import { GoToPageInput } from "./components";
import {
  type PaginationProps,
  type PaginationItemData,
} from "./pagination.types";
import { generateKey } from "./pagination.definitions";

const Pagination: React.FC<PaginationProps> = ({
  className,
  style: _style,
  showNumbers = true,
  showInput = false,
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
  const goToPage = useGoToPage({ activePage, pageCount, onPageChange });
  const id = useUniqueId();

  // The go-to-page input (and the compact layout built around it) only exists
  // when there are enough pages for it to be useful.
  const hasGoToPage = pageCount >= GO_TO_PAGE_MIN_PAGE_COUNT;
  const showDesktopInput = hasGoToPage && showInput;
  const isFirstPage = activePage === 1;
  const isLastPage = activePage >= pageCount;

  // Each input is described by its own "of Y" text (and by the error message,
  // when there is one), so no id is ever repeated.
  const compactCountId = `${id}-count-compact`;
  const desktopCountId = `${id}-count`;
  const errorId = `${id}-error`;
  const describedBy = (countId: string) =>
    [countId, goToPage.error ? errorId : null].filter(Boolean).join(" ");

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
    <ul
      {...rest}
      className={[
        className,
        pagination.classnames.container,
        hasGoToPage && goToPage.error && pagination.classnames.container__wrap,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {hasGoToPage && (
        <li className={pagination.classnames.compactOnly}>
          <Button
            data-testid="button-pagination-first"
            aria-label="First page"
            appearance="transparent"
            onClick={() => onPageChange(1)}
            disabled={isFirstPage}
          >
            <ChevronFirstIcon />
          </Button>
        </li>
      )}
      <li>
        <Button
          data-testid="button-pagination-prev"
          aria-label="Previous page"
          appearance="transparent"
          onClick={() => onPageChange(Number(activePage - 1))}
          disabled={isFirstPage}
        >
          <ChevronLeftIcon />
        </Button>
      </li>
      {hasGoToPage && (
        <li className={pagination.classnames.compactOnly}>
          <div className={pagination.classnames.goToPage__compact}>
            <GoToPageInput
              {...goToPage}
              pageCount={pageCount}
              data-testid="input-pagination-go-to-page-compact"
              aria-describedby={describedBy(compactCountId)}
            />
            <Text
              id={compactCountId}
              as="span"
              fontSize="base"
              lineHeight="base"
              color="neutral-textLow"
            >
              {`of ${pageCount}`}
            </Text>
          </div>
        </li>
      )}
      {showNumbers &&
        paginationRange?.map((pageNumber, index) => (
          <li
            key={generateKey(pageNumber, index)}
            className={
              hasGoToPage ? pagination.classnames.compactHidden : undefined
            }
          >
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
          aria-label="Next page"
          appearance="transparent"
          onClick={() => onPageChange(Number(activePage + 1))}
          disabled={isLastPage}
        >
          <ChevronRightIcon />
        </Button>
      </li>
      {hasGoToPage && (
        <li className={pagination.classnames.compactOnly}>
          <Button
            data-testid="button-pagination-last"
            aria-label="Last page"
            appearance="transparent"
            onClick={() => onPageChange(pageCount)}
            disabled={isLastPage}
          >
            <ChevronLastIcon />
          </Button>
        </li>
      )}
      {showDesktopInput && (
        <li className={pagination.classnames.goToPage__desktop}>
          <Text
            as="span"
            fontSize="base"
            lineHeight="base"
            color="neutral-textLow"
          >
            Go to
          </Text>
          <GoToPageInput
            {...goToPage}
            pageCount={pageCount}
            data-testid="input-pagination-go-to-page"
            aria-describedby={describedBy(desktopCountId)}
          />
          <span
            id={desktopCountId}
            className={pagination.classnames.visuallyHidden}
          >
            {`of ${pageCount}`}
          </span>
        </li>
      )}
      {hasGoToPage && goToPage.error && (
        <li id={errorId} role="alert" className={pagination.classnames.error}>
          <Text
            as="span"
            fontSize="caption"
            lineHeight="caption"
            color="danger-textHigh"
          >
            {goToPage.error}
          </Text>
        </li>
      )}
    </ul>
  );
};

Pagination.displayName = "Pagination";

export { Pagination };
