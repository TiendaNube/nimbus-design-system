import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { BoxPackedIcon } from "@nimbus-ds/icons";
import { Icon } from "@nimbus-ds/icon";
import { Label } from "./Label";

export default {
  title: "Atomic/Label",
  component: Label,
  subcomponents: { "Label.Skeleton": Label.Skeleton },
  argTypes: {
    children: { control: { disable: true } },
  },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args) => (
  <Label {...args}>
    <Icon source={<BoxPackedIcon />} />
    Label text:
  </Label>
);
const SkeletonTemplate: ComponentStory<typeof Label.Skeleton> = (args) => (
  <Label.Skeleton {...args} />
);

export const base = Template.bind({});
base.args = {};

export const hidden = Template.bind({});
hidden.args = {
  hidden: true,
};

export const skeleton = SkeletonTemplate.bind({});
skeleton.args = {};
