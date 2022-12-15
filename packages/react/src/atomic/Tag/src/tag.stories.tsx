import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { BoxPackedIcon } from "@tiendanube/icons";
import { Text } from "@nimbus-ds/text";

import { Tag } from "./Tag";

export default {
  title: "Atomic/Tag",
  component: Tag,
  subcomponents: { "Tag.Skeleton": Tag.Skeleton },
  argTypes: {
    children: { control: { disable: true } },
  },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;
const SkeletonTemplate: ComponentStory<typeof Tag.Skeleton> = (args) => (
  <Tag.Skeleton {...args} />
);

export const neutral = Template.bind({});
neutral.args = {
  appearance: "neutral",
  children: (
    <>
      <BoxPackedIcon size={12} />
      <Text color="neutral.textLow">Text</Text>
    </>
  ),
};

export const primary = Template.bind({});
primary.args = {
  appearance: "primary",
  children: (
    <>
      <BoxPackedIcon size={12} />
      <Text color="primary.textLow">Text</Text>
    </>
  ),
};

export const success = Template.bind({});
success.args = {
  appearance: "success",
  children: (
    <>
      <BoxPackedIcon size={12} />
      <Text color="success.textLow">Text</Text>
    </>
  ),
};

export const warning = Template.bind({});
warning.args = {
  appearance: "warning",
  children: (
    <>
      <BoxPackedIcon size={12} />
      <Text color="warning.textLow">Text</Text>
    </>
  ),
};

export const danger = Template.bind({});
danger.args = {
  appearance: "danger",
  children: (
    <>
      <BoxPackedIcon size={12} />
      <Text color="danger.textLow">Text</Text>
    </>
  ),
};

export const skeleton = SkeletonTemplate.bind({});
skeleton.args = {};
