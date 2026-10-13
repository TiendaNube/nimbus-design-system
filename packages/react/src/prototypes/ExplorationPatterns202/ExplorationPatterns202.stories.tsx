import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Box } from "@nimbus-ds/box";
import { MobilePlanCarousel } from "./ExplorationPatterns202";

const meta: Meta<typeof MobilePlanCarousel> = {
  title: "Prototypes/ExplorationPatterns202",
  component: MobilePlanCarousel,
  argTypes: {
    cardWidth: { control: { type: "text" } },
    regionLabel: { control: { type: "text" } },
  },
  args: { cardWidth: "82%", regionLabel: "Plans" },
};

export default meta;
type Story = StoryObj<typeof MobilePlanCarousel>;

export const Playground: Story = {
  decorators: [
    (Story) => (
      <Box maxWidth="390px" py="4" backgroundColor="neutral-surface">
        <Story />
      </Box>
    ),
  ],
};

export const FullScreen: Story = {
  name: "Full screen",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  decorators: [
    (Story) => (
      <Box display="flex" justifyContent="center" py="6" backgroundColor="neutral-surface" minHeight="100vh">
        <Box width="100%" maxWidth="430px">
          <Story />
        </Box>
      </Box>
    ),
  ],
};
