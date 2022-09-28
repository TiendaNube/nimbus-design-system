import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { ExternalLinkIcon } from "@tiendanube/icons";
import { Icon } from "@nimbus-ds/icon";
import { Badge } from "@nimbus-ds/badge";
import { Spinner } from "@nimbus-ds/spinner";

import { Button } from "./Button";

export default {
  title: "Atomic/Button",
  component: Button,
  subcomponents: { "Button.Skeleton": Button.Skeleton },
  argTypes: {
    children: { control: { disable: true } },
  },
  parameters: {
    withA11y: { decorators: [withA11y] },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;
const SkeletonTemplate: ComponentStory<typeof Button.Skeleton> = (args) => (
  <Button.Skeleton {...args} />
);

export const base = Template.bind({});
base.args = {
  children: "Button",
};

export const badge = Template.bind({});
badge.args = {
  appearance: "primary",
  children: (
    <>
      Button
      <Badge appearance="primary" count={2} theme="light" />
    </>
  ),
};

export const icon = Template.bind({});
icon.args = {
  appearance: "primary",
  children: (
    <>
      Button
      <Icon color="neutral.background" source={<ExternalLinkIcon />} />
    </>
  ),
};

export const loading = Template.bind({});
loading.args = {
  appearance: "primary",
  children: (
    <>
      <Spinner color="neutral.background" size="small" />
      Button
    </>
  ),
};

export const disabled = Template.bind({});
disabled.args = {
  disabled: true,
  children: "Button",
};

export const primary = Template.bind({});
primary.args = {
  appearance: "primary",
  children: "Button",
};

export const danger = Template.bind({});
danger.args = {
  appearance: "danger",
  children: "Button",
};

export const neutral = Template.bind({});
neutral.args = {
  appearance: "neutral",
  children: "Button",
};

export const skeleton = SkeletonTemplate.bind({});
skeleton.args = {};
