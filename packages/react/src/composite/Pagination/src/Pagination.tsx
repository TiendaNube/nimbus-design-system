import React from "react";
import { useId } from "@floating-ui/react";
import { label, pagination } from "@nimbus-ds/styles";
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
  DOTS,
  GO_TO_PAGE_MIN_PAGE_COUNT,
  type PageAnnouncement,
} from "./hooks";
import { GoToPageInput } from "./components";
import {
  type PaginationProps,
  type PaginationItemData,
} from "./pagination.types";
import { generateKey, resolveLabels } from "./pagination.definitions";

const Pagination: React.FC<PaginationProps> = ({
  className,
  style: _style,
  showNumbers = true,
  showInput = false,
  activePage,
  pageCount,
  onPageChange,
  renderItem,
  labels = {},
  ...rest
}) => {
  const paginationRange = usePagination({
    activePage,
    pageCount,
  });
  const goToPage = useGoToPage({ activePage, pageCount, onPageChange });
  // Only what the input uses: the rest of the hook state must not reach the DOM.
  const inputProps = {
    value: goToPage.value,
    onChange: goToPage.onChange,
    onBeforeInput: goToPage.onBeforeInput,
    onPaste: goToPage.onPaste,
    onKeyDown: goToPage.onKeyDown,
    onFocus: goToPage.onFocus,
    onBlur: goToPage.onBlur,
  };
  const id = useId();
  const texts = resolveLabels(labels);

  // The go-to-page input (and the compact layout built around it) only exists
  // when there are enough pages for it to be useful.
  const hasGoToPage = pageCount >= GO_TO_PAGE_MIN_PAGE_COUNT;
  const showDesktopInput = hasGoToPage && showInput;
  const isFirstPage = activePage === 1;
  const isLastPage = activePage >= pageCount;

  // Each input is described by its own "of Y" text, so no id is ever repeated.
  const compactCountId = `${id}-count-compact`;
  const desktopCountId = `${id}-count`;

  // Arrow navigation is announced in the compact layout only (no numbered
  // buttons there). Its announcement lives in a compact-only live region.
  const goTo = (page: number) =>
    hasGoToPage ? goToPage.navigate(page) : onPageChange(page);

  const getAnnouncementText = (announcement?: PageAnnouncement) => {
    if (!announcement) return "";
    const text = texts.pageAnnouncement(announcement.page, pageCount);
    // Alternate a trailing space so identical text is announced again.
    return announcement.tick % 2 === 0 ? `${text}\u00A0` : text;
  };

  // Note: If this 'renderItem' function is declared, it renders the item, and if not, by default it renders the Button with the page number.
  const handleRenderItem = (item: PaginationItemData) => {
    if (renderItem) {
      return renderItem(item);
    }

    return (
      <Button
        data-testid={`button-pagination-page-${item.pageNumber}`}
        appearance={item.isCurrent ? "primary" : "transparent"}
        aria-current={item.isCurrent ? "page" : undefined}
        onClick={() => onPageChange(Number(item.pageNumber))}
      >
        {item.pageNumber}
      </Button>
    );
  };

  return (
    <nav aria-label={texts.navigation}>
      <ul
        {...rest}
        className={[className, pagination.classnames.container]
          .filter(Boolean)
          .join(" ")}
      >
        {hasGoToPage && (
          <li className={pagination.classnames.compactOnly}>
            <Button
              data-testid="button-pagination-first"
              aria-label={texts.firstPage}
              appearance="transparent"
              onClick={() => goTo(1)}
              disabled={isFirstPage}
            >
              <ChevronFirstIcon />
            </Button>
          </li>
        )}
        <li>
          <Button
            data-testid="button-pagination-prev"
            aria-label={texts.previousPage}
            appearance="transparent"
            onClick={() => goTo(Number(activePage - 1))}
            disabled={isFirstPage}
          >
            <ChevronLeftIcon />
          </Button>
        </li>
        {hasGoToPage && (
          <li className={pagination.classnames.compactOnly}>
            <div className={pagination.classnames.goToPage__compact}>
              <GoToPageInput
                {...inputProps}
                aria-label={texts.goToPage}
                aria-describedby={compactCountId}
                data-testid="input-pagination-go-to-page-compact"
              />
              <Text
                id={compactCountId}
                as="span"
                fontSize="base"
                lineHeight="base"
                color="neutral-textLow"
              >
                {`${texts.of} ${pageCount}`}
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
            aria-label={texts.nextPage}
            appearance="transparent"
            onClick={() => goTo(Number(activePage + 1))}
            disabled={isLastPage}
          >
            <ChevronRightIcon />
          </Button>
        </li>
        {hasGoToPage && (
          <li className={pagination.classnames.compactOnly}>
            <Button
              data-testid="button-pagination-last"
              aria-label={texts.lastPage}
              appearance="transparent"
              onClick={() => goTo(pageCount)}
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
              {texts.goTo}
            </Text>
            <GoToPageInput
              {...inputProps}
              aria-label={texts.goToPage}
              aria-describedby={desktopCountId}
              data-testid="input-pagination-go-to-page"
            />
            <span id={desktopCountId} className={label.classnames.hidden}>
              {`${texts.of} ${pageCount}`}
            </span>
          </li>
        )}
      </ul>
      {hasGoToPage && (
        <>
          <span
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className={label.classnames.hidden}
            data-testid="pagination-announcement"
          >
            {getAnnouncementText(goToPage.announcement)}
          </span>
          <span
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className={[
              label.classnames.hidden,
              pagination.classnames.compactOnly,
            ].join(" ")}
            data-testid="pagination-compact-announcement"
          >
            {getAnnouncementText(goToPage.arrowAnnouncement)}
          </span>
        </>
      )}
    </nav>
  );
};

Pagination.displayName = "Pagination";

export { Pagination };
