import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";

import { Stack } from "@nimbus-ds/stack";
import { Button } from "@nimbus-ds/button";

import { Alert } from "./Alert";

export default {
  title: "Composite/Alert",
  component: Alert,
  subcomponents: { "Alert.Skeleton": Alert.Skeleton },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;
const SkeletonTemplate: ComponentStory<typeof Alert.Skeleton> = (args) => (
  <Alert.Skeleton {...args} />
);

export const neutral = Template.bind({});
neutral.args = {
  appearance: "neutral",
  title: "Alert title",
  children: "Alert content",
};

export const primary = Template.bind({});
primary.args = {
  appearance: "primary",
  title: "Alert title",
  children: "Alert content",
};

export const success = Template.bind({});
success.args = {
  appearance: "success",
  title: "Alert title",
  children: "Alert content",
};

export const warning = Template.bind({});
warning.args = {
  appearance: "warning",
  title: "Alert title",
  children: "Alert content",
};

export const danger = Template.bind({});
danger.args = {
  appearance: "danger",
  title: "Alert title",
  children: "Alert content",
};

export const stressed = Template.bind({});
stressed.args = {
  title: "Very long title with a lot of characters",
  children:
    "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse convallis, urna eu blandit iaculis, lacus ante faucibus dui, ut tempus velit lectus non nunc. Aenean.",
};

export const variableContent = Template.bind({});
variableContent.args = {
  title: "Alert with components as children",
  children: (
    <>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget.
      <Stack display="flex" gap="2" flexWrap="wrap">
        <Button>Primary action</Button>
        <Button>Secondary action</Button>
      </Stack>
    </>
  ),
};

export const skeleton = SkeletonTemplate.bind({});
skeleton.args = {};
