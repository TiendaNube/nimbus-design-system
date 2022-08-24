import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { Text } from "@nimbus-ds/text/src";
import { Tag } from "./Tag";

export default {
  title: "Atomic/Tag",
  component: Tag,
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

export const neutral = Template.bind({});
neutral.args = {
  appearance: "neutral",
  children: <Text appearance="neutral">Text</Text>,
};

export const primary = Template.bind({});
primary.args = {
  appearance: "primary",
  children: <Text appearance="primary">Text</Text>,
};

export const success = Template.bind({});
success.args = {
  appearance: "success",
  children: <Text appearance="success">Text</Text>,
};

export const warning = Template.bind({});
warning.args = {
  appearance: "warning",
  children: <Text appearance="warning">Text</Text>,
};

export const danger = Template.bind({});
danger.args = {
  appearance: "danger",
  children: <Text appearance="danger">Text</Text>,
};
