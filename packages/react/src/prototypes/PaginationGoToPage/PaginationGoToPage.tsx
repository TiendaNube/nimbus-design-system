import React, { useEffect, useState } from "react";
import { Box } from "@nimbus-ds/box";
import { Button } from "@nimbus-ds/button";
import { Icon } from "@nimbus-ds/icon";
import { Input } from "@nimbus-ds/input";
import { Text } from "@nimbus-ds/text";
import { Pagination } from "@nimbus-ds/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "@nimbus-ds/icons";

import { ChevronFirstIcon, ChevronLastIcon } from "./icons";

/**
 * Disposable Playground prototype for issue #557 ("Pagination — go to page").
 *
 * Composes the existing `@nimbus-ds/pagination` component — it is not
 * modified — with two additions asked in the Figma reference
 * (file `TDwgeblsVNeHKKRvoDRk7n`, node `7046:18927`):
 *
 * 1. An OPTIONAL numeric "go to page" input, shown next to the existing
 *    arrow/number navigation (`showGoToPage`). It never replaces the
 *    existing controls.
 * 2. A distinct compact layout for `device="mobile"` once `pageCount >= 6`:
 *    first/previous/[page input]/next/last, because numbered buttons stop
 *    fitting at that density. This is the only case that needed the two new
 *    "jump to first/last page" icons.
 *
 * All chevrons in both layouts render through `<Icon color="neutral-textHigh" />`
 * so the prototype makes the requested rest-state token swap ("text high")
 * explicit and visible. Note: production `Pagination`'s chevrons already
 * inherit `neutral.textHigh` from `Button`'s `appearance="transparent"`
 * rest-state color (`packages/core/styles/.../nimbus-button.css.ts`), so the
 * reused `<Pagination>` block below needed no source change for that part —
 * see the pull request body for this observation.
 */

export interface PaginationGoToPageProps {
  /** The currently selected page. */
  activePage: number;
  /** The total number of pages. */
  pageCount: number;
  /** Called with the new page number when the page changes. */
  onPageChange: (page: number) => void;
  /** Determines whether page numbers should be shown. @default true */
  showNumbers?: boolean;
  /**
   * Shows the optional numeric "go to page" input next to the existing
   * navigation. Composition only — never replaces arrows or numbers.
   * @default false
   */
  showGoToPage?: boolean;
  /**
   * Viewport this instance renders for. `"mobile"` switches to the compact
   * first/prev/input/next/last layout once `pageCount >= 6`.
   * @default "desktop"
   */
  device?: "desktop" | "mobile";
}

const useGoToPage = (
  activePage: number,
  pageCount: number,
  onPageChange: (page: number) => void
) => {
  const [value, setValue] = useState(String(activePage));
  const [error, setError] = useState<string | undefined>(undefined);

  const submit = () => {
    const parsed = Number(value.trim());
    const isValid =
      value.trim() !== "" &&
      Number.isInteger(parsed) &&
      parsed >= 1 &&
      parsed <= pageCount;

    if (!isValid) {
      setError(`Enter a page between 1 and ${pageCount}.`);
      return;
    }

    setError(undefined);
    onPageChange(parsed);
    setValue(String(parsed));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (error) setError(undefined);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  };

  return { value, setValue, error, onChange, onKeyDown, submit };
};

/**
 * Minimum width for the go-to-page input, and how much extra width to add
 * per digit `pageCount` can require, so the input stays legible for
 * multi-digit page counts (e.g. 100+) instead of clipping the typed value.
 */
const GO_TO_PAGE_INPUT_MIN_WIDTH_REM = 3;
const GO_TO_PAGE_INPUT_CHAR_WIDTH_REM = 0.75;
const GO_TO_PAGE_INPUT_PADDING_REM = 1.5;

const getGoToPageInputWidth = (pageCount: number): string => {
  const digits = String(pageCount).length;
  const needed =
    digits * GO_TO_PAGE_INPUT_CHAR_WIDTH_REM + GO_TO_PAGE_INPUT_PADDING_REM;
  return `${Math.max(GO_TO_PAGE_INPUT_MIN_WIDTH_REM, needed)}rem`;
};

