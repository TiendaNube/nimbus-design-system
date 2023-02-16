import React from "react";
import { TiendanubeIcon } from "@nimbus-ds/icons";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { IconButton } from "./IconButton";

export default {
  title: "Atomic/Icon Button",
  component: IconButton,
  subcomponents: { "Icon.Skeleton": IconButton.Skeleton },
  argTypes: {
    source: { control: { disable: true } },
  },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof IconButton>;

const IconTemplate: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args} />
);
const SkeletonTemplate: ComponentStory<typeof IconButton.Skeleton> = (args) => (
  <IconButton.Skeleton {...args} />
);

export const base = IconTemplate.bind({});
base.args = {
  size: "2.75rem",
  source: <TiendanubeIcon size="small" />,
};

export const skeleton = SkeletonTemplate.bind({});
skeleton.args = {};
