import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@nimbus-ds/box";
import { ExplorationPatterns202, SAMPLE_PLANS_FOUR } from "./ExplorationPatterns202";

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

/** Mobile carousel with the four plans of the new PlanDisplay Default story. */
export const MobileFourPlans: Story = {
  name: "Mobile, 4 plans",
  args: { view: "mobile", plans: SAMPLE_PLANS_FOUR, carouselLabel: "Available plans" },
  render: (args) => (
    <Box width="375px" padding="4">
      <ExplorationPatterns202 {...args} />
    </Box>
  ),
};

/** Layout above the carousel breakpoint: 4 cards side by side, no carousel, no dots. */
export const DesktopFourPlans: Story = {
  name: "Desktop, 4 plans",
  args: { view: "desktop", plans: SAMPLE_PLANS_FOUR },
  render: (args) => (
    <Box width="1100px" padding="4">
      <ExplorationPatterns202 {...args} />
    </Box>
  ),
};
