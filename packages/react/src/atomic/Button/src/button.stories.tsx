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
  subcomponents: {
    "Button.Skeleton": Button.Skeleton,
    "Button.Link": Button.Link,
  },
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
const LinkTemplate: ComponentStory<typeof Button.Link> = (args) => (
  <Button.Link {...args} />
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
      <Icon color="currentColor" source={<ExternalLinkIcon />} />
    </>
  ),
};

export const loading = Template.bind({});
loading.args = {
  appearance: "primary",
  children: (
    <>
      <Spinner color="currentColor" size="small" />
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

export const transparent = Template.bind({});
transparent.args = {
  appearance: "transparent",
  children: "Button",
};

export const skeleton = SkeletonTemplate.bind({});
skeleton.args = {};

export const asLink = LinkTemplate.bind({});
asLink.args = {
  children: "Button as anchor",
  href: "https://nimbus.tiendanube.com/",
  target: "_blank",
};
