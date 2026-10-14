import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { Button } from "@nimbus-ds/button";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Composite/Pagination",
  component: Pagination,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const basic: Story = {
  render: (args) => {
    const [{ activePage }, updateArgs] = useArgs();
    const onPageChange = (page: number) => updateArgs({ activePage: page });
    return (
      <Pagination
        {...args}
        onPageChange={onPageChange}
        activePage={activePage}
      />
    );
  },
  args: {
    pageCount: 20,
    activePage: 2,
  },
};

/**
 * `showInput` adds a "go to page" input next to the navigation. It is
 * submitted on Enter or on blur, and is only available when `pageCount` is 6
 * or more. Use a viewport of 672px or wider (the `md` breakpoint) to see it.
 */
export const withGoToPage: Story = {
  ...basic,
  args: {
    pageCount: 20,
    activePage: 3,
    showInput: true,
  },
};

/**
 * The input only accepts digits. A number outside the range is not an error:
 * it goes to the nearest page and the input shows that page. Try typing `99`
 * and pressing Enter, or typing `0`.
 */
export const goToPageClamping: Story = {
  ...basic,
  args: {
    pageCount: 12,
    activePage: 1,
    showInput: true,
  },
};

/**
 * Every text the component renders can be translated through `labels`.
 * Omitted keys keep their English default.
 */
export const withLabels: Story = {
  ...basic,
  args: {
    pageCount: 20,
    activePage: 3,
    showInput: true,
    labels: {
      navigation: "Paginación",
      previousPage: "Página anterior",
      nextPage: "Página siguiente",
      firstPage: "Primera página",
      lastPage: "Última página",
      goToPage: "Ir a la página",
      goTo: "Ir a",
      of: "de",
      pageAnnouncement: (page: number, pageCount: number) =>
        `Página ${page} de ${pageCount}`,
    },
  },
};

/**
 * Below the `md` breakpoint (672px) and with 6 or more pages, a compact
 * first / previous / go-to-page / next / last layout replaces the page numbers.
 * The input is always present in this layout, whether or not `showInput` is set.
 */
export const compactLayout: Story = {
  ...withGoToPage,
  args: {
    pageCount: 20,
    activePage: 3,
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};

/**
 * With fewer than 6 pages the go-to-page input and the compact layout are not
 * available, so `showInput` has no effect.
 */
export const fewPages: Story = {
  ...basic,
  args: {
    pageCount: 5,
    activePage: 2,
    showInput: true,
  },
};

export const noNumbers: Story = {
  args: {
    pageCount: 20,
    activePage: 1,
    showNumbers: false,
  },
};

export const stressed: Story = {
  args: {
    pageCount: 3422,
    activePage: 2033,
  },
};

export const dotsLeft: Story = {
  args: {
    pageCount: 50,
    activePage: 48,
  },
};

export const dotsRight: Story = {
  args: {
    pageCount: 48,
    activePage: 2,
  },
};

export const asLink: Story = {
  args: {
    pageCount: 48,
    activePage: 2,
    renderItem: ({ isCurrent, pageNumber }) => (
      <Button
        as="a"
        href={`#${pageNumber}`}
        data-testid={`button-pagination-page-${pageNumber}`}
        appearance={isCurrent ? "primary" : "transparent"}
      >
        {pageNumber}
      </Button>
    ),
  },
};
