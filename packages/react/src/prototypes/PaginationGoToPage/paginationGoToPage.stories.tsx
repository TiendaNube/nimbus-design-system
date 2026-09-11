import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";

import { PaginationGoToPage } from "./PaginationGoToPage";

/**
 * Disposable Playground prototype — issue #557 "Pagination — go to page".
 *
 * Requested by Noelia Condoleo in
 * https://nuvemshop.slack.com/archives/C0BSF5ZERUZ/p1789047763353779?thread_ts=1789047763.353779&cid=C0BSF5ZERUZ
 *
 * Learning question: does an optional numeric "go to page" input, and a
 * compact first/prev/input/next/last layout for mobile at 6+ items, feel
 * usable without disrupting the existing arrow/number navigation?
 *
 * Simulated/limited parts (see the pull request for the full list):
 * - The "Go" button and Enter-to-confirm are a prototype affordance; the
 *   Figma reference's input icon slots (search / eye) look like unswapped
 *   defaults from the base Input component, not intentional for this
 *   feature, so they were not reproduced literally.
 * - The two new "first/last page" icons are prototype-only traces of the
 *   Figma vectors, not production `@nimbus-ds/icons` assets.
 */
const meta: Meta<typeof PaginationGoToPage> = {
  title: "Prototypes/PaginationGoToPage",
  component: PaginationGoToPage,
  tags: ["autodocs"],
  argTypes: {
    device: {
      control: "radio",
      options: ["desktop", "mobile"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PaginationGoToPage>;

export const Playground: Story = {
  render: (args) => {
    const [{ activePage }, updateArgs] = useArgs();
    const onPageChange = (page: number) => updateArgs({ activePage: page });
    return (
      <Box display="flex" flexDirection="column" gap="4">
        <Text fontSize="caption" color="neutral-textLow">
          Try: type a page number and press Enter or click Go. On
          `device=mobile` with `pageCount` at 20, use the compact first
          /prev/input/next/last row instead.
        </Text>
        <PaginationGoToPage
          {...args}
          onPageChange={onPageChange}
          activePage={activePage}
        />
      </Box>
    );
  },
  args: {
    pageCount: 20,
    activePage: 3,
    showGoToPage: true,
    device: "desktop",
  },
};

export const FullScreen: Story = {
  name: "Full screen",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
  },
  render: () => {
    const [args, updateArgs] = useArgs();
    const activePage = args.activePage ?? 3;
    const onPageChange = (page: number) => updateArgs({ activePage: page });

    return (
      <Box
        display="flex"
        flexDirection="column"
        gap="8"
        padding="8"
        minHeight="100vh"
      >
        <Box display="flex" flexDirection="column" gap="2">
          <Text fontSize="highlight" fontWeight="bold">
            Pagination — go to page (prototype)
          </Text>
          <Text fontSize="caption" color="neutral-textLow">
            Desktop, with the optional "go to page" input next to the
            existing navigation.
          </Text>
        </Box>
        <PaginationGoToPage
          pageCount={20}
          activePage={activePage}
          onPageChange={onPageChange}
          showGoToPage
          device="desktop"
        />

        <Box display="flex" flexDirection="column" gap="2" marginTop="8">
          <Text fontSize="highlight" fontWeight="bold">
            Mobile, 6+ items
          </Text>
          <Text fontSize="caption" color="neutral-textLow">
            Compact first / previous / page input / next / last row.
          </Text>
        </Box>
        <Box maxWidth="20rem">
          <PaginationGoToPage
            pageCount={20}
            activePage={activePage}
            onPageChange={onPageChange}
            device="mobile"
          />
        </Box>
      </Box>
    );
  },
};
