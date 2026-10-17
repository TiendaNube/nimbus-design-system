import type { Meta, StoryObj } from "@storybook/react";
import { Exploration544 } from "./Exploration544";

const meta: Meta<typeof Exploration544> = {
  title: "Prototypes/Exploration544",
  component: Exploration544,
  parameters: { layout: "padded" },
  argTypes: {
    appearance: { control: "radio", options: ["light", "dark"] },
    openOnFocus: { control: "boolean" },
    enabledHover: { control: "boolean" },
  },
  args: { appearance: "light", openOnFocus: true, enabledHover: true },
};

export default meta;
type Story = StoryObj<typeof Exploration544>;

export const Playground: Story = {};

export const FullScreen: Story = {
  name: "Full screen",
  parameters: { layout: "fullscreen", controls: { disable: true } },
};
