import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { ExplorationPatterns202 } from "./ExplorationPatterns202";

const meta: Meta<typeof ExplorationPatterns202> = {
  title: "Prototypes/ExplorationPatterns202",
  component: ExplorationPatterns202,
  parameters: { layout: "centered" },
  argTypes: {
    view: { control: "radio", options: ["auto", "mobile", "desktop"] },
    carouselLabel: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof ExplorationPatterns202>;

export const Playground: Story = {
  args: { view: "mobile", carouselLabel: "Available plans" },
  render: (args) => (
    // 375px frame so the mobile carousel is visible regardless of the Storybook viewport.
    <Box width={args.view === "desktop" ? "960px" : "375px"} padding="4">
      <ExplorationPatterns202 {...args} />
    </Box>
  ),
};

export const FullScreen: Story = {
  name: "Full screen",
  args: { view: "auto" },
  parameters: { layout: "fullscreen", controls: { disable: true } },
  render: (args) => (
    <Box padding="4">
      <ExplorationPatterns202 {...args} />
    </Box>
  ),
};