const GoToPageField: React.FC<{
  activePage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  label: string;
  width?: string;
}> = ({ activePage, pageCount, onPageChange, label, width = "3rem" }) => {
  const { value, setValue, error, onChange, onKeyDown, submit } = useGoToPage(
    activePage,
    pageCount,
    onPageChange
  );

  // Keep the input in sync when `activePage` changes from outside typing —
  // i.e. via the existing Pagination component's number buttons rendered
  // alongside this field, which call `onPageChange` directly rather than
  // through `submit`.
  useEffect(() => {
    setValue(String(activePage));
  }, [activePage, setValue]);

  return (
    <Box display="flex" flexDirection="column" gap="1">
      <Box display="flex" gap="2" alignItems="center">
        <Text fontSize="base" lineHeight="base" color="neutral-textLow">
          {label}
        </Text>
        <Box width={width}>
          <Input
            type="number"
            min={1}
            max={pageCount}
            value={value}
            appearance={error ? "danger" : "neutral"}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onBlur={submit}
            data-testid="input-pagination-go-to-page"
            aria-label="Go to page"
          />
        </Box>
      </Box>
      {error && (
        <Text fontSize="caption" lineHeight="caption" color="danger-textHigh">
          {error}
        </Text>
      )}
    </Box>
  );
};

const CompactChevronButton: React.FC<{
  testId: string;
  ariaLabel: string;
  disabled: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}> = ({ testId, ariaLabel, disabled, onClick, icon }) => (
  <Button
    data-testid={testId}
    aria-label={ariaLabel}
    appearance="transparent"
    disabled={disabled}
    onClick={onClick}
  >
    <Icon color="neutral-textHigh" source={icon} />
  </Button>
);

const CompactMobilePagination: React.FC<{
  activePage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}> = ({ activePage, pageCount, onPageChange }) => {
  const { value, setValue, error, onChange, onKeyDown, submit } = useGoToPage(
    activePage,
    pageCount,
    onPageChange
  );

  // Keep the input in sync when `activePage` changes from outside typing —
  // i.e. via the first/prev/next/last arrow controls below, which call
  // `onPageChange` directly rather than through `submit`.
  useEffect(() => {
    setValue(String(activePage));
  }, [activePage, setValue]);

  const isFirst = activePage === 1;
  const isLast = activePage >= pageCount;
  const inputWidth = getGoToPageInputWidth(pageCount);

  return (
    <Box display="flex" flexDirection="column" gap="1">
      <Box display="flex" gap="1" alignItems="center">
        <CompactChevronButton
          testId="button-pagination-first"
          ariaLabel="First page"
          disabled={isFirst}
          onClick={() => onPageChange(1)}
          icon={<ChevronFirstIcon />}
        />
        <CompactChevronButton
          testId="button-pagination-prev"
          ariaLabel="Previous page"
          disabled={isFirst}
          onClick={() => onPageChange(activePage - 1)}
          icon={<ChevronLeftIcon />}
        />
        <Box display="flex" gap="2" alignItems="center">
          <Box width={inputWidth} minWidth="3rem">
            <Input
              type="number"
              min={1}
              max={pageCount}
              value={value}
              appearance={error ? "danger" : "neutral"}
              onChange={onChange}
              onKeyDown={onKeyDown}
              onBlur={submit}
              data-testid="input-pagination-go-to-page"
              aria-label="Go to page"
            />
          </Box>
          <Text fontSize="base" lineHeight="base" color="neutral-textLow">
            of {pageCount}
          </Text>
        </Box>
        <CompactChevronButton
          testId="button-pagination-next"
          ariaLabel="Next page"
          disabled={isLast}
          onClick={() => onPageChange(activePage + 1)}
          icon={<ChevronRightIcon />}
        />
        <CompactChevronButton
          testId="button-pagination-last"
          ariaLabel="Last page"
          disabled={isLast}
          onClick={() => onPageChange(pageCount)}
          icon={<ChevronLastIcon />}
        />
      </Box>
      {error && (
        <Text fontSize="caption" lineHeight="caption" color="danger-textHigh">
          {error}
        </Text>
      )}
    </Box>
  );
};

const PaginationGoToPage: React.FC<PaginationGoToPageProps> = ({
  activePage,
  pageCount,
  onPageChange,
  showNumbers = true,
  showGoToPage = false,
  device = "desktop",
}) => {
  const isCompactMobile = device === "mobile" && pageCount >= 6;

  if (isCompactMobile) {
    return (
      <CompactMobilePagination
        activePage={activePage}
        pageCount={pageCount}
        onPageChange={onPageChange}
      />
    );
  }

  return (
    <Box
      display="flex"
      flexDirection={device === "mobile" ? "column" : "row"}
      gap="4"
      alignItems={device === "mobile" ? "flex-start" : "center"}
    >
      <Pagination
        activePage={activePage}
        pageCount={pageCount}
        onPageChange={onPageChange}
        showNumbers={showNumbers}
      />
      {showGoToPage && (
        <GoToPageField
          activePage={activePage}
          pageCount={pageCount}
          onPageChange={onPageChange}
          label="Go to"
        />
      )}
    </Box>
  );
};

PaginationGoToPage.displayName = "PaginationGoToPage";

export { PaginationGoToPage };
