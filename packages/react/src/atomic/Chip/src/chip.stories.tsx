import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { BoxPackedIcon } from "@nimbus-ds/icons";

import { Chip } from "./Chip";

export default {
  title: "Atomic/Chip",
  component: Chip,
  subcomponents: { "Chip.Skeleton": Chip.Skeleton },
  argTypes: {
    icon: { control: { disable: true } },
  },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Chip>;

const Template: ComponentStory<typeof Chip> = (args) => <Chip {...args} />;
const SkeletonTemplate: ComponentStory<typeof Chip.Skeleton> = (args) => (
  <Chip.Skeleton {...args} />
);

export const base = Template.bind({});
base.args = {
  text: "Text",
  icon: <BoxPackedIcon size={12} />,
};

export const removable = Template.bind({});
removable.args = {
  text: "Text",
  icon: <BoxPackedIcon size={12} />,
  removable: true,
};

export const skeleton = SkeletonTemplate.bind({});
skeleton.args = {};
